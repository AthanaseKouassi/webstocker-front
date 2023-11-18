(function () {
    'use strict';

    angular
            .module('app')
            .controller('ConfirmationTransfertController', ConfirmationTransfertController);

    ConfirmationTransfertController.$inject = ['$timeout', '$scope', '$rootScope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'BonDeSortie', 'Magasin', 'User', 'Client', 'SweetAlert'];

    function ConfirmationTransfertController($timeout, $scope, $rootScope, $stateParams, $uibModalInstance, $q, entity, BonDeSortie, Magasin, User, Client, SweetAlert) {
        var vm = this;

        vm.bonDeSortie = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.magasins = Magasin.query();
        vm.users = User.query();
        vm.clients = Client.query();

        $rootScope.date = new Date();


        vm.clients = Client.query({filter: 'bondesortie-is-null'});
        $q.all([vm.bonDeSortie.$promise, vm.clients.$promise]).then(function () {
            if (!vm.bonDeSortie.client || !vm.bonDeSortie.client.id) {
                return $q.reject();
            }
            return Client.get({id: vm.bonDeSortie.client.id}).$promise;
        }).then(function (client) {
            vm.clients.push(client);
        });
        vm.magasins = Magasin.query();
        vm.load = function (id) {
            BonDeSortie.get({id: id}, function (result) {
                vm.bonDeSortie = result;
            });
        };



        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        vm.bonDeSortie.dateReceptionTransfert = '';

        $scope.utilisateur = {};
        function getUsersConnecte() {
            User.get({login: $rootScope.user.login}, function (result) {
                vm.bonDeSortie.dateReceptionTransfert = '';
                console.log(result);
                $scope.utilisateur = result;
//                $rootScope.user = result;
                vm.bonDeSortie.emetteur = $scope.utilisateur;
                vm.bonDeSortie.dateReceptionTransfert = $rootScope.date;
            });
        }

        getUsersConnecte();

        function save() {
            vm.isSaving = true;
            if (vm.bonDeSortie.id !== null) {
                if (vm.bonDeSortie.statusTranfert !== 'ENCOURS') {
                    BonDeSortie.update(vm.bonDeSortie, onSaveSuccess, onSaveError);
                    //SweetAlert.success("Merci", {title: "Validation de transfert!"});
                } else {
                    SweetAlert.alert("Ce transfert est encours Vous devez juste le receptionner: \n\
                                    choisissez l'option RECU du status", {title: "Validation de transfert!"});
                }




//                BonDeSortie.update(vm.bonDeSortie, onSaveSuccess, onSaveError);
            } else {
                BonDeSortie.save(vm.bonDeSortie, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess(result) {
            $scope.$emit('webstockerApp:bonDeSortieUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError() {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.daateCreation = false;
        vm.datePickerOpenStatus.dateReception = false;
        vm.datePickerOpenStatus.dateReceptionTransfert = false;


        function openCalendar(date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
