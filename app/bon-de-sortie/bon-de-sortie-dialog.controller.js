(function() {
    'use strict';

    angular
        .module('app')
        .controller('BonDeSortieDialogController', BonDeSortieDialogController);

    BonDeSortieDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'BonDeSortie', 'User', 'Client', 'Magasin'];

    function BonDeSortieDialogController ($scope, $stateParams, $uibModalInstance, $q, entity, BonDeSortie, User, Client, Magasin) {
        var vm = this;
        vm.bonDeSortie = entity;
        vm.users = User.query();
        vm.clients = Client.query({filter: 'bondesortie-is-null'});
        $q.all([vm.bonDeSortie.$promise, vm.clients.$promise]).then(function() {
            if (!vm.bonDeSortie.client || !vm.bonDeSortie.client.id) {
                return $q.reject();
            }
            return Client.get({id : vm.bonDeSortie.client.id}).$promise;
        }).then(function(client) {
            vm.clients.push(client);
        });
        vm.magasins = Magasin.query();
        vm.load = function(id) {
            BonDeSortie.get({id : id}, function(result) {
                vm.bonDeSortie = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:bonDeSortieUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.bonDeSortie.id !== null) {
                BonDeSortie.update(vm.bonDeSortie, onSaveSuccess, onSaveError);
            } else {
                BonDeSortie.save(vm.bonDeSortie, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.daateCreation = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
