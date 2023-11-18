(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegionController', RegionController)
        .value('URL_REGION','api/regions-par-page?page=');

    RegionController.$inject = ['$scope', '$state', 'Region', '$http','FetchData', 'RegionSearch', 'ParseLinks', 'AlertService', 'pagingParams', 'paginationConstants','API_URL','URL_REGION'];

    function RegionController ($scope, $state, Region, $http,FetchData, RegionSearch, ParseLinks, AlertService, pagingParams, paginationConstants,API_URL,URL_REGION) {
        var vm = this;
        vm.loadAll = loadAll;
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.clear = clear;
        vm.search = search;
        vm.searchQuery = pagingParams.search;
        vm.currentSearch = pagingParams.search;
        vm.loadAll();
        
        vm.currentPage = 0;
        vm.pageSize = 20;
        vm.numberOfPage =0;
        vm.q = '';
        
        
        vm.uploadPage = function(){
        FetchData.getData(API_URL+URL_REGION+vm.currentPage+'&size='+vm.pageSize).then(function(response){
                 vm.regionsParPage = response.data.content; 
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
        
        

        function loadAll () {
            if (pagingParams.search) {
                RegionSearch.query({
                    query: pagingParams.search,
                    page: pagingParams.page - 1,
                    size: paginationConstants.itemsPerPage,
                    sort: sort()
                }, onSuccess, onError);
            } else {
                Region.query({
                    page: pagingParams.page - 1,
                    size: paginationConstants.itemsPerPage,
                    sort: sort()
                }, onSuccess, onError);
            }
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.regions = data;
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadPage (page) {
            vm.page = page;
            vm.transition();
        }

        function transition () {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }

        function search (searchQuery) {
            if (!searchQuery){
                return vm.clear();
            }
            vm.links = null;
            vm.page = 1;
            vm.predicate = '_score';
            vm.reverse = false;
            vm.currentSearch = searchQuery;
            vm.transition();
        }

        function clear () {
            vm.links = null;
            vm.page = 1;
            vm.predicate = 'id';
            vm.reverse = true;
            vm.currentSearch = null;
            vm.transition();
        }

    }
})();
