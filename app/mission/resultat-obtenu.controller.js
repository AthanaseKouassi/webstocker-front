(function () {
    'use strict';

    angular
        .module('app')
        .controller('ResultatObtenuController', ResultatObtenuController);

    ResultatObtenuController.$inject = ['$rootScope','$scope', '$state', '$stateParams','$uibModalInstance', 'entity', 'LigneMissionActivite', 'Activite', 'Mission'];

    function ResultatObtenuController($rootScope,$scope, $state, $stateParams, $uibModalInstance, entity, LigneMissionActivite, Activite, Mission) {
        var vm = this;
        vm.ligneMissionActivite = entity;
        vm.activites = Activite.query();
        vm.missions = Mission.query();
        
        vm.load = function(id) {
            LigneMissionActivite.get({id : id}, function(result) {
                vm.ligneMissionActivite = result;
            });
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
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
