(function () {
    'use strict';

    angular
            .module('app')
            .controller('ConfirmationTresorerieController', ConfirmationTresorerieController);

    ConfirmationTresorerieController.$inject = ['$timeout', '$scope', '$rootScope', 'Facture', '$stateParams', '$uibModalInstance', '$q', 'entity', 'BonDeSortie', 'Magasin', 'User', 'Client', 'SweetAlert', 'FetchData', 'API_URL', 'ReglementFacture', '$filter'];

    function ConfirmationTresorerieController($timeout, $scope, $rootScope, Facture, $stateParams, $uibModalInstance, $q, entity, BonDeSortie, Magasin, User, Client, SweetAlert, FetchData, API_URL, ReglementFacture, $filter) {
        var vm = this;

        vm.bonDeSortie = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        // vm.save = save;
        vm.magasins = Magasin.query();
        vm.users = User.query();
        vm.clients = Client.query();

        vm.listDetailFactureDto   = [];
        vm.numeroFacture = null;

        vm.cancel = cancel;

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        $rootScope.date = new Date();

        vm.facture = entity;
       
        console.log("vm.facture entity", vm.facture, vm.facture.id);
        vm.load = function(id) {
            Facture.get({id : id}, function(result) {
                console.log("vm.facture", vm.facture);
                vm.facture = result;
                vm.detailFacture(vm.facture.id);
            });
        };
        vm.load($stateParams.id);
        console.log("vm.facture entity @@@", vm.facture, vm.facture.id);

        // vm.clients = Client.query({filter: 'bondesortie-is-null'});
        // $q.all([vm.bonDeSortie.$promise, vm.clients.$promise]).then(function () {
        //     if (!vm.bonDeSortie.client || !vm.bonDeSortie.client.id) {
        //         return $q.reject();
        //     }
        //     return Client.get({id: vm.bonDeSortie.client.id}).$promise;
        // }).then(function (client) {
        //     vm.clients.push(client);
        // });
        // vm.magasins = Magasin.query();
        // vm.load = function (id) {
        //     BonDeSortie.get({id: id}, function (result) {
        //         vm.bonDeSortie = result;
        //     });
        // };



        // $timeout(function () {
        //     angular.element('.form-group:eq(1)>input').focus();
        // });

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

//         vm.bonDeSortie.dateReceptionTransfert = '';

//         $scope.utilisateur = {};
//         function getUsersConnecte() {
//             User.get({login: $rootScope.user.login}, function (result) {
//                 vm.bonDeSortie.dateReceptionTransfert = '';
//                 console.log(result);
//                 $scope.utilisateur = result;
// //                $rootScope.user = result;
//                 vm.bonDeSortie.emetteur = $scope.utilisateur;
//                 vm.bonDeSortie.dateReceptionTransfert = $rootScope.date;
//             });
//         }

        // getUsersConnecte();

        // function save() {
        //     vm.isSaving = true;
        //     if (vm.bonDeSortie.id !== null) {
        //         if (vm.bonDeSortie.statusTranfert !== 'ENCOURS') {
        //             BonDeSortie.update(vm.bonDeSortie, onSaveSuccess, onSaveError);
        //             //SweetAlert.success("Merci", {title: "Validation de transfert!"});
        //         } else {
        //             SweetAlert.alert("Ce transfert est encours Vous devez juste le receptionner: \n\
        //                             choisissez l'option RECU du status", {title: "Validation de transfert!"});
        //         }




        //         //                BonDeSortie.update(vm.bonDeSortie, onSaveSuccess, onSaveError);
        //     } else {
        //         BonDeSortie.save(vm.bonDeSortie, onSaveSuccess, onSaveError);
        //     }
        // }

        // function onSaveSuccess(result) {
        //     $scope.$emit('webstockerApp:bonDeSortieUpdate', result);
        //     $uibModalInstance.close(result);
        //     vm.isSaving = false;
        // }

        // function onSaveError() {
        //     vm.isSaving = false;
        // }

        vm.datePickerOpenStatus.daateCreation = false;
        vm.datePickerOpenStatus.dateReception = false;
        vm.datePickerOpenStatus.dateReceptionTransfert = false;


        function openCalendar(date) {
            console.log("openCalendar", date);
            vm.datePickerOpenStatus[date] = true;
        }

        vm.montantVerses = [];
        vm.valeurTotale = 0;
        vm.montantRegle = 0;
        vm.resteAPayer = 0;
        vm.detailFacture = function (facture_id) {
            FetchData.getData(API_URL + 'api/ligne-bds/detail-facture?idFacture=' + facture_id)
            .then(function (response) {
                console.log(response);
                vm.listDetailFactureDto = response.data;

                vm.montantVerses = Array(vm.listDetailFactureDto.length).fill(null);

                vm.listDetailFactureDto.forEach(function (l) {
                    vm.valeurTotale += l.prixDeVente;
                    vm.montantRegle += l.montantRegle;
                    vm.resteAPayer += l.resteApaye;
                    // l.resteApaye = 0;
                })
    
                console.log('detailFacture vm.ligneBonSorties ', response);
            }, function (error) {
                console.log(error);
            });
        };

        vm.versementsTotal = function() {
            return vm.montantVerses.reduce(function (a, b, ind) {
                return Number((a || 0)) + Number((b || 0));
            }, 0);
        }

        vm.verifMontantSaisie = function (index) {
            !vm.montantVerses[index] ? vm.montantVerses[index] = null : '';
        }


        vm.verifMontantMinMax = function (index) {
            if (vm.montantVerses[index] < 0) {
                vm.montantVerses[index] = 0;
            } else if (vm.montantVerses[index] > vm.listDetailFactureDto[index].resteApaye) {
                vm.montantVerses[index] = vm.listDetailFactureDto[index].resteApaye;
            }
        }


       function onSaveSuccess(result) {
            $scope.$emit('webstockerApp:bonDeSortieUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError() {
            vm.isSaving = false;
        }
        // à revoir
        vm.dateReglements = [];
        // vm.datePickerOpenStatus = {};


        vm.reglementDtos = [];


        vm.isSaving = false;
        vm.saveFactureReglement = function () {
            vm.isSaving = true;

            vm.listDetailFactureDto.forEach(function (val, ind) {

                var dateReglement = null;
                if(vm.dateReglements[ind]!==null){
                    dateReglement = $filter('date')(vm.dateReglements[ind], 'yyyy-MM-dd');
                }
                vm.reglementDtos[ind] = {
                    id: null,
                    dateReglement: dateReglement,
                    montantReglement: vm.montantVerses[ind],
                    idFacture: $stateParams.id,
                    idProduit: val.idProduit
                }

            });

            var data = {
                idFacture: $stateParams.id,
                reglementDtos: vm.reglementDtos,
                totalFacture: null
            }

            console.log("avant saveFactureReglement", data);

            ReglementFacture.reglerFactureCredit({}, data, onSaveSuccess, onSaveError);

            console.log("apres saveFactureReglement");
            vm.isSaving = false;
            $uibModalInstance.dismiss('cancel');
        };


        vm.options = {};
        vm.toggleMin = function() {
            vm.options.maxDate = vm.options.maxDate ? null : new Date();
        };

        vm.toggleMin();


        vm.toNumber = function (a) {
            return Number((a || 0));
        }

    }



    



})();
