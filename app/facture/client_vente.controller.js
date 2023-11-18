(function () {
    'use strict';

    angular
            .module('app')
            .controller('VenteClientController', VenteClientController)
            .value('URL_USERS', 'api/users/aimas');

    VenteClientController.$inject = ['$rootScope', '$scope', '$state', 'entity', '$window', '$stateParams', '$location', 'lignecommandeEntity', 'CommandeFournisseur', 'venteClientEntity', 'VenteClient', 'Lignecommande', 'User', 'Client', 'Produit', 'StockOperation', 'Magasin', 'API_URL', 'FetchData', 'URL_USERS', 'DateUtils', 'LigneBonDeSortie','SweetAlert'];

    function VenteClientController($rootScope, $scope, $state, entity, $window, $stateParams, $location, lignecommandeEntity, CommandeFournisseur, venteClientEntity, VenteClient, Lignecommande, User, Client, Produit, StockOperation, Magasin, API_URL, FetchData, URL_USERS, DateUtils, LigneBonDeSortie, SweetAlert) {

        var vm = this;

        vm.magasins = Magasin.query();
        vm.venteClientData = venteClientEntity;
        vm.ligneCommandeIndex = 0;
        vm.bonDeSortie = entity;
        vm.demandeur = null;
        vm.lignecommande = lignecommandeEntity;
        vm.lignecommandes = [];
        vm.clients = Client.query();
        vm.fabricants = null;
        vm.users = User.query();
        vm.produits = Produit.query();
        vm.produitCommande = null;
        vm.quantiteStockProduit = null;
        vm.sortieWrappers = null;
        vm.delaiPaiement = null;
        vm.userAimas = null;


        var onSaveSuccess = function (result) {
            $scope.$emit('app:commandeUpdate', result);
            // $uibModalInstance.close(result);
            console.log(result);
            vm.bonDeSortie = result;
            vm.isSaving = false;
            $rootScope.factureUrl = API_URL + 'api/report/lignesfactures/facture/' + result.id;
            console.log("url pdf oh");
            console.log($rootScope.factureUrl);
            $state.go("facture-vente");
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        var montant = 0;
        vm.montant = 0;
        vm.addLigneCommande = function () {
            
             /** portion de code ajouter condition if debut */
            var idligne = vm.lignecommande.id;
            if (idligne !== null) {
//                vm.confirmDeleteLigne(idligne, vm.lignecommande);
                console.log("Les ligne de bon de sortie ");
                console.log(vm.lignecommande);
                /***end condition debut***/

            vm.lignecommande.produit = vm.produitCommande;
            StockOperation.getSortieWrapper({id: vm.lignecommande.produit.id, quantite: vm.lignecommande.quantite}, function (result) {
                for (var i = 0; i < result.length; i++) {
                    result[i].prixVente = vm.lignecommande.prixVente ;
                    result[i].prixDeVente = vm.lignecommande.prixDeVente;
                    console.log("smartTable modification");
                }
                   vm.montant = vm.montant + vm.lignecommande.prixDeVente;                    

                if (vm.sortieWrappers) {
                    console.log("deuxieme");
                    console.log(result);
                    for (var i = 0; i < result.length; i++) {
                        var resultat = result[i];
                        var isIn = false;
                        for (var j = 0; j < vm.sortieWrappers.length; j++) {
                            var elt = vm.sortieWrappers[j];
                            if (elt.produit.id === resultat.produit.id) {
//                                alert("Le produit "+ resultat.produit.nomProduit +" existe déja sur bon");                           
                                SweetAlert.alert(" Le produit "+ resultat.produit.nomProduit +" existe déja sur ce bon de sortie ", {title: "Websocker"});
                                vm.montant = vm.montant - vm.lignecommande.prixDeVente;
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
            } else {
                                
            vm.lignecommande.produit = vm.produitCommande;

            StockOperation.getSortieWrapper({id: vm.lignecommande.produit.id, quantite: vm.lignecommande.quantite}, function (result) {
                for (var i = 0; i < result.length; i++) {
                    result[i].prixVente = vm.lignecommande.prixVente;
                    result[i].prixDeVente = Math.round((vm.lignecommande.prixDeVente * result[i].quantite)/vm.lignecommande.quantite);
                    console.log("premier");
                }
                    vm.montant = vm.montant + vm.lignecommande.prixDeVente;
                    console.log("OUH AHHAAA UURGGGG " + vm.montant);
                    console.log("LE PRODUIT ..." + vm.lignecommande.produit.nomProduit);
                    console.log("le tableau d'élément ", result);

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
                                vm.montant = vm.montant - vm.lignecommande.prixDeVente;
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
                StockOperation.getPrixUnitaire({idClient: vm.bonDeSortie.client.id, idProduit: vm.produitCommande.id}, function (result) {
                    vm.lignecommande.prixVente = result.prixUnitaire;
                });
            }
        }, true);
        
        
        vm.calculMaxQuantite = function () {

            if (!vm.sortieWrappers) {
                return;
            }

            vm.qteLignesCommande = 0;
            vm.qteCommande = $scope.maxStockProduit;
            for (var i = 0; i < vm.sortieWrappers.length; i++) {
                vm.ligneCommandeTmp = vm.sortieWrappers[i];
                if (vm.produitCommande.id === vm.ligneCommandeTmp.produit.id) {
                    vm.qteLignesCommande = vm.qteLignesCommande + vm.ligneCommandeTmp.quantite;
                }
            }
            return (vm.qteCommande - vm.qteLignesCommande);
        };
        
         $scope.maxqte = vm.calculMaxQuantite();
         
         $scope.$watch('vm.sortieWrappers', function (newValue) {
            console.log("nouveau lignes commandes");
            console.log(newValue);
            if (newValue !== null) {
                $scope.maxqte = vm.calculMaxQuantite();
                $scope.qteStockProduitDisponiblePlaceholder = vm.qteStockProduitDisponibleText + " " + $scope.maxqte;
            }
        }, true);
        
        vm.removeLigneCommande = function (item) {
            console.log(item);
            vm.sortieWrappers.splice(vm.sortieWrappers.indexOf(item), 1);
            // vm.sortieWrappers=[];
            vm.ligneCommandeIndex = vm.sortieWrappers.length;
            vm.montant = vm.montant - item.prixDeVente;
            if(vm.montant < 0){
                vm.montant = 0;
                console.log("LE MONTANT EST CERTAINEMENT INFERIEUR A ZERO "+ vm.montant);
            }
            console.log("Reduit le montant "+ vm.montant);
           if (vm.appuiBoutonOK ==="VRAI"){
               console.log("TU A CLIQUER SUR -- VRAI --");
               console.log("TU AS APPUYER SUR MODIFIER");
            vm.confirmDelete(item.id);
            }
            
        };
        
        
        $scope.button_clicked = false;
        vm.saveCommandeFournisseur = function () {

            vm.venteClientData.bonDeSortie = vm.bonDeSortie;
            vm.venteClientData.ligneBonDeSorties = vm.sortieWrappers;

            var data = {
                numero: vm.bonDeSortie.numero,
                numeroFactureNormalise: vm.bonDeSortie.numeroFactureNormalise,
                daateCreation: vm.bonDeSortie.daateCreation,
                typeSortie: vm.bonDeSortie.typeSortie,
                typeVente: vm.bonDeSortie.typeVente,
                client: vm.bonDeSortie.client,
                delaiPaiement: vm.delaiPaiement,
                demandeur: vm.bonDeSortie.demandeur,
                magasin: vm.bonDeSortie.magasin,
                dateFacture: vm.bonDeSortie.dateFacture,
                id: vm.bonDeSortie.id,
//                id: null,
                remise: vm.bonDeSortie.remise,
                ligneBonDeSorties: vm.sortieWrappers

            };

            vm.isSaving = true;

            console.log(data);
            if (vm.bonDeSortie.id !== null) {
                VenteClient.update({}, data, onSaveSuccess, onSaveError);
            } else {
                VenteClient.saveVenteClient({}, data, onSaveSuccess, onSaveError);
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
//            vm.lignecommande.prixVente = null;
            vm.lignecommande.prixDeVente = null;
            vm.lignecommande.produit = null;
            vm.lignecommande.quantite = null;
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateFacture = false;
        vm.datePickerOpenStatus.daateCreation = false;
        vm.datePickerOpenStatus.dateFabrication = false;
        vm.datePickerOpenStatus.datePeremption = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };


        /*****************Methode pour la modification*************************************/
        vm.factures = null;
        vm.appuiBoutonOK ="";
        vm.modifierLigneTransfert = function (idLigne) {           
            console.log("Affecter les données à modifier");
            console.log("le ID LIGNE BON DE SORTIE " + idLigne);
            FetchData.getData(API_URL + 'api/ligne-bon-de-sorties/' + idLigne).then(function (response) {
                console.log(response);
                console.log("La validation de la modification");
                vm.nouveautableau = response.data;
                console.log(vm.nouveautableau);
                vm.lignecommande = vm.nouveautableau;
                vm.produitCommande = vm.nouveautableau.produit;
//                vm.ligneCommandeIndex = vm.sortieWrappers.length;
            }, function (error) {
                console.log(error);
            });
        };

        var idBonDeSortie = '';
        $scope.btnModifierLigne = '';
        
        vm.rechargermentDataBonDesortie = function () {
            vm.lignecommande.produit = null;
            vm.lignecommande.quantite = null;
            vm.appuiBoutonOK ="VRAI";
            console.log("TU AS APPUYER SUR MODIFIER "+vm.appuiBoutonOK);
            
            console.log("le resultat de la date " + vm.bonDeSortie.numero);
            console.log("LE ID okk " + vm.bonDeSortie.id);
            idBonDeSortie = vm.bonDeSortie.id;
            vm.recupererFacture(idBonDeSortie);

            FetchData.getData(API_URL + "api/ligne-bon-de-sorties/lignevente/" + idBonDeSortie).then(function (response) {
                console.log(response);
                vm.sortieWrappers = response.data;
                console.log(vm.sortieWrappers);
                vm.ligneCommandeIndex = vm.sortieWrappers.length;
            }, function (error) {
                console.log(error);
            });

            $scope.btnModifierLigne = "modifier";
            $scope.btnModif ='y';
        };

        vm.confirmDeleteLigne = function (id, item) {
            LigneBonDeSortie.delete({id: id}, function () {
                console.log("Ligne supprimée " + id);
            });
            vm.removeLigneCommande(item);
        };

        vm.confirmDelete = function (id) {
            LigneBonDeSortie.delete({id: id}, function () {
//                    $uibModalInstance.close(true);
            });
        };

        $scope.diffdate = function (d1, d2) {
            var WNbJours = (new Date(d2)) - (new Date(d1));
            if (WNbJours < 0) {
                WNbJours = -WNbJours;
            }
            return Math.ceil(WNbJours / (1000 * 60 * 60 * 24));
        };

        vm.recupererFacture = function (id) {
            FetchData.getData(API_URL + "api/facture-by-bon-de-sortie/" + id).then(function (response) {
                console.log(response);
                vm.factures = response.data;
                console.log(vm.factures);
                vm.bonDeSortie.dateFacture = DateUtils.convertLocalDateFromServer(vm.factures.dateFacture);
//                $scope.datepaiement = DateUtils.convertLocalDateFromServer(vm.factures.dateLimitePaiement);
                console.log("LA DATE DE LA FACTURE OK " + vm.bonDeSortie.dateFacture);

                if (vm.bonDeSortie.typeVente === 'CREDIT') {
                    vm.delaiPaiement = $scope.diffdate(vm.factures.dateLimitePaiement, vm.factures.dateFacture);
                    console.log("Delais de paiement " + vm.delaiPaiement);
                }

                if (vm.factures.valeurRemise !== null) {
                    vm.bonDeSortie.remise = vm.factures.valeurRemise;
                    console.log("la remise est " + vm.bonDeSortie.remise);
                }

            }, function (error) {
                console.log(error);
            });
        };

    }
})();
