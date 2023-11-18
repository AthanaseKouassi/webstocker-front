(function () {
    'use strict';

    angular
            .module('app')
            .controller('ObjectifMiseaJourController', ObjectifMiseaJourController)
            .value('URL_MAJ_OBJECTIF', 'api/objectifs/mise-a-jour-taux-objectifs/');

    ObjectifMiseaJourController.$inject = ['$filter', '$scope', '$state', 'entity', 'Objectifs', 'DateUtils', 'Produit', 'ObjectifsMAJ', 'ObjectifsQuantiteEtTauxAjour', 'URL_MAJ_OBJECTIF', 'API_URL', 'FetchData'];

    function ObjectifMiseaJourController($filter, $scope, $state, entity, Objectifs, DateUtils, Produit, ObjectifsMAJ, ObjectifsQuantiteEtTauxAjour, URL_MAJ_OBJECTIF, API_URL, FetchData) {
        var vm = this;
        vm.produits = Produit.query();
        vm.objectifs = [];
        vm.isDisabled = false;
        vm.objectifs = [];
        $scope.labelProduit = [];
        $scope.dataTaux = [];

        vm.load = function (id) {
            Objectifs.get({id: id}, function (result) {
                vm.objectifs = result;
            });
        };


        var dateMois = null;
        vm.afficherObjectifDuMois = function () {

            if (!vm.objectifs.periode) {
                alert('Veuillez choisir une date');
            } else {

                dateMois = DateUtils.convertLocalDateToServer(vm.objectifs.periode);

                ObjectifsMAJ.query({periode: dateMois}, function (result) {
                    vm.objectifs = result;
                });
                vm.isDisabled = true;
                console.log('ouhhh ');
                console.log('la date du mois ' + dateMois);
            }
        };



//    $scope.disableButton = function() {
//        $scope.isDisabled = true;
//    }

//        vm.miseAjourObjectifs = function () {
//            console.log('**** merci Jesus ****');
//            console.log('DANS LA METHODE MISE A JOUR ' + dateMois);
//           // if(vm.objectifs.quantiteObtenu == null){
//            ObjectifsQuantiteEtTauxAjour.query(function (result) {
//                vm.objectifs = result;
//            });
//            vm.isDisabled = false;
//            console.log("enfin total objectif "+ vm.objectifs);
//             
//        };
        vm.updateObjectifs = function () {

            // if(vm.objectifs.quantiteObtenu == null){
            FetchData.getData(API_URL + URL_MAJ_OBJECTIF + dateMois)
                    .then(function (response) {
                        console.log(response);
                        vm.objectifs = response.data;
                        vm.objectifs = response.data;
                        vm.afficherChart();
                    }, function (error) {
                        console.log(error);
                    });

//            ObjectifsQuantiteEtTauxAjour.query(function (result) {
//                vm.objectifs = result;
//            });
            vm.isDisabled = false;

            console.log("taille du tableau" + vm.objectifs.length);
        };

        var theHelp = Chart.helpers;

        $scope.options = {legend: {display: true,
                labels: {
                    generateLabels: function (chart) {
                        var data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map(function (label, i) {
                                var meta = chart.getDatasetMeta(0);
                                var ds = data.datasets[0];
                                var arc = meta.data[i];
                                var custom = arc && arc.custom || {};
                                var getValueAtIndexOrDefault = theHelp.getValueAtIndexOrDefault;
                                var arcOpts = chart.options.elements.arc;
                                var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                                var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                                var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
                                return {
                                    // And finally : 
                                    text: ds.data[i] + "% " + label,
                                    fillStyle: fill,
                                    strokeStyle: stroke,
                                    lineWidth: bw,
                                    hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                }
            }};
        
        
        
        vm.afficherChart = function () {
            var elt = '';
            for (var i = 0; i < vm.objectifs.length; i++) {

                $scope.labelProduit[i] = vm.objectifs[i].produit.nomProduit;
//                console.log("Tableau des produit  " + $scope.labelProduit[i]);
                elt = vm.objectifs[i].taux;
                $scope.dataTaux[i] = Number(Number(elt).toFixed(2));
//                console.log("Tableau des taux " + $scope.dataTaux[i] );
                elt = '';
            }
//            console.log('Taille '+$scope.dataTaux.length);
        };

        // vm.loadAll();

//       
//        var onSaveSuccess = function (result) {
//            $scope.$emit('webstockerApp:objectifsUpdate', result);
//            $uibModalInstance.close(result);
//            vm.isSaving = false;
//        };
//
//        var onSaveError = function () {
//            vm.isSaving = false;
//        };
//
//        vm.save = function () {
//            vm.isSaving = true;
//            if (vm.objectifs.id !== null) {
//                Objectifs.update(vm.objectifs, onSaveSuccess, onSaveError);
//            } else {
//                Objectifs.save(vm.objectifs, onSaveSuccess, onSaveError);
//            }
//        };
//
//        vm.clear = function() {
//            $uibModalInstance.dismiss('cancel');
//        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.periode = false;
        // vm.datePickerOpenStatus.dateFinMois = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
