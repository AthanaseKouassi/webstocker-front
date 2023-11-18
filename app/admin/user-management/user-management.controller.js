(function () {
    'use strict';

    angular
            .module('app')
            .controller('UserManagementController', UserManagementController);

    UserManagementController.$inject = ['Principal', 'User', 'ParseLinks', 'paginationConstants', 'JhiLanguageService', 'API_URL', 'FetchData'];

    function UserManagementController(Principal, User, ParseLinks, paginationConstants, JhiLanguageService, API_URL, FetchData) {
        var vm = this;

        vm.authorities = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_CPF',
            'ROLE_CCC',
            'ROLE_MAGASINIER',
            'ROLE_VIH_IST',
            'ROLE_CHEF_ANTENNE',
            'ROLE_LECTURE',
            'ROLE_CONSULTATION',
            'ROLE_GEST_CLIENT',
            'ROLE_ACHAT',
            'ROLE_VENTE',
            'ROLE_ACTIVITE',
            'ROLE_SVP',
            'ROLE_PARAMETRE',
            'ROLE_TCF',
            'ROLE_TRANSFERT',
            'ROLE_OBJECTIF',
            'ROLE_PAP',
            'ROLE_MODIFICATION'];
        vm.clear = clear;
        vm.currentAccount = null;
        vm.languages = null;
        vm.links = null;
        vm.loadAll = loadAll;
        vm.loadPage = loadPage;
        vm.page = 1;
        vm.setActive = setActive;
        vm.totalItems = null;
        vm.users = [];
       
        vm.userAimas = null;

        vm.currentPage = 0;
        vm.pageSize = 20;


        vm.loadAll();

        JhiLanguageService.getAll().then(function (languages) {
            vm.languages = languages;
        });

        Principal.identity().then(function (account) {
            vm.currentAccount = account;
        });


        FetchData.getData(API_URL + 'api/users/allusers').then(function (response) {
            console.log(response);
            vm.userAimas = response.data;
        }, function (error) {
            console.log(error);
        });

    


//        vm.uploadPage = function () {
//            FetchData.getData(API_URL + 'api/users/allusers-by-page?page='+vm.currentPage+'&size='+vm.pageSize).then(function (response) {
//                console.log(response);
//                vm.userAimas = response.data;
//                // vm.regionsParPage = response.data.content; 
//                 vm.totalElements = response.totalElements;
//                 vm.totalPage = response.totalPages;
//                 
//            }, function (error) {
//                console.log(error);
//            });
//        };
//
//        vm.setPage = function (p) {
//            vm.currentPage = p;
//            vm.uploadPage();
//        };
//       
//        vm.uploadPage();


        function loadAll() {
            User.query({page: vm.page - 1, size: paginationConstants.itemsPerPage}, function (result, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.users = result;
            });
        }

        function loadPage(page) {
            vm.page = page;
            vm.loadAll();
        }

        function setActive(user, isActivated) {
            user.activated = isActivated;
            User.update(user, function () {
                vm.loadAll();
                vm.clear();
            });
        }

        function clear() {
            vm.user = {
                id: null, login: null, firstName: null, lastName: null, email: null,
                activated: null, langKey: null, createdBy: null, createdDate: null,
                lastModifiedBy: null, lastModifiedDate: null, resetDate: null,
                resetKey: null, authorities: null
            };
            vm.editForm.$setPristine();
            vm.editForm.$setUntouched();
            
            
            
        }
    }
})();
