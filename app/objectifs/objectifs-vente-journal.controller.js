(function() {
    'use strict';

    angular
        .module('app')
        .controller('ObjectifVenteJournalController', ObjectifVenteJournalController);

    ObjectifVenteJournalController.$inject = ['$scope', '$state', 'Objectifs','entity','Produit','BonDeSortie','LigneBonDeSortie'];

    function ObjectifVenteJournalController ($scope, $state, Objectifs, entity, Produit,BonDeSortie,LigneBonDeSortie) {
        var vm = this;
        vm.rapportData = entity;
        vm.produits = Produit.query();
        vm.bonDeSortie = BonDeSortie.query();
        vm.ligneBonDeSortie = LigneBonDeSortie.query();
        vm.objectifResultat = [];
        
        vm.load = function(id) {
            Objectifs.get({id : id}, function(result) {
                vm.objectifs = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:objectifsUpdate', result);
            //$uibModalInstance.close(result);
            vm.objectifs = result;
            console.log(vm.objectifs);
            vm.isSaving = false;
//            $state.go('objectifs-de-vente');
            $state.go('objectifs');
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.objectifs.id !== null) {
                Objectifs.update(vm.objectifs, onSaveSuccess, onSaveError);
            } else {
                Objectifs.save(vm.objectifs, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
           // $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
       // vm.datePickerOpenStatus.periode = false;
         vm.datePickerOpenStatus.dateDebut = false;
        vm.datePickerOpenStatus.dateFin = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();