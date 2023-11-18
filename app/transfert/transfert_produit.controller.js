(function () {
    'use strict';

    angular
            .module('app')
            .controller('TransfertClientController', TransfertClientController)
            .value('URL_USERS', 'api/users/aimas')
            .value('URL_LIGNETRANSFERT', 'api/ligne-bon-de-sorties/lignetransfert/')
            .value('URL_UPDATE_LIGNETRANSFERT','api/ligne-bon-de-sorties/');

    TransfertClientController.$inject = ['$rootScope', '$scope', '$state', '$window', 'API_URL', '$stateParams', '$location', 'entity', 'lignecommandeEntity', 'CommandeFournisseur', 'venteClientEntity', 'TransfertClient', 'Lignecommande', 'User', 'Magasin', 'Produit', 'StockOperation', 'URL_USERS', 'FetchData', 'URL_LIGNETRANSFERT','URL_UPDATE_LIGNETRANSFERT','LigneBonDeSortie','SweetAlert'];

    function TransfertClientController($rootScope, $scope, $state, $window, API_URL, $stateParams, $location, entity, lignecommandeEntity, CommandeFournisseur, venteClientEntity, TransfertClient, Lignecommande, User, Magasin, Produit, StockOperation, URL_USERS, FetchData, URL_LIGNETRANSFERT,URL_UPDATE_LIGNETRANSFERT,LigneBonDeSortie, SweetAlert) {
        var vm = this;

        vm.venteClientEntity = venteClientEntity;
        vm.ligneCommandeIndex = 0;
        vm.bonDeSortie = entity;
        vm.demandeur = null;
        vm.lignecommande = lignecommandeEntity;
        // vm.livraisons = Livraison.query();
        vm.lignecommandes = [];
        vm.magasins = Magasin.query();
        console.log(vm.magasins);
        vm.fabricants = null;
        vm.users = User.query();
        vm.produits = Produit.query();
        vm.produitCommande = null;
        vm.sortieWrappers = null;
        vm.userAimas = null;
        vm.ligne = null;


        var onSaveSuccess = function (result) {
            $scope.$emit('app:commandeUpdate', result);
            // $uibModalInstance.close(result);
            console.log(result);
            vm.bonDeSortie = result;
            vm.isSaving = false;

            $rootScope.transfertUrl = API_URL + 'api/report/lignebondesorties/bondesortietransfert/' + result.id;

            console.log("url du pdf ok");
            console.log($rootScope.transfertUrl);


            $state.go("transfert-produit-report");
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.addLigneCommande = function () {
            /** portion de code ajouter condition if debut */
            var idligne = vm.lignecommande.id;
            if(idligne!==null){
//                vm.confirmDeleteLigne(idligne,vm.lignecommande);
                console.log("Les ligne de bon de sortie ");
                console.log( vm.lignecommande);
            /***end condition debut***/   
            
                vm.lignecommande.produit = vm.produitCommande;

            StockOperation.getSortieWrapper({id: vm.lignecommande.produit.id, quantite: vm.lignecommande.quantite}, function (result) {

                for (var i = 0; i < result.length; i++) {
                    result[i].prixVente = vm.lignecommande.prixVente;
                    console.log("premier");
                }

                if (vm.sortieWrappers) {
                    console.log("deuxieme");
                    console.log(result);
                    for (var i = 0; i < result.length; i++) {
                        var resultat = result[i];
                        var isIn = false;
                        for (var j = 0; j < vm.sortieWrappers.length; j++) {
                            var elt = vm.sortieWrappers[j];
                            if (elt.produit.id === resultat.produit.id) {                              
//                              alert("Le produit "+ resultat.produit.nomProduit +" existe déja sur bon");                           
                                SweetAlert.alert(" Le produit "+ resultat.produit.nomProduit +" existe déja sur ce bon de sortie ", {title: "Websocker"});
                                    isIn = true;                                   
                                    break;
                            }
                        }
                        console.log("isin " + isIn);
                        if (!isIn) {
                            vm.sortieWrappers.push(resultat);
                        }
                    }
                    console.log(vm.sortieWrappers);
                } else {
                    console.log("result");
                    vm.sortieWrappers = result;

                    console.log(vm.sortieWrappers);
                }

                // vm.sortieWrappers=result;

                // for (var i=0;i<vm.sortieWrappers.length;i++){
                //     vm.sortieWrappers[i].prixVente=vm.lignecommande.prixVente;
                // }

                vm.ligneCommandeIndex = vm.sortieWrappers.length;
                vm.clear();

            });
            
            /**Else de la condition ajouter***/
            }else{
            vm.lignecommande.produit = vm.produitCommande;

            StockOperation.getSortieWrapper({id: vm.lignecommande.produit.id, quantite: vm.lignecommande.quantite}, function (result) {

                for (var i = 0; i < result.length; i++) {
                    result[i].prixVente = vm.lignecommande.prixVente;
                    console.log("premier");
                }

                if (vm.sortieWrappers) {
                    console.log("deuxieme");
                    console.log(result);
                    for (var i = 0; i < result.length; i++) {
                        var resultat = result[i];
                        var isIn = false;
                        for (var j = 0; j < vm.sortieWrappers.length; j++) {
                            var elt = vm.sortieWrappers[j];
                            if (elt.produit.id === resultat.produit.id) {
//                              alert("Le produit "+ resultat.produit.nomProduit +" existe déja sur bon");                           
                                SweetAlert.alert(" Le produit "+ resultat.produit.nomProduit +" existe déja sur ce bon de sortie ", {title: "Websocker"});
                                isIn = true;                                   
                                break;
                            }
                        }
                        console.log("isin " + isIn);
                        if (!isIn) {
                            vm.sortieWrappers.push(resultat);
                        }
                    }
                    console.log(vm.sortieWrappers);

                } else {
                    console.log("result");
                    vm.sortieWrappers = result;

                    console.log(vm.sortieWrappers);
                }

                // vm.sortieWrappers=result;

                // for (var i=0;i<vm.sortieWrappers.length;i++){
                //     vm.sortieWrappers[i].prixVente=vm.lignecommande.prixVente;
                // }

                vm.ligneCommandeIndex = vm.sortieWrappers.length;
                vm.clear();

            });
            }
        };


        $scope.maxStockProduit = 0;

        vm.qteStockProduitDisponibleText = "quantite produit disponible ";
        $scope.qteStockProduitDisponiblePlaceholder = "";

        $scope.$watch('vm.produitCommande', function (newValue) {
            console.log("nouveau produit commande");
            console.log(newValue);
            if (newValue !== null) {
                StockOperation.getQuantiteDispoParMagasin({id: vm.produitCommande.id, magasinID: vm.bonDeSortie.magasin.id}, function (result) {
                    vm.quantiteStockProduit = result.quantiteStockProduit;
                    console.log(vm.quantiteStockProduit);
                    $scope.maxStockProduit = vm.quantiteStockProduit;
                    $scope.qteStockProduitDisponiblePlaceholder = vm.qteStockProduitDisponibleText + " " + $scope.maxStockProduit;
                });
                console.log("valeur qte " + vm.quantiteStockProduit);
            }
        }, true);


        vm.removeLigneCommande = function (item) {
            console.log(item);
            vm.sortieWrappers.splice(vm.sortieWrappers.indexOf(item), 1)
            // vm.sortieWrappers=[];
            vm.ligneCommandeIndex = vm.sortieWrappers.length;
            
             if (vm.appuiBoutonOK ==="VRAI"){
                console.log("TU A CLIQUER SUR -- VRAI --");
                console.log("TU AS APPUYER SUR MODIFIER");
                vm.confirmDelete(item.id);
             }
        };


        $scope.button_clicked = false;
        vm.saveCommandeFournisseur = function () {

            vm.venteClientEntity.bonDeSortie = vm.bonDeSortie;
            vm.venteClientEntity.ligneBonDeSorties = vm.lignecommandes;

            var data = {
                numero: vm.bonDeSortie.numero,
                daateCreation: vm.bonDeSortie.daateCreation,
                typeSortie: vm.bonDeSortie.typeSortie,
                typeVente: vm.bonDeSortie.typeVente,
                client: vm.bonDeSortie.client,
                demandeur: vm.bonDeSortie.demandeur,
                magasin: vm.bonDeSortie.magasin,
                destination: vm.bonDeSortie.destination,
                dateReceptionTransfert:vm.bonDeSortie.dateReceptionTransfert,
                emetteur:vm.bonDeSortie.emetteur,
                statusTranfert:vm.bonDeSortie.statusTranfert,
                id: vm.bonDeSortie.id,
//                id: null,
                ligneBonDeSorties: vm.sortieWrappers

            };

            vm.isSaving = true;
            console.log(data);
            if (vm.bonDeSortie.id !== null) {
                TransfertClient.update({}, data, onSaveSuccess, onSaveError());
            } else {
                TransfertClient.saveTransfertClient({}, data, onSaveSuccess, onSaveError);
            }
            console.log("apres save");
            $scope.button_clicked = true;

        };

        FetchData.getData(API_URL + URL_USERS).then(function (response) {
            console.log(response);
            vm.userAimas = response.data;
        }, function (error) {
            console.log(error);
        });
        vm.clear = function () {

            vm.lignecommande.prixVente = null;
            vm.lignecommande.produit = null;
            vm.lignecommande.quantite = null;
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateCommande = false;
        vm.datePickerOpenStatus.dateFabrication = false;
        vm.datePickerOpenStatus.datePeremption = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };
        
       /**************** Methodes pour la modification*****/      
        
        vm.modifierLigneTransfert = function(idLigne){
            console.log("Affecter les données à modifier");
            console.log("le ID LIGNE BON DE SORTIE "+ idLigne);
            FetchData.getData(API_URL + URL_UPDATE_LIGNETRANSFERT + idLigne).then(function (response) {
                console.log(response);
                vm.nouveautableau = response.data;
                console.log(vm.nouveautableau);
                vm.lignecommande= vm.nouveautableau;
                vm.produitCommande = vm.nouveautableau.produit;     
//                vm.ligneCommandeIndex = vm.sortieWrappers.length;
            }, function (error) {
                console.log(error);
            });
        };

        var idBonDeSortie = '';
        $scope.btnModifierLigne = '';
        vm.appuiBoutonOK ="";
        
        vm.rechargermentDataBonDesortie = function () {
            vm.lignecommande.produit = null;
            vm.lignecommande.quantite = null;
            vm.appuiBoutonOK ="VRAI";
            console.log("TU AS APPUYER SUR MODIFIER "+vm.appuiBoutonOK);
            console.log("le resultat de la date " + vm.bonDeSortie.numero);
            console.log("LE ID okk " + vm.bonDeSortie.id);
            idBonDeSortie = vm.bonDeSortie.id;

            FetchData.getData(API_URL + URL_LIGNETRANSFERT + idBonDeSortie).then(function (response) {
                console.log(response);
                vm.sortieWrappers = response.data;
                console.log(vm.sortieWrappers);
                vm.ligneCommandeIndex = vm.sortieWrappers.length;
            }, function (error) {
                console.log(error);
            });
            
             $scope.btnModifierLigne = "modifier";

        };

        vm.confirmDeleteLigne = function (id,item) {           
            LigneBonDeSortie.delete({id:id},function(){
                console.log("Ligne supprimée "+id);
            }); 
             vm.removeLigneCommande(item);
        };
        vm.confirmDelete = function (id) {
            LigneBonDeSortie.delete({id: id}, function () {
//                    $uibModalInstance.close(true);
                });
        };
        
         vm.confirmDeleteM = function (id) {
            Magasin.delete({id: id},  function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
