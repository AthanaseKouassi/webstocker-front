(function() {
    'use strict';

    angular
        .module('app')
        .controller('BonDeSortieDetailController', BonDeSortieDetailController);

    BonDeSortieDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'BonDeSortie', 'User', 'Client', 'Magasin'];

    function BonDeSortieDetailController($scope, $rootScope, $stateParams, entity, BonDeSortie, User, Client, Magasin) {
        var vm = this;
        vm.bonDeSortie = entity;
        vm.load = function (id) {
            BonDeSortie.get({id: id}, function(result) {
                vm.bonDeSortie = result;
            });
        };
        var unsubscribe = $rootScope.$on('webstockerApp:bonDeSortieUpdate', function(event, result) {
            vm.bonDeSortie = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
