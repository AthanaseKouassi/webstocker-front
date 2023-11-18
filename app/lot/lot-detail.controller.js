(function() {
    'use strict';

    angular
        .module('app')
        .controller('LotDetailController', LotDetailController);

    LotDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Lot', 'Produit'];

    function LotDetailController($scope, $rootScope, $stateParams, entity, Lot, Produit) {
        var vm = this;
        vm.lot = entity;
        vm.load = function (id) {
            Lot.get({id: id}, function(result) {
                vm.lot = result;
            });
        };
        var unsubscribe = $rootScope.$on('webstockerApp:lotUpdate', function(event, result) {
            vm.lot = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
