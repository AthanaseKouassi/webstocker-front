(function () {
    'use strict';

    angular
            .module('app')
            .controller('BonDeSortieParMagasinController', BonDeSortieParMagasinController);

    BonDeSortieParMagasinController.$inject = ['$rootScope', '$scope', '$state', '$stateParams','API_URL'];

    function BonDeSortieParMagasinController($rootScope, $scope, $state, $stateParams,API_URL) {
        var vm = this;

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
        };

    }
})();
