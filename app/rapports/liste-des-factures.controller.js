(function () {
    'use strict';

    angular
            .module('app')
            .controller('ListeDesFacturesController', ListeDesFacturesController);

    ListeDesFacturesController.$inject = ['$rootScope', '$scope', '$state', '$stateParams'];

    function ListeDesFacturesController($rootScope, $scope, $state, $stateParams) {
        var vm = this;

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
        };

        vm.rechercherFactures = function (criteria) {
            console.log(obj)
            alert('essai');
        }

//        vm.datePickerOpenStatus = {};
//        vm.datePickerOpenStatus.dateCommande = false;
//        vm.datePickerOpenStatus.dateFabrication = false;
//        vm.datePickerOpenStatus.datePeremption = false;
//
//        vm.openCalendar = function (date) {
//            vm.datePickerOpenStatus[date] = true;
//        };
    }
})();
