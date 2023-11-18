(function() {
    'use strict';

    angular
        .module('app')
        .controller('LivraisonDetailController', LivraisonDetailController);

    LivraisonDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Livraison', 'Magasin', 'Lot', 'Commande'];

    function LivraisonDetailController($scope, $rootScope, $stateParams,  entity, Livraison, Magasin, Lot, Commande) {
        var vm = this;
        vm.livraison = entity;
        vm.load = function (id) {
            Livraison.get({id: id}, function(result) {
                vm.livraison = result;
            });
        };
        var unsubscribe = $rootScope.$on('webstockerApp:livraisonUpdate', function(event, result) {
            vm.livraison = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
