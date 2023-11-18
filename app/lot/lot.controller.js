(function() {
    'use strict';

    angular
        .module('app')
        .controller('LotController', LotController)
        .value('URL_LOTS','api/lot-par-page?page=');

    LotController.$inject = ['$rootScope','$scope', '$state', 'Lot', 'LotSearch','API_URL','FetchData','URL_LOTS','$filter'];

    function LotController ($rootScope,$scope, $state, Lot, LotSearch, API_URL, FetchData,URL_LOTS,$filter) {
        var vm = this;
        vm.lotParPage =[];
        vm.lots = [];
         
        vm.currentPage = 0;
        vm.pageSize = 20;
        //vm.numberOfPage =0;
        vm.q = '';
        
        vm.loadAll = function() {
            Lot.query(function(result) {
                vm.lots = result;
            });
        };

        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            LotSearch.query({query: vm.searchQuery}, function(result) {
                vm.lots = result;
            });
        };
        vm.loadAll();
        
        vm.uploadPage = function(){
        FetchData.getData(API_URL+URL_LOTS+vm.currentPage+'&size='+vm.pageSize).then(function(response){
                 vm.lotParPage = response.data.content; 
                 vm.totalElements = response.data.totalElements;
                 vm.totalPage = response.data.totalPages;
                
                 console.log(' totalItems '+vm.totalElements);                 
                 console.log(' nombre de page '+ vm.totalPage );
//                 $filter('filter')(vm.lotParPage,vm.q );
                },function(error){
                 console.log(error);
             });
         }  ;
         
        vm.setPage = function(p){
            vm.currentPage = p;
            vm.uploadPage();
        };
        vm.uploadPage();
    }
    
})();
