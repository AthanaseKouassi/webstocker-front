(function() {
    'use strict';

    angular
        .module('app')
        .controller('CommuneDialogController', CommuneDialogController)
//        .value('URL_TROUVE_COMMUNE','http://localhost:8080/api/communes/trouverCommuneparnom/');
//        .value('URL_TROUVE_COMMUNE','http://83.166.138.228:8080/api/communes/trouverCommuneparnom/');

        .value('URL_TROUVE_COMMUNE','api/communes/trouverCommuneparnom/');

    CommuneDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Commune', 'Ville','URL_TROUVE_COMMUNE','FetchData', 'API_URL'];

    function CommuneDialogController ($scope, $stateParams, $uibModalInstance, entity, Commune, Ville, URL_TROUVE_COMMUNE, FetchData, API_URL) {
        var vm = this;
        vm.commune = entity;
        vm.villes = Ville.query();
        vm.donnees = {};
        vm.load = function(id) {
            Commune.get({id : id}, function(result) {
                vm.commune = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:communeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };
        
        vm.rechercher = function (nomCommune) {
            FetchData.getData(API_URL + URL_TROUVE_COMMUNE + nomCommune).then(function (result) {
                console.log(result);
                vm.donnees = result.data;
                console.log('DONNEES TROUVER ' + vm.donnees.libelle);
                if (vm.commune.id === null) {
                    if (angular.lowercase(vm.donnees.libelle) === angular.lowercase(vm.commune.libelle)) {
//                        alert("Attention, cette information existe déjà!");
                        swal("Attention, cette information existe déjà!");
                    }
                } else if (angular.lowercase(vm.donnees.libelle) === angular.lowercase(vm.commune.libelle)) {
                    swal("Attention, cette information existe déjà!");
//                    alert("Attention, cette information existe déjà!");
                    // vm.save();
                }
            }, function (error) {
//            alert('Erreur lors du chargement des données');
                vm.save();
            });
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.commune.id !== null) {
                Commune.update(vm.commune, onSaveSuccess, onSaveError);
            } else {
                Commune.save(vm.commune, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
