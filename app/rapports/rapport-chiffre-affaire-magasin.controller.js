(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChiffreAffaireParMagasinController', ChiffreAffaireParMagasinController);

    ChiffreAffaireParMagasinController.$inject = ['$rootScope','$scope', '$state', '$stateParams'];

    function ChiffreAffaireParMagasinController($rootScope,$scope, $state, $stateParams) {
        var vm = this;

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
        };

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
