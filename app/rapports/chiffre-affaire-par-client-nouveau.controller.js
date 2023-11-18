(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChiffreAffaireClientNouveauController', ChiffreAffaireClientNouveauController);

    ChiffreAffaireClientNouveauController.$inject = ['$rootScope','$scope', '$state', '$stateParams','Client','Categorieclient'];

    function ChiffreAffaireClientNouveauController($rootScope,$scope, $state, $stateParams,Client,Categorieclient) {
        var vm = this;
//        vm.clients = Client.query();
        vm.categorieClients = Categorieclient.query();
        
        
//        vm.datePickerOpenStatus = {};
//        vm.datePickerOpenStatus.dateCommande = false;
//        vm.datePickerOpenStatus.dateDebutMois = false;
//        vm.datePickerOpenStatus.dateFinMois= false;
//
//        vm.openCalendar = function (date) {
//            vm.datePickerOpenStatus[date] = true;
//        };
    }
})();
