(function() {
    'use strict';

    angular
        .module('app')
        .controller('CategorieclientDialogController', CategorieclientDialogController)
        .value('URL_TROUVE_TYPECLIENT','api/categorieclients/typeClient/');
//        .value('URL_TROUVE_TYPECLIENT','http://83.166.138.228:8080/api/categorieclients/typeClient/');
//        .value('URL_TROUVE_TYPECLIENT','http://localhost:8080/api/categorieclients/typeClient/');

    CategorieclientDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Categorieclient', 'Client', 'Prix','URL_TROUVE_TYPECLIENT','FetchData','API_URL'];

    function CategorieclientDialogController ($scope, $stateParams, $uibModalInstance, entity, Categorieclient, Client, Prix,URL_TROUVE_TYPECLIENT, FetchData, API_URL) {
        var vm = this;
        vm.categorieclient = entity;
        vm.clients = Client.query();
        vm.prixs = Prix.query();
        vm.donnees = {};
        vm.load = function(id) {
            Categorieclient.get({id : id}, function(result) {
                vm.categorieclient = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:categorieclientUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };
        
        vm.rechercher = function (libelleCategorieclient) {
            FetchData.getData(API_URL+URL_TROUVE_TYPECLIENT + libelleCategorieclient).then(function (result) {
                console.log(result);
                vm.donnees = result.data;
                console.log('DONNEES TROUVER ' + vm.donnees.libelleCategorieclient);
                if (vm.categorieclient.id === null) {
                    if (angular.lowercase(vm.donnees.libelleCategorieclient) === angular.lowercase(vm.categorieclient.libelleCategorieclient)) {
                        alert("Attention, cette information existe déjà!");
                    }
                } else if (angular.lowercase(vm.donnees.libelleCategorieclient) === angular.lowercase(vm.categorieclient.libelleCategorieclient)) {
                    alert("Attention, cette information existe déjà!");
                    // vm.save();
                }
            }, function (error) {
//            alert('Erreur lors du chargement des données');
                vm.save();
            });
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.categorieclient.id !== null) {
                Categorieclient.update(vm.categorieclient, onSaveSuccess, onSaveError);
            } else {
                Categorieclient.save(vm.categorieclient, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
