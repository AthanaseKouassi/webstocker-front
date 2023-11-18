(function () {
    'use strict';

    angular
            .module('app')
            .controller('TauxAtteinteResultatController', TauxAtteinteResultatController);

    TauxAtteinteResultatController.$inject = ['$rootScope', '$scope', '$state', '$stateParams'];

    function TauxAtteinteResultatController($rootScope, $scope, $state, $stateParams) {
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
