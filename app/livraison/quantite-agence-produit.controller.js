(function() {
    'use strict';

    angular
        .module('app')
        .controller('QuantiteAgenceproduitController', QuantiteAgenceproduitController);

    QuantiteAgenceproduitController.$inject = ['$scope', '$stateParams', 'Lot', 'Produit','Fabricant','Livraison', 'Magasin', 'Commande'];

    function QuantiteAgenceproduitController ( $scope, $stateParams, Lot, Produit, Fabricant, Livraison, Magasin, Commande) {
        var vm = this;
        //vm.livraison = entity;
        vm.lots = Lot.query();
        vm.produits = Produit.query();
        vm.fabricant = Fabricant.query();
        vm.livraison = Livraison.query();
        vm.magasins = Magasin.query();
        vm.commandes = Commande.query(); 
        //pour la date fin de période
        vm.livraisonf = Livraison.query();
              
        
        vm.load = function(id) {
            Livraison.get({id : id}, function(result) {
                vm.livraison = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:livraisonUpdate', result);
            //$uibModalInstance.close(result);
            console.log(result);
            vm.livraison = result;
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.livraison.id !== null) {
                Livraison.update(vm.livraison, onSaveSuccess, onSaveError);
            } else {
                Livraison.save(vm.livraison, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
           // $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateLivraison = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
        
        vm.datePickerOpenStatusFin = {};
        vm.datePickerOpenStatusFin.dateLivraison = false;
        
        vm.openCalendarFin = function(date){
            vm.datePickerOpenStatusFin[date] = true;
        };
        
        vm.mouvement = function(){
           
        };
        
        
    }
})();

