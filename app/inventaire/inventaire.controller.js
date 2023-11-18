(function () {
    'use strict';

    angular
            .module('app')
            .controller('InventaireController', InventaireController);

    InventaireController.$inject = ['Inventaire', 'InventaireSearch', 'ParseLinks', 'AlertService', 'paginationConstants', 'pagingParams', 'Magasin', 'API_URL', 'FetchData', 'DateUtils','$rootScope','$state'];

    function InventaireController(Inventaire, InventaireSearch, ParseLinks, AlertService, paginationConstants, pagingParams, Magasin, API_URL, FetchData, DateUtils,$rootScope,$state) {

        var vm = this;

        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;
        vm.searchQuery = pagingParams.search;
        vm.currentSearch = pagingParams.search;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.magasins = Magasin.query();
        vm.allInventaires = [];
        vm.currentPage = 0;
        vm.pageSize = 20;


        vm.chargeTout = function () {
            FetchData.getData(API_URL + 'api/tous-les-inventaires?page=' + vm.currentPage + '&size=' + vm.pageSize).then(function (response) {
                console.log(response);
                vm.allInventaires = response.data.content;
                vm.totalElements = response.data.totalElements;
                vm.totalPage = response.data.totalPages;

                console.log('nombre d\'élément ' + vm.totalElements);
                console.log('nombre de page ' + vm.totalPage);
            }, function (error) {
                console.log(error);
            });
        };

        vm.trouverMoisInventaire = function () {
            var nomDuMagasin = '';            
            var dateMois = '';
            nomDuMagasin = vm.inventaire.magasin.nomMagasin;
            dateMois = DateUtils.convertLocalDateToServer(vm.inventaire.dateInventaire);
          
            if (!(nomDuMagasin && dateMois)) {
                return vm.chargeTout();
            }
            FetchData.getData(API_URL + 'api/trouver-inventaires-magasin?nomMagasin=' + nomDuMagasin + '&dateDuMois=' + dateMois + '&page=' + vm.currentPage + '&size=' + vm.pageSize).then(function (response) {
                vm.totalElements = '';
                vm.totalPage = '';
                vm.allInventaires = response.data.content;
                vm.totalElements = response.data.totalElements;
                vm.totalPage = response.data.totalPages;

                console.log('nombre d\'élément ' + vm.totalElements);
                console.log('nombre de page ' + vm.totalPage);
                console.log('LA RECHERCHE ' + vm.allInventaires);
            }, function (error) {
                console.log(error);
            });
        };


        vm.setPage = function (p) {
            vm.currentPage = p;
            vm.chargeTout();
        };

        vm.chargeTout();
        


        vm.imprimerSituationDestock = function(){
             var dateMois = '';
            dateMois = DateUtils.convertLocalDateToServer(vm.inventaire.dateInventaire);
//            console.log('ouhhh !'+dateMois);
            vm.pdfContent = API_URL + 'api/report/inventaire/vm.inventaire.magasin.nomMagasin/dateMois';
            $rootScope.situationDeStockUrl = API_URL + 'api/report/inventaire/' + vm.inventaire.magasin.nomMagasin+ '/' + dateMois ;
            console.log('url finale ' + $rootScope.situationDeStockUrl);
            $state.go('inventaire-stuation-stock-pdf');
        };




        loadAll();

        function loadAll() {
            if (pagingParams.search) {
                InventaireSearch.query({
                    query: pagingParams.search,
                    page: pagingParams.page - 1,
                    size: vm.itemsPerPage,
                    sort: sort()
                }, onSuccess, onError);
            } else {
                Inventaire.query({
                    page: pagingParams.page - 1,
                    size: vm.itemsPerPage,
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
                vm.inventaires = data;
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadPage(page) {
            vm.page = page;
            vm.transition();
        }

        function transition() {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }

        function search(searchQuery) {
            if (!searchQuery) {
                return vm.clear();
            }
            vm.links = null;
            vm.page = 1;
            vm.predicate = '_score';
            vm.reverse = false;
            vm.currentSearch = searchQuery;
            vm.transition();
        }

        function clear() {
            vm.links = null;
            vm.page = 1;
            vm.predicate = 'id';
            vm.reverse = true;
            vm.currentSearch = null;
            vm.transition();
        }

        vm.datePickerOpenStatus.dateInventaire = false;

        function openCalendar(date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
