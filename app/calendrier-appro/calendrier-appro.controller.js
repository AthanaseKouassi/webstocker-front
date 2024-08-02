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
        vm.produits = [];
        vm.produit = {};
        vm.inventaires = [];
        vm.searchAnnee = '';
        vm.typeRecherche = 'bymoisannee'
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


            FetchData.getData(API_URL + 'api/produits')
            .then(function (response) {
                // console.log(response);
                vm.produits = response.data;
                // vm.totalElements = response.data.totalElements;
                // vm.totalPage = response.data.totalPages;

                // console.log('nombre d\'élément ' + vm.totalElements);
                // console.log('nombre de page ' + vm.totalPage);
                // console.log("OUUHHH "+vm.inventaires);
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
            console.log(API_URL + 'api/_search/inventaire/'+searchQuery);
            FetchData.getData(API_URL + 'api/_search/inventaire/'+searchQuery)
            .then(function (response) {
                console.log(response);
                vm.inventaires = response.data;
                console.log(API_URL + 'api/_search/inventaire/ RESPONSE', response);
                
            }, function (error) {
                console.log(error);
            });

        }


 
        };

        vm.searchProduitAnnee = function () {
            console.log("bouton cliqué", vm.searchQuery);
            if (vm.searchQuery && vm.produit.id) {
                var dateFormat = 'yyyy';
                var searchAnnee = $filter('date')(vm.searchQuery, dateFormat);
                console.log(API_URL + 'api/_search/'+searchAnnee+'/inventaire/'+vm.produit.id);
                FetchData.getData(API_URL + 'api/_search/'+searchAnnee+'/inventaire/'+vm.produit.id)
                .then(function (response) {
                    console.log(response);
                    vm.inventaires = response.data;
                    console.log(API_URL + 'api/_search/inventaire/ RESPONSE', response);
                 
                }, function (error) {
                    console.log(error);
                });

            }
 
        };



        // vm.search = function () {
        //     console.log("bouton cliqué", vm.searchQuery);
        //     if (vm.searchQuery) {
        //         var dateFormat = 'yyyy-MM-dd';
        //         var searchQuery = $filter('date')(vm.searchQuery, dateFormat);
        //         console.log(API_URL + 'api/search/'+searchQuery+'/inventaires?page=' + (vm.currentPage ?? 0) + '&size=' + (vm.pageSize ?? 3));
        //         FetchData.getData(API_URL + 'api/search/'+searchQuery+'/inventaires?page=' + (vm.currentPage ?? 0) + '&size=' + (vm.pageSize ?? 3))
        //         .then(function (response) {
        //             console.log(response);
        //             vm.inventaires = response.data.content;
        //             vm.totalElements = response.data.totalElements;
        //             vm.totalPage = response.data.totalPages;

        //             console.log('nombre d\'élément ' + vm.totalElements);
        //             console.log('nombre de page ' + vm.totalPage);
        //             console.log("OUUHHH "+vm.inventaires);
        //         }, function (error) {
        //             console.log(error);
        //         });

        //     }
 
        // };
        vm.loadAll();


        vm.exportExcel = function () {
                var dateFormat = 'yyyy-MM-dd';
                var searchQuery = $filter('date')(new Date(), dateFormat);

                var url = API_URL + 'api/report/inventaires/calendrier-approvisionnement/'+searchQuery/* + '?access_token=' + authToken*/;
                location.assign(url);
        }


        



        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.searchAnnee = false;
        vm.datePickerOpenStatus.searchDate = false;
    
        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
        

        vm.changeOptions = function() {
            return vm.produit.id ? vm.options : vm.options2;
        }


        


        // vm.dt = new Date();
        //         vm.format = 'yyyy';
        //         vm.altInputFormats = ['yyyy'];
                vm.options = {
                    minMode: 'year',
                    datepickerMode: 'year',
                    formatYear: 'yyyy',
                    maxDate: new Date(),
                    startingDay: 1,
                    showWeeks: false
                };


                vm.options2 = {
                    minMode: 'month',
                    datepickerMode: 'month',
                    formatMonth: 'MMMM',
                    formatYear: 'yyyy',
                    maxDate: new Date(),
                    startingDay: 1,
                    showWeeks: false
                };

                // vm.popup = {
                //     opened: false
                // };

                // vm.open = function() {
                //     console.log("OPEN");
                //     vm.popup.opened = true;
                // };



    }
})();
