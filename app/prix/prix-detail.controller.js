(function() {
    'use strict';

    angular
        .module('app')
        .controller('PrixDetailController', PrixDetailController);

    PrixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Prix', 'Produit', 'Categorieclient'];

    function PrixDetailController($scope, $rootScope, $stateParams, entity, Prix, Produit, Categorieclient) {
        var vm = this;
        vm.prix = entity;
        vm.load = function (id) {
            Prix.get({id: id}, function(result) {
                vm.prix = result;
            });
        };
        var unsubscribe = $rootScope.$on('webstockerApp:prixUpdate', function(event, result) {
            vm.prix = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
