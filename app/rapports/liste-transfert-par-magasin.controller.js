(function () {
    'use strict';

    angular
            .module('app')
            .controller('ListeTranfertParMagasinController', ListeTranfertParMagasinController);

    ListeTranfertParMagasinController.$inject = ['$rootScope', '$scope', '$state', '$stateParams'];

    function ListeTranfertParMagasinController($rootScope, $scope, $state, $stateParams) {
        var vm = this;

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
        };

        vm.rechercherFactures = function (criteria) {
            console.log(obj)
            alert('essai');
        }

    }
})();
