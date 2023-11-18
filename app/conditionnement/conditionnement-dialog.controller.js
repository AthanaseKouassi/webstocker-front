(function() {
    'use strict';

    angular
        .module('app')
        .controller('ConditionnementDialogController', ConditionnementDialogController)
//        .value('URL_SEARCH_CONDITIONNEMENT','http://localhost:8080/api/conditionnements/conditionnementParLibelle/');
//        .value('URL_SEARCH_CONDITIONNEMENT','http://83.166.138.228:8080/api/conditionnements/conditionnementParLibelle/');

        .value('URL_SEARCH_CONDITIONNEMENT','api/conditionnements/conditionnementParLibelle/');

    ConditionnementDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Conditionnement', 'Produit','FetchData','URL_SEARCH_CONDITIONNEMENT', 'API_URL'];

    function ConditionnementDialogController ($scope, $stateParams, $uibModalInstance, entity, Conditionnement, Produit, FetchData, URL_SEARCH_CONDITIONNEMENT, API_URL) {
        var vm = this;
        vm.conditionnement = entity;
        vm.produits = Produit.query();
        vm.donnees = {};
        vm.load = function(id) {
            Conditionnement.get({id : id}, function(result) {
                vm.conditionnement = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:conditionnementUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };
        
        vm.rechercher = function (libelle) {
            FetchData.getData(API_URL + URL_SEARCH_CONDITIONNEMENT + libelle).then(function (result) {
                console.log(result);
                vm.donnees = result.data;
                console.log('DONNEES TROUVER ' + vm.donnees.libelle);
//                if (vm.donnees.nomCategorie!=null){
                if (angular.lowercase(vm.donnees.libelle) === angular.lowercase(vm.conditionnement.libelle)) {
                    alert("Attention, cette information existe déjà!");
                }
//                else {
//                    vm.save();
//                }
            }, function (error) {
//            alert('Erreur lors du chargement des données');
                vm.save();
            });
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.conditionnement.id !== null) {
                Conditionnement.update(vm.conditionnement, onSaveSuccess, onSaveError);
            } else {
                Conditionnement.save(vm.conditionnement, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
