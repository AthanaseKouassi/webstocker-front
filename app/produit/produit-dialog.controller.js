(function () {
    'use strict';

    angular
            .module('app')
            .controller('ProduitDialogController', ProduitDialogController)
//            .value('URL_SEARCH_PRODUIT', 'http://localhost:8080/api/produits/produitsparNomProduit/');
//            .value('URL_SEARCH_PRODUIT', 'http://83.166.138.228:8080/api/produits/produitsparNomProduit/');
            .value('URL_SEARCH_PRODUIT', 'api/produits/produitsparNomProduit/');

    ProduitDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'API_URL', 'entity', 'Produit', 'Categorie', 'Lignecommande', 'Conditionnement', 'Lot', 'Ligneobjectifvente', 'Fabricant', 'FetchData', 'URL_SEARCH_PRODUIT'];

    function ProduitDialogController($scope, $stateParams, $uibModalInstance, API_URL,entity, Produit, Categorie, Lignecommande, Conditionnement, Lot, Ligneobjectifvente, Fabricant, FetchData, URL_SEARCH_PRODUIT) {
        var vm = this;
        vm.produit = entity;
        vm.categories = Categorie.query();
        vm.lignecommandes = Lignecommande.query();
        vm.conditionnements = Conditionnement.query();
        vm.lots = Lot.query();
        vm.ligneobjectifventes = Ligneobjectifvente.query();
        vm.fabricants = Fabricant.query();
        vm.donnees = {};
        vm.load = function (id) {
            Produit.get({id: id}, function (result) {
                vm.produit = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:produitUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.rechercher = function (nomProduit) {
            FetchData.getData(API_URL+URL_SEARCH_PRODUIT + nomProduit).then(function (result) {
                console.log(result);
                vm.donnees = result.data;
                console.log('DONNEES TROUVER ' + vm.donnees.nomProduit);
                if (vm.produit.id === null) {
                    if (angular.lowercase(vm.donnees.nomProduit) === angular.lowercase(vm.produit.nomProduit)) {
                        alert("Attention, cette information existe déjà!");
                    }
                } else if (angular.lowercase(vm.donnees.nomProduit) === angular.lowercase(vm.produit.nomProduit)) {
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
            if (vm.produit.id !== null) {
                Produit.update(vm.produit, onSaveSuccess, onSaveError);
            } else {
                Produit.save(vm.produit, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
