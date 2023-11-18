(function() {
    'use strict';

    angular
        .module('app')
        .controller('FrequenceAchatController', FrequenceAchatController);

    FrequenceAchatController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Localite', 'Magasin'];

    function FrequenceAchatController ($scope, $stateParams, $uibModalInstance, entity, Localite, Magasin) {
        var vm = this;
        vm.localite = entity;
        vm.magasins = Magasin.query();
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
