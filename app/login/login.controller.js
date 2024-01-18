 (function () {
    'use strict';

    angular
            .module('app')
            .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', 'User', 'API_URL', 'FetchData'];

    function LoginController($rootScope, $state, $timeout, Auth, User, API_URL, FetchData) {
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

        vm.creances = [];
        $rootScope.creances = [];

        setTimeout(function() {
            console.log("Notification creances");
            vm.allCreancesByCategorie2();
        });

        setInterval(function() {
            console.log("Notification creances");
            vm.allCreancesByCategorie2();
        }, 10000);

        vm.allCreancesByCategorie2 = function () {
          
                FetchData.getData(API_URL + 'api/facture/'+1+'/categorie-creance')
                .then(function (response) {
                    console.log(response.data);
                    vm.creances = response.data && response.data.length ? response.data : [];
                    vm.totalElements = response.data.totalElements;
                    vm.totalPage = response.data.totalPages;

                    console.log('vm.creances', vm.creances.length, vm.creances);
                    console.log('nombre d\'élément ' + vm.totalElements);
                    console.log('nombre de page ' + vm.totalPage);
                    // console.log("OUUHHH "+vm.bonDeSortie.numero);

                    
                    vm.allCreancesByCategorie3();
                }, function (error) {
                    console.log(error);
                });
        };

        vm.allCreancesByCategorie3 = function () {
            
       
                FetchData.getData(API_URL + 'api/facture/'+3+'/categorie-creance')
                .then(function (response) {
                    console.log(response.data);
                    // if (!vm.creances.filter(c => c.length).length) vm.creances = [];
                    vm.creances.push(...response.data);
                    vm.totalElements = response.data.totalElements;
                    vm.totalPage = response.data.totalPages;

                    console.log('vm.creances++', vm.creances.length, vm.creances);
                    console.log('nombre d\'élément ' + vm.totalElements);
                    console.log('nombre de page ' + vm.totalPage);
                    // console.log("OUUHHH "+vm.bonDeSortie.numero);

                    console.log("BOOOOOM");
                    $rootScope.creances = vm.creances;
                    console.log("$rootScope.creances", $rootScope.creances);
                }, function (error) {
                    console.log(error);
                });
        };
    }
})();
