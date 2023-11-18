(function() {
    'use strict';

    angular
        .module('app')
        .controller('ObjectifsMajDialogController', ObjectifsMajDialogController);

    ObjectifsMajDialogController.$inject = ['$scope', '$stateParams','DateUtils', '$uibModalInstance','entity', 'Objectifs', 'Produit','ObjectifsQuantieObtenue','LigneBonDeSortie','ObjectifsTauxAmettreAjourService','ObjectifsTauxMAJ'];

    function ObjectifsMajDialogController ($scope, $stateParams,DateUtils, $uibModalInstance, entity, Objectifs, Produit, ObjectifsQuantieObtenue,LigneBonDeSortie,ObjectifsTauxAmettreAjourService,ObjectifsTauxMAJ) {
        var vm = this;
        vm.objectifs = entity;
        vm.produits = Produit.query();
        
       // vm.produitEntity = entityProduit;
        
        
        vm.load = function(id) {
            ObjectifsTauxMAJ.get({id : id}, function(result) {
                vm.objectifs = result;
            });  
        };
//        vm.dateperide = DateUtils.convertLocalDateToServer( vm.objectifs.periode);
//        vm.pro = vm.objectifs.produit;
        
        $scope.qteObtenue = [];
        $scope.qteObtenue = vm.load(vm.objectifs.id);
        
        console.log('ouuu ahh  le resultat '+ $scope.qteObtenue);
        
        vm.afficherQuantite = function (id){           
                ObjectifsTauxMAJ.get({id : id},function(result){
                   $scope.qte = result; 
                });            
        };
        
        
        
        
        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:objectifsUpdate', result);
            $uibModalInstance.close(result);
          // console.log( sommeQuantiteVendue());
            console.log("essai "+vm.objectifs.quantiteAttendue);
           // vm.quantiteObtenue = ObjectifsQuantieObtenue.get({dateobjectif:result.periode, nomProduit:result.produit});
            console.log("rrrouroruorur "+result.periode);
            console.log("***************************************");
//            console.log("Voila l'affaire " +vm.quantiteObtenue );
            console.log("Voila l'affaire " +vm.resultat() );
            console.log("***************************************");
            
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.objectifs.id !== null) {
                ObjectifsTauxAmettreAjourService.update(vm.objectifs, onSaveSuccess, onSaveError);
            } else {
                Objectifs.save(vm.objectifs, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.periode = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
