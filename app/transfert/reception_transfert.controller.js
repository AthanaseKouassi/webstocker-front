(function () {
    'use strict';

    angular
            .module('app')
            .controller('ReceptionTransfertController', ReceptionTransfertController);

    ReceptionTransfertController.$inject = ['$scope', '$state', 'AlertService', '$stateParams', 'API_URL', 'FetchData','BonDeSortie'];

    function ReceptionTransfertController($scope, $state, AlertService, $stateParams, API_URL, FetchData,BonDeSortie) {
        var vm = this;
         vm.bonDeSorties = BonDeSortie.query();
         vm.bonDeSortie = [];

        vm.currentPage = 0;
        vm.pageSize = 20;

        vm.load = function (id) {
            BonDeSortie.get({id: id}, function (result) {
                vm.bonDeSortie = result;
                console.log(vm.bonDeSortie);
                console.log("le resultat de la date " + vm.bonDeSortie.daateCreation);
            });
        };
        vm.loadAllPage = function () {
            FetchData.getData(API_URL + 'api/bon-de-sortie-transfert/transfert-encours?page=' + vm.currentPage + '&size=' + vm.pageSize)
                    .then(function (response) {
                        console.log(response);
                        vm.bonDeSortie = response.data.content;
                        vm.totalElements = response.data.totalElements;
                        vm.totalPage = response.data.totalPages;

                        console.log('nombre d\'élément ' + vm.totalElements);
                        console.log('nombre de page ' + vm.totalPage);
                        console.log("OUUHHH "+vm.bonDeSortie.numero);
                    }, function (error) {
                        console.log(error);
                    });
        };

        vm.setPage = function (p) {
            vm.currentPage = p;
            vm.loadAllPage();
        };

        vm.loadAllPage();

//        $scope.datePickerOpenStatus = {};
//        $scope.datePickerOpenStatus.dateReception = false;
//
//        $scope.openCalendar = function (date) {
//            $scope.datePickerOpenStatus[date] = true;
//        };
    }
})();
