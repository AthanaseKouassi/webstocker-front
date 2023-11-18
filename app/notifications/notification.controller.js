(function () {
    'use strict';

    angular
            .module('app')
            .controller('NotificationController', NotificationController);

    NotificationController.$inject = ['$rootScope', '$state','$scope', '$timeout','NotificationService'];
    
    function NotificationController($rootScope, $state,$scope, $timeout,NotificationService) {
        var vm = this;
        vm.bonsorties = [];
        vm.factures = [];
        $scope.Factures = [];
        $scope.Bons = [];
        function getNotifications() {
           //console.log('surveiller les bons de sorties');
           NotificationService.queryBonSortie(
           function(result){
             // console.log(result);
              if(result.length>0){
                  $scope.Bons = result;
              }
              //vm.bonsorties = [];
              $timeout(getNotifications,10000);
           },function(error){
               console.log(error);
               $timeout(getNotifications,10000);
           });
        }
        function getNotificationsFacture() {
           //console.log('surveiller les factures');
           NotificationService.queryFacture(
           function(result){
              //console.log(result);
              vm.factures = result;
              $scope.Factures = result;
             // console.log(vm.factures.length);
             // console.log($scope.Factures.length);
              $timeout(getNotificationsFacture,10000);
           },function(error){
               console.log(error);
               $timeout(getNotificationsFacture,10000);
           });
        }
        
     // $timeout(getNotifications,10000);
     // $timeout(getNotificationsFacture,10000);
      
    }
})();
