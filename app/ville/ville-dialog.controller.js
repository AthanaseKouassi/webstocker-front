(function() {
    'use strict';

    angular
        .module('app')
        .controller('VilleDialogController', VilleDialogController)
//        .value('URL_SEARCH_VILLE','http://localhost:8080/api/villes/villeTrouverParNom/');
//        .value('URL_SEARCH_VILLE','http://83.166.138.228:8080/api/villes/villeTrouverParNom/');
        .value('URL_SEARCH_VILLE','api/villes/villeTrouverParNom/');

    VilleDialogController.$inject = ['$scope', '$stateParams', 'API_URL', '$uibModalInstance', 'entity', 'Ville', 'Region','FetchData', 'URL_SEARCH_VILLE'];

    function VilleDialogController ($scope, $stateParams,API_URL, $uibModalInstance, entity, Ville, Region,FetchData, URL_SEARCH_VILLE) {
        var vm = this;
        vm.ville = entity;
        vm.regions = Region.query();
        vm.donnees = {};
        vm.load = function(id) {
            Ville.get({id : id}, function(result) {
                vm.ville = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:villeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };
        
         vm.rechercher = function (libelle) {
            FetchData.getData(API_URL+URL_SEARCH_VILLE + libelle).then(function (result) {
                console.log(result);
                vm.donnees = result.data;
                console.log('DONNEES TROUVER ' + vm.donnees.libelle);
                if (vm.ville.id === null) {
                    if (angular.lowercase(vm.donnees.libelle) === angular.lowercase(vm.ville.libelle)) {
                        alert("Attention, cette information existe déjà!");
                    }
                } else if (angular.lowercase(vm.donnees.libelle) === angular.lowercase(vm.ville.libelle)) {
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
            if (vm.ville.id !== null) {
                Ville.update(vm.ville, onSaveSuccess, onSaveError);
            } else {
                Ville.save(vm.ville, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
