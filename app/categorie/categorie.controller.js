(function() {
    'use strict';

    angular
        .module('app')
        .controller('CategorieController', CategorieController);

    CategorieController.$inject = ['$scope', '$state', 'Categorie', 'CategorieSearch','API_URL'];

    function CategorieController ($scope, $state, Categorie, CategorieSearch, API_URL) {
        var vm = this;
        vm.categories = [];
        vm.loadAll = function() {
            Categorie.query(function(result) {
                vm.categories = result;
            });
        };
       
       $scope.urlHost = API_URL;

        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            CategorieSearch.query({query: vm.searchQuery}, function(result) {
                vm.categories = result;
            });
        };
        vm.loadAll();
        
    }
})();
