(function () {
    'use strict';

    angular
        .module('app')
        .controller('RapportQuantiteVenduParDistrictController', RapportQuantiteVenduParDistrictController);

    RapportQuantiteVenduParDistrictController.$inject = ['$rootScope','$scope', '$state', '$stateParams'];

    function RapportQuantiteVenduParDistrictController($rootScope,$scope, $state, $stateParams) {
        var vm = this;

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
        };
        

        vm.datePickerOpenStatus = {};

        vm.datePickerOpenStatus.dateDebutMois = false;
        vm.datePickerOpenStatus.dateFinMois = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
    
})();
