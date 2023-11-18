(function() {
    'use strict';

    angular
        .module('app')
        .controller('CommandeDetailController', CommandeDetailController);

    CommandeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Commande', 'Livraison', 'Lignecommande', 'Bailleur', 'Fabricant'];

    function CommandeDetailController($scope, $rootScope, $stateParams, entity, Commande, Livraison, Lignecommande, Bailleur, Fabricant) {
        var vm = this;
        vm.commande = entity;
        vm.load = function (id) {
            Commande.get({id: id}, function(result) {
                vm.commande = result;
            });
        };
        var unsubscribe = $rootScope.$on('webstockerApp:commandeUpdate', function(event, result) {
            vm.commande = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
