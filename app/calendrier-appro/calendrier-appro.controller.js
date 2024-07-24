(function() {
    'use strict';

    angular
        .module('app')
        .controller('CalendrierApproController', CalendrierApproController);
 /*'Lignefacture', 'LignefactureSearch'*/
        CalendrierApproController.$inject = ['$scope', '$state', 'FetchData', 'API_URL', 'AuthServerProvider', '$filter'];

        /*Lignefacture, LignefactureSearch*/
    function CalendrierApproController ($scope, $state, FetchData, API_URL, AuthServerProvider, $filter) {

        var vm = this;
        vm.inventaires = [];
        var authToken = AuthServerProvider.getToken();
        vm.loadAll = function() {
            
            FetchData.getData(API_URL + 'api/page/inventaires?page=' + (vm.currentPage ?? 0) + '&size=' + (vm.pageSize ?? 3))
            .then(function (response) {
                console.log(response);
                vm.inventaires = response.data.content;
                vm.totalElements = response.data.totalElements;
                vm.totalPage = response.data.totalPages;

                console.log('nombre d\'élément ' + vm.totalElements);
                console.log('nombre de page ' + vm.totalPage);
                console.log("OUUHHH "+vm.inventaires);
            }, function (error) {
                console.log(error);
            });



        };


        // vm.lignefactures = [];
        // vm.loadAll = function() {
        //     Lignefacture.query(function(result) {
        //         vm.lignefactures = result;
        //     });
        // };

        vm.searchQuery = '';
        vm.search = function () {
            console.log("bouton cliqué", vm.searchQuery);
            if (vm.searchQuery) {
                var dateFormat = 'yyyy-MM-dd';
                var searchQuery = $filter('date')(vm.searchQuery, dateFormat);
                console.log(API_URL + 'api/search/'+searchQuery+'/inventaires?page=' + (vm.currentPage ?? 0) + '&size=' + (vm.pageSize ?? 3));
                FetchData.getData(API_URL + 'api/search/'+searchQuery+'/inventaires?page=' + (vm.currentPage ?? 0) + '&size=' + (vm.pageSize ?? 3))
                .then(function (response) {
                    console.log(response);
                    vm.inventaires = response.data.content;
                    vm.totalElements = response.data.totalElements;
                    vm.totalPage = response.data.totalPages;

                    console.log('nombre d\'élément ' + vm.totalElements);
                    console.log('nombre de page ' + vm.totalPage);
                    console.log("OUUHHH "+vm.inventaires);
                }, function (error) {
                    console.log(error);
                });

            }
 
        };
        vm.loadAll();


        vm.exportExcel = function (inventaire) {
            var url = API_URL + 'api/report/inventaires/calendrier-approvisionnement/'+inventaire.dateInventaire/* + '?access_token=' + authToken*/;
            window.open(url);
        }

        
    }
})();
