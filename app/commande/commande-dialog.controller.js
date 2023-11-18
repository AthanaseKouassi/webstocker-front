(function() {
    'use strict';

    angular
        .module('app')
        .controller('CommandeDialogController', CommandeDialogController);

    CommandeDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Commande', 'Livraison', 'Lignecommande', 'Bailleur', 'Fabricant'];

    function CommandeDialogController ($scope, $stateParams, $uibModalInstance, entity, Commande, Livraison, Lignecommande, Bailleur, Fabricant) {
        var vm = this;
        vm.commande = entity;
        vm.livraisons = Livraison.query();$uibModalInstance
        vm.lignecommandes = Lignecommande.query();
        vm.bailleurs = Bailleur.query();
        vm.fabricants = Fabricant.query();
        vm.load = function(id) {
            Commande.get({id : id}, function(result) {
                vm.commande = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:commandeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.commande.id !== null) {
                Commande.update(vm.commande, onSaveSuccess, onSaveError);
            } else {
                Commande.save(vm.commande, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateCommande = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
