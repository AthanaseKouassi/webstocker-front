(function() {
    'use strict';

    angular
        .module('app')
        .controller('LocaliteDialogController', LocaliteDialogController)
//        .value('URL_SEARCH_QUARTIER','http://localhost:8080/api/localites/localiteparNom/');
//        .value('URL_SEARCH_QUARTIER','http://83.166.138.228:8080/api/localites/localiteparNom/');
        .value('URL_SEARCH_QUARTIER','api/localites/localiteparNom/');


    LocaliteDialogController.$inject = ['$scope', '$stateParams', 'API_URL','$uibModalInstance', 'entity', 'Localite', 'Magasin', 'Client', 'Mission', 'Commune','URL_SEARCH_QUARTIER','FetchData'];

    function LocaliteDialogController ($scope, $stateParams, API_URL,$uibModalInstance, entity, Localite, Magasin, Client, Mission, Commune, URL_SEARCH_QUARTIER, FetchData) {
        var vm = this;
        vm.localite = entity;
        vm.magasins = Magasin.query();
        vm.clients = Client.query();
        vm.missions = Mission.query();
        vm.communes = Commune.query();
        vm.donnees = {};
        vm.load = function(id) {
            Localite.get({id : id}, function(result) {
                vm.localite = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:localiteUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.rechercher = function (libelle) {
            FetchData.getData(API_URL+URL_SEARCH_QUARTIER + libelle).then(function (result) {
                console.log(result);
                vm.donnees = result.data;
                console.log('DONNEES TROUVER ' + vm.donnees.nom);
                if (vm.localite.id === null) {
                    if (angular.lowercase(vm.donnees.nom) === angular.lowercase(vm.localite.nom)) {
                        alert("Attention, cette information existe déjà!");
                    }
                } else if (angular.lowercase(vm.donnees.nom) === angular.lowercase(vm.localite.nom)) {
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
            if (vm.localite.id !== null) {
                Localite.update(vm.localite, onSaveSuccess, onSaveError);
            } else {
                Localite.save(vm.localite, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
