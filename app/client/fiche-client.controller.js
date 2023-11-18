(function() {
    'use strict';

    angular
        .module('app')
        .controller('FicheClientController', FicheClientController)
        .value('URL_SEARCH_CLIENT','api/facture-clients');
//        .value('URL_SEARCH_CLIENT','http://83.166.138.228:8080/api/facture-clients');
//        .value('URL_SEARCH_CLIENT','http://localhost:8080/api/facture-clients');

    FicheClientController.$inject = ['$scope', '$state', 'Client', 'ClientSearch','$filter','ModalClientService','FetchData','URL_SEARCH_CLIENT','API_URL'];

    function FicheClientController ($scope, $state, Client, ClientSearch,$filter,ModalClientService,FetchData,URL_SEARCH_CLIENT,API_URL) {
        var vm = this;
        vm.clients = [];
        vm.loadAll = function() {
            Client.query(function(result) {
                vm.clients = result;
            });
        };
        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            ClientSearch.query({query: vm.searchQuery}, function(result) {
                vm.clients = result;
            });
        };
        vm.loadAll();
        
        $scope.criteria = {};
        
        $scope.datePickerOpenStatus = {};
        $scope.datePickerOpenStatus['dateDebut'] = false;
        $scope.datePickerOpenStatus['dateFin'] = false;

        $scope.openCalendar = function(date) {
            $scope.datePickerOpenStatus[date] = true;
        };
        $scope.clientsFacture = [];
        $scope.clients = {
          ID: []
        };
        $scope.loadData = function(){
           console.log($scope.criteria);
           var dateDebut='',dateFin='';
           if($scope.criteria.dateDebut!==null){
               dateDebut = $filter('date')($scope.criteria.dateDebut, 'yyyy-MM-dd');
           }
           if($scope.criteria.dateFin!==null){
               dateFin = $filter('date')($scope.criteria.dateFin, 'yyyy-MM-dd');
           }
           FetchData.getData(API_URL+URL_SEARCH_CLIENT+'?dateDebut='+dateDebut+'&dateFin='+dateFin+'&nomClient='+$scope.criteria.noClient)
                   .then(function(response){
                        console.log(response);
                        $scope.clientsFacture = response.data;
                     },function(error){
                        console.log(error); 
             });
        };
        
        /**
         * 
         */
        $scope.open =function(id){
            ModalClientService.open(id);
       }; 
       
        $scope.cancel=function(){
            ModalClientService.cancel();
       }; 
    }
})();
