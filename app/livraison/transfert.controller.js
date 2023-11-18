(function() {
    'use strict';

    angular
        .module('app')
        .controller('TransfertController', TransfertController);

    TransfertController.$inject = ['$scope', '$stateParams', 'entity', 'Livraison', 'Magasin', 'Commande'];

    function TransfertController ($scope, $stateParams, entity, Livraison, Magasin, Commande) {
        var vm = this;
        vm.livraison = entity;
        vm.magasins = Magasin.query();
        vm.commandes = Commande.query();        
        
        vm.load = function(id) {
            Livraison.get({id : id}, function(result) {
                vm.livraison = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:livraisonUpdate', result);
            //$uibModalInstance.close(result);
            console.log(result);
            vm.livraison = result;
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.livraison.id !== null) {
                Livraison.update(vm.livraison, onSaveSuccess, onSaveError);
            } else {
                Livraison.save(vm.livraison, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
           // $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateLivraison = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
