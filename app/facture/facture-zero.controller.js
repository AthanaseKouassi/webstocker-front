(function () {
    'use strict';

    angular
            .module('app')
            .controller('FactureZeroController', FactureZeroController);

    FactureZeroController.$inject = ['$scope', '$stateParams', 'Livraison', 'Magasin', 'Lot'];

    function FactureZeroController($scope, $stateParams,  Livraison, Magasin, Lot) {
        var vm = this;
       // vm.livraison = entity;
        vm.magasins = Magasin.query();
        vm.lots = Lot.query();
        //vm.commandes = Commande.query();
//        vm.load = function (id) {
//            Livraison.get({id: id}, function (result) {
//                vm.livraison = result;
//            });
//        };

        $scope.type = {
            status: 'cash'
        };
        
        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:livraisonUpdate', result);
            //$uibModalInstance.close(result);
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

        vm.clear = function () {
           // $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateLivraison = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
