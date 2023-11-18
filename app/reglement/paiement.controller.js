(function () {
    'use strict';

    angular
        .module('app')
        .controller('PaiementController', PaiementController);

    PaiementController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Reglement', 'Facture', 'AlertService'];

    function PaiementController($scope, $stateParams, $uibModalInstance, entity, Reglement, Facture, AlertService) {
        var vm = this;
        vm.loadFacture = loadFacture;
        vm.reglement = entity;
        vm.reglement.facture = null;
        vm.loadFacture();

        function loadFacture() {
            Facture.get({id: vm.reglement.numero}, onSuccess, onError);
            
        };

        function onSuccess(data) {
            var tmp = angular.toJson(data);
            vm.reglement.facture = angular.fromJson(tmp);
            console.log("LE NUMERO DE FACTURE est "+vm.reglement.facture.bonDeSortie.numeroFactureNormalise);
        }

        function onError(error) {
            AlertService.error(error.data.message);
        }


        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:reglementUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;

            if (vm.reglement.id !== null) {
                Reglement.update(vm.reglement, onSaveSuccess, onSaveError);
            } else {
                Reglement.save(vm.reglement, onSaveSuccess, onSaveError);
            }

        };

        vm.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateReglement = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
