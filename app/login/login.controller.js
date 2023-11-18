 (function () {
    'use strict';

    angular
            .module('app')
            .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', 'User'];

    function LoginController($rootScope, $state, $timeout, Auth, User) {
        var vm = this;

        vm.authenticationError = false;
        vm.cancel = cancel;
        vm.credentials = {};
        vm.login = login;
        vm.password = null;
        vm.register = register;
        vm.rememberMe = true;
        vm.requestResetPassword = requestResetPassword;
        vm.username = null;



        $rootScope.date = new Date();//pour la recuperation de la date

        $timeout(function () {
            angular.element('[ng-model="vm.username"]').focus();
        });

        function cancel() {
            vm.credentials = {
                username: null,
                password: null,
                rememberMe: true
            };
            vm.authenticationError = false;
            // $uibModalInstance.dismiss('cancel');
        }

        function login(event) {
            console.log("mode login doh ouou");
            event.preventDefault();
            Auth.login({
                username: vm.username,
                password: vm.password,
                rememberMe: vm.rememberMe

            }).then(function () {
                vm.authenticationError = false;
                console.log("c ok la connexion");
                console.log($rootScope.user);
                User.get({login: vm.username}, function (result) {
                    console.log(result);
                $rootScope.user = result;
                });
                //$uibModalInstance.close();
                // If we're redirected to login, our
                // previousState is already set in the authExpiredInterceptor. When login succesful go to stored state
                if ($rootScope.redirected && $rootScope.previousStateName) {
                    $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
                    $rootScope.redirected = false;
                } else {
                    $rootScope.$broadcast('authenticationSuccess');
                }
            }).catch(function () {
                console.log("mode erreur");
                vm.authenticationError = true;
            });
        }

        function register() {
            //$uibModalInstance.dismiss('cancel');
            $state.go('register');
        }

        function requestResetPassword() {
            //$uibModalInstance.dismiss('cancel');
            $state.go('requestReset');
        }
    }
})();
