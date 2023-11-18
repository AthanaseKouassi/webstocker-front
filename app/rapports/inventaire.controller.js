(function(){
    'use strict';
    
    angular
            .module('app')
            .controller('InventaireController', InventaireController);
    
    InventaireController.$inject = ['$rootScope','$scope', '$state', '$stateParams','API_URL' ,'Magasin','Produit','entityInventaire'];
    
    function InventaireController ($rootScope,$scope, $state, $stateParams,API_URL,Magasin,Produit,entityInventaire){
        var vm = this;
        vm.inventaireData = entityInventaire;
        vm.magasins = Magasin.query();
        vm.produits = Produit.query();
        
//        vm.essaiFunction = function(){
//            console.log("oohhhhh");
//             console.log("la quantite "+vm.inventaireData.quantite);
//             console.log("le magasin "+vm.inventaireData.magasin.nomMagasin);
//             console.log("la date debut "+vm.inventaireData.dateDebut);
//             console.log("la date fin "+vm.inventaireData.dateFin);
//        };
       
        
        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateDebutMois = false;
        vm.datePickerOpenStatus.dateFinMois = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();