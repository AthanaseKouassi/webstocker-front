(function () {
    'use strict';

    angular
            .module('app')
            .controller('CategorieDialogController', CategorieDialogController)
            .value('URL_SEARCH_CATEGORIE', 'api/categories/parnomcategorie/');
//            .value('URL_SEARCH_CATEGORIE', 'http://83.166.138.228:8080/api/categories/parnomcategorie/');
//            .value('URL_SEARCH_CATEGORIE', 'http://localhost:8080/api/categories/parnomcategorie/');

    CategorieDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Categorie', 'Produit', 'FetchData', 'URL_SEARCH_CATEGORIE','API_URL'];

    function CategorieDialogController($scope, $stateParams, $uibModalInstance, entity, Categorie, Produit, FetchData, URL_SEARCH_CATEGORIE,API_URL) {
        var vm = this;
        vm.categorie = entity;
        vm.produits = Produit.query();
        vm.donnees = {};
//        vm.donnees = [];


        vm.load = function (id) {
            Categorie.get({id: id}, function (result) {
                vm.categorie = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:categorieUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };


        vm.rechercher = function (libelle) {
            FetchData.getData(API_URL+URL_SEARCH_CATEGORIE + libelle).then(function (result) {
                console.log(result);
                vm.donnees = result.data;
                console.log('DONNEES TROUVER ' + vm.donnees.nomCategorie);
                if (vm.categorie.id === null) {
                    if (angular.lowercase(vm.donnees.nomCategorie) === angular.lowercase(vm.categorie.nomCategorie)) {
                        alert("Attention, cette information existe déjà!");
                    }
                } else if (angular.lowercase(vm.donnees.nomCategorie) === angular.lowercase(vm.categorie.nomCategorie)) {
                    alert("Attention, cette information existe déjà!");
                    // vm.save();
                }
            }, function (error) {
//            alert('Erreur lors du chargement des données');
                vm.save();
            });
        };



        vm.save = function () {
            vm.isSaving = true;
            if (vm.categorie.id !== null) {
                Categorie.update(vm.categorie, onSaveSuccess, onSaveError);
            } else {
                Categorie.save(vm.categorie, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };


    }
})();
