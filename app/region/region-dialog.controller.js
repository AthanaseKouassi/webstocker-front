(function () {
    'use strict';

    angular
            .module('app')
            .controller('RegionDialogController', RegionDialogController)
//            .value('URL_TROUVER_REGION', 'http://localhost:8080/api/regions/regionParNom/');
//            .value('URL_TROUVER_REGION', 'http://83.166.138.228:8080/api/regions/regionParNom/');
            .value('URL_TROUVER_REGION', 'api/regions/regionParNom/');

    RegionDialogController.$inject = ['$scope', '$stateParams', 'API_URL',  '$uibModalInstance', 'entity', 'Region', 'URL_TROUVER_REGION', 'FetchData'];

    function RegionDialogController($scope, $stateParams,API_URL, $uibModalInstance, entity, Region, URL_TROUVER_REGION, FetchData) {
        var vm = this;
        vm.region = entity;
        vm.donnees = {};
        vm.load = function (id) {
            Region.get({id: id}, function (result) {
                vm.region = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:regionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.rechercher = function (nomregion) {
            FetchData.getData(API_URL+URL_TROUVER_REGION + nomregion).then(function (result) {
                console.log(result);
                vm.donnees = result.data;
                console.log('DONNEES TROUVER ' + vm.donnees.libelle);
                if (vm.region.id === null) {
                    if (angular.lowercase(vm.donnees.libelle) === angular.lowercase(vm.region.libelle)) {
                        alert("Attention, cette information existe déjà!");
                    }
                } else if (angular.lowercase(vm.donnees.libelle) === angular.lowercase(vm.region.libelle)) {
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
            if (vm.region.id !== null) {
                Region.update(vm.region, onSaveSuccess, onSaveError);
            } else {
                Region.save(vm.region, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
