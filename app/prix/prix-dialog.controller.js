(function() {
    'use strict';

    angular
        .module('app')
        .controller('PrixDialogController', PrixDialogController);

    PrixDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Prix', 'Produit', 'Categorieclient'];

    function PrixDialogController ($scope, $stateParams, $uibModalInstance, entity, Prix, Produit, Categorieclient) {
        var vm = this;
        vm.prix = entity;
        vm.produits = Produit.query();
        vm.categorieclients = Categorieclient.query();
        vm.load = function(id) {
            Prix.get({id : id}, function(result) {
                vm.prix = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:prixUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.prix.id !== null) {
                Prix.update(vm.prix, onSaveSuccess, onSaveError);
            } else {
                Prix.save(vm.prix, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateFixation = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
