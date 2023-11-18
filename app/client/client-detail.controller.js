(function() {
    'use strict';

    angular
        .module('app')
        .controller('ClientDetailController', ClientDetailController);

    ClientDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Client', 'Categorieclient', 'Facture', 'Localite'];

    function ClientDetailController($scope, $rootScope, $stateParams, entity, Client, Categorieclient, Facture, Localite) {
        var vm = this;
        vm.client = entity;        
        vm.load = function (id) {
            Client.get({id: id}, function(result) {
                vm.client = result;
            });
        };
        var unsubscribe = $rootScope.$on('webstockerApp:clientUpdate', function(event, result) {
            vm.client = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
