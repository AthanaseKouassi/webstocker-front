(function() {
    'use strict';

    angular
        .module('app')
        .controller('MagasinDialogController', MagasinDialogController)
        .value('URL_TROUVER_MAGASIN','api/magasins/trouverMagasinParNom/');

    MagasinDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'API_URL','entity', 'Magasin', 'Localite', 'Livraison','FetchData','URL_TROUVER_MAGASIN'];

    function MagasinDialogController ($scope, $stateParams, $uibModalInstance, API_URL,entity, Magasin, Localite, Livraison, FetchData, URL_TROUVER_MAGASIN) {
        var vm = this;
        vm.magasin = entity;
        vm.localites = Localite.query();
        vm.livraisons = Livraison.query();
        vm.donnees = {};
        vm.load = function(id) {
            Magasin.get({id : id}, function(result) {
                vm.magasin = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:magasinUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };
        
        vm.rechercher = function (nommagasin) {
            FetchData.getData(API_URL+URL_TROUVER_MAGASIN + nommagasin).then(function (result) {
                console.log(result);
                vm.donnees = result.data;
                console.log('DONNEES TROUVER ' + vm.donnees.nomMagasin);
//                if (vm.magasin.id === null) {
                    if (angular.lowercase(vm.donnees.nomMagasin) === angular.lowercase(vm.magasin.nomMagasin)&& (angular.lowercase(vm.donnees.nomMagasin) === angular.lowercase(vm.magasin.nomMagasin))) {
                        alert("Attention, cette information existe déjà!");
                    }
//                } else if (angular.lowercase(vm.donnees.nomMagasin) === angular.lowercase(vm.magasin.nomMagasin)) {
//                    alert("Attention, cette information existe déjà!");
//                    // vm.save();
//                }
            }, function (error) {
//            alert('Erreur lors du chargement des données');
console.log('Erreur lors du chargement des données');
                vm.save();
            });
        };
        
        
        
        
//        
//        vm.rechercher = function () {            
//            FetchData.getData(API_URL+URL_TROUVER_CLIENT+'?nomclient='+vm.client.nomClient+'&telephoneClient='+vm.client.telephoneClient).then(function (result) {
//                console.log(result);
//                vm.donnees = result.data;
//                console.log('DONNEES TROUVER ' + vm.donnees.nomClient+' et '+vm.donnees.telephoneClient);
////                if (vm.donnees.nomCategorie!=null){
//                if ((angular.lowercase(vm.donnees.nomClient) === angular.lowercase(vm.client.nomClient))&&(vm.donnees.telephoneClient === vm.client.telephoneClient)) {
//                    alert("Attention, cette information existe déjà!");
//                }
////                else {
////                    vm.save();
////                }
//            }, function (error) {
////            alert('Erreur lors du chargement des données');
//            console.log('Erreur lors du chargement des données');
//                vm.save();
//            });
//        };
//
//        
        
        
        
        

        vm.save = function () {
            vm.isSaving = true;
            if (vm.magasin.id !== null) {
                Magasin.update(vm.magasin, onSaveSuccess, onSaveError);
            } else {
                Magasin.save(vm.magasin, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
