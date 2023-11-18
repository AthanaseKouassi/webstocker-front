(function() {
    'use strict';

    angular
        .module('app')
        .controller('LigneBonDeSortieDetailController', LigneBonDeSortieDetailController);

    LigneBonDeSortieDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'LigneBonDeSortie', 'Produit', 'BonDeSortie'];

    function LigneBonDeSortieDetailController($scope, $rootScope, $stateParams, entity, LigneBonDeSortie, Produit, BonDeSortie) {
        var vm = this;
        vm.ligneBonDeSortie = entity;
        vm.load = function (id) {
            LigneBonDeSortie.get({id: id}, function(result) {
                vm.ligneBonDeSortie = result;
            });
        };
        var unsubscribe = $rootScope.$on('webstockerApp:ligneBonDeSortieUpdate', function(event, result) {
            vm.ligneBonDeSortie = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
