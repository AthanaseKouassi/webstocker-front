(function() {
    'use strict';

    angular
        .module('app')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$rootScope','$location', '$state', 'Auth', 'Principal', 'ENV', 'LoginService'];

    function NavbarController ($rootScope,$location, $state, Auth, Principal, ENV, LoginService) {
        var vm = this;

        vm.navCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.inProduction = ENV === 'prod';
        vm.login = login;
        vm.logout = logout;
        vm.$state = $state;


        function login () {
            LoginService.open();
        }

        $rootScope.stock=function () {
            console.log("inside the trick");
             $rootScope.menuElement="stock";
            // $rootScope.$watch('menuElement', function(newValue, oldValue) {
            //     console.log("new value");
            //     console.log(newValue);
            //     console.log("old value");
            //     console.log(oldValue);
            //     $rootScope.menuElement = newValue;
            // });
            console.log("inside after the trick");
            // $rootScope.$digest();
            return $rootScope.menuElement;
        }

        $rootScope.facturation=function () {
            console.log("inside the trick");
             $rootScope.menuElement="facturation";
            // $rootScope.$watch('menuElement', function(newValue, oldValue) {
            //     console.log("new value");
            //     console.log(newValue);
            //     console.log("old value");
            //     console.log(oldValue);
            //     $rootScope.menuElement = newValue;
            // });
            console.log("inside after the trick");
            // $rootScope.$digest();
            return $rootScope.menuElement;
        }

        $rootScope.activite=function () {
            console.log("inside the trick");
             $rootScope.menuElement="activite";
            // $rootScope.$watch('menuElement', function(newValue, oldValue) {
            //     console.log("new value");
            //     console.log(newValue);
            //     console.log("old value");
            //     console.log(oldValue);
            //     $rootScope.menuElement = newValue;
            // });
            console.log("inside after the trick");
            // $rootScope.$digest();
            return $rootScope.menuElement;
        }
        
        $rootScope.facturation=function () {
            console.log("inside the trick");
             $rootScope.menuElement="facturation";
            // $rootScope.$watch('menuElement', function(newValue, oldValue) {
            //     console.log("new value");
            //     console.log(newValue);
            //     console.log("old value");
            //     console.log(oldValue);
            //     $rootScope.menuElement = newValue;
            // });
            console.log("inside after the trick");
            // $rootScope.$digest();
            return $rootScope.menuElement;
        }
        
        function logout () {
            Auth.logout();
            //$state.go('home');
        }
    }
})();
