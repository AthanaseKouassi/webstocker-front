(function() {
    'use strict';

    angular
        .module('app')
        .controller('CalendrierApproController', CalendrierApproController);
        CalendrierApproController.$inject = ['$scope', '$state', 'FetchData', 'API_URL', 'AuthServerProvider', '$filter'];
    function CalendrierApproController ($scope, $state, FetchData, API_URL, AuthServerProvider, $filter) {

        var vm = this;
        vm.produits = [];
        vm.produit = {};
        vm.inventaires = [];
        vm.searchAnnee = '';
        vm.typeRecherche = 'bymoisannee'
        var authToken = AuthServerProvider.getToken();

        vm.loadAll = function() {
            
            FetchData.getData(API_URL + 'api/_page/inventaires')
            .then(function (response) {
                console.log("inventaires @@@@@@@@@@@@@@@", response);
                vm.inventaires = response.data;
            }, function (error) {
                console.log(error);
            });


            FetchData.getData(API_URL + 'api/produits')
            .then(function (response) {
                vm.produits = response.data;
            }, function (error) {
                console.log(error);
            });



        };

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
        vm.formatDate = function (myDate) {
            var dateFormat = 'dd MMM yyyy';
            return $filter('date')(myDate, dateFormat);
        }
    }
})();
