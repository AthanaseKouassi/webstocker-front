(function () {
    'use strict';

    angular
            .module('app')
            .controller('InventaireDialogController', InventaireDialogController);

    InventaireDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Inventaire', 'Produit', 'Magasin', 'API_URL', 'FetchData','DateUtils'];

    function InventaireDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, Inventaire, Produit, Magasin, API_URL, FetchData,DateUtils ) {
        var vm = this;

        vm.inventaire = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.produits = Produit.query();
        vm.magasins = Magasin.query();


        $scope.$watch('vm.inventaire.produit', function (newValue) {
            console.log(newValue);           
            var madate = '';
            vm.inventaire.stockFinalTheorique='';
            if (newValue !== null) {
                madate = DateUtils.convertLocalDateToServer(vm.inventaire.dateInventaire);
                FetchData.getData(API_URL + 'api/inventaire/quantite-theorique?nomProduit=' + vm.inventaire.produit.nomProduit + '&nomMagasin=' + vm.inventaire.magasin.nomMagasin + '&dateInventaire=' + madate)
                        .then(function (reponse) {
                            console.log(reponse);
                            vm.inventaires = reponse.data;
                            vm.inventaire.stockFinalTheorique = vm.inventaires.quantiteTheorique;

                            console.log('ouh ouhhh !! ' + vm.inventaire.stockFinalTheorique);
                        }, function (error) {
                            console.log(error);
                        });

            }

        }, true);

        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            vm.isSaving = true;
            if (vm.inventaire.id !== null) {
                Inventaire.update(vm.inventaire, onSaveSuccess, onSaveError);
            } else {
                Inventaire.save(vm.inventaire, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess(result) {
            $scope.$emit('webstockerApp:inventaireUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError() {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.dateInventaire = false;

        function openCalendar(date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
