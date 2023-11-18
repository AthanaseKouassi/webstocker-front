(function() {
    'use strict';

    angular
        .module('app')
        .controller('MissionControllerList', MissionControllerList)
        .value('URL_SEARCH_MISSION','api/mission-critere');
//        .value('URL_SEARCH_MISSION','http://83.166.138.228:8080/api/mission-critere');
//        .value('URL_SEARCH_MISSION','http://localhost:8080/api/mission-critere');

    MissionControllerList.$inject = ['$scope','$uibModal' ,'$state', 'Mission',  'API_URL','MissionSearch', 'ParseLinks', 'AlertService', 'pagingParams', 'paginationConstants','FetchData','URL_SEARCH_MISSION','$filter', 'ModalMissionService'];

    function MissionControllerList ($scope,$uibModal ,$state, Mission,  API_URL,MissionSearch, ParseLinks, AlertService, pagingParams, paginationConstants,FetchData,URL_SEARCH_MISSION,$filter, ModalMissionService) {
        var vm = this;
       
        vm.criteria = {};
        
        $scope.datePickerOpenStatus = {};
        $scope.datePickerOpenStatus['dateDebut'] = false;
        $scope.datePickerOpenStatus['dateFin'] = false;

        $scope.openCalendar = function(date) {
            $scope.datePickerOpenStatus[date] = true;
        };
        
        
        vm.open =function(id){
            ModalMissionService.open(id);
        }; 
       
        vm.cancel=function(){
            ModalMissionService.cancel();
        }; 
        
        vm.loadData = function(){
           console.log($scope.criteria);
           var dateDebut='',dateFin='';
           if(vm.criteria.dateDebut!==null){
               dateDebut = $filter('date')(vm.criteria.dateDebut, 'yyyy-MM-dd');
           }
           if(vm.criteria.dateFin!==null){
               dateFin = $filter('date')(vm.criteria.dateFin, 'yyyy-MM-dd');
           }
           FetchData.getData(API_URL+URL_SEARCH_MISSION+'?dateDebut='+dateDebut+'&dateFin='+dateFin+'&libelle='+vm.criteria.libelle)
                   .then(function(response){
                        console.log(response);
                        vm.missions = response.data;
                     },function(error){
                        console.log(error); 
             });
        };
       
    }
})();
