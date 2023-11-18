(function() {
    'use strict';

    angular
        .module('app')
        .controller('TauxRealisationObjectifsController', TauxRealisationObjectifsController);

    TauxRealisationObjectifsController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Objectifs', 'Ligneobjectifvente'];

    function TauxRealisationObjectifsController($scope, $rootScope, $stateParams, entity, Objectifs, Ligneobjectifvente) {
        var vm = this;
        vm.objectifs = entity;
        vm.load = function (id) {
            Objectifs.get({id: id}, function(result) {
                vm.objectifs = result;
            });
        };
        var unsubscribe = $rootScope.$on('webstockerApp:objectifsUpdate', function(event, result) {
            vm.objectifs = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
