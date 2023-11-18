(function () {
    'use strict';

    angular
            .module('app')
            .controller('PromotionClientController', PromotionClientController)
            .value('URL_USERS', 'api/users/aimas');

    PromotionClientController.$inject = ['$rootScope', '$scope', 'API_URL', '$state', '$window', '$stateParams', '$location', 'entity', 'lignecommandeEntity', 'CommandeFournisseur', 'venteClientEntity', 'PromotionClient', 'Lignecommande', 'User', 'Magasin', 'Produit', 'StockOperation', 'Client', 'URL_USERS', 'FetchData', 'DateUtils', 'LigneBonDeSortie','SweetAlert'];

    function PromotionClientController($rootScope, $scope, API_URL, $state, $window, $stateParams, $location, entity, lignecommandeEntity, CommandeFournisseur, venteClientEntity, PromotionClient, Lignecommande, User, Magasin, Produit, StockOperation, Client, URL_USERS, FetchData, DateUtils, LigneBonDeSortie, SweetAlert) {
        var vm = this;

        vm.venteClientEntity = venteClientEntity;
        vm.ligneCommandeIndex = 0;
        vm.bonDeSortie = entity;
        vm.demandeur = null;
        vm.lignecommande = lignecommandeEntity;
        // vm.livraisons = Livraison.query();
        vm.lignecommandes = [];
        vm.clients = Client.query();
        vm.magasins = Magasin.query();
        console.log(vm.magasins);
        vm.fabricants = null;
        vm.users = User.query();
        vm.produits = Produit.query();
        vm.produitCommande = null;
        vm.sortieWrappers = null;
        vm.userAimas = null;


        var onSaveSuccess = function (result) {
            $scope.$emit('app:commandeUpdate', result);
            // $uibModalInstance.close(result);
            console.log(result);
            vm.bonDeSortie = result;
            vm.isSaving = false;

            $rootScope.factureZeroUrl = API_URL + 'api/report/lignesfactures/facturezero/' + result.id;
            console.log("url du pdf ok");
            console.log($rootScope.factureZeroUrl);
            $state.go("rapport_facture_zero");
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
                    //remplir le smartTable lors de la modification
                    for (var i = 0; i < result.length; i++) {                        
                        result[i].prixVente = vm.lignecommande.prixVente;
                        result[i].prixDeVente = vm.lignecommande.prixDeVente; 
                        console.log("smartTable modification");
                    }
                    vm.montant = vm.montant + vm.lignecommande.prixDeVente;  

                    if (vm.sortieWrappers) {
                        console.log("Ajout dans le SmartTable");
                        console.log(result);
                        for (var i = 0; i < result.length; i++) {
                            var resultat = result[i];
                            var isIn = false;
                            for (var j = 0; j < vm.sortieWrappers.length; j++) {
                                var elt = vm.sortieWrappers[j];
                                if (elt.produit.id === resultat.produit.id) {
//                                alert("Le produit "+ resultat.produit.nomProduit +" existe déja sur bon");                           
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

                console.log("valeur quantité total en stock " + vm.quantiteStockProduit);

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
            console.log("La quantité max stock "+vm.qteCommande);
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

            vm.venteClientEntity.bonDeSortie = vm.bonDeSortie;
            vm.venteClientEntity.ligneBonDeSorties = vm.lignecommandes;

            var data = {
                numero: vm.bonDeSortie.numero,
                numeroFactureNormalise: vm.bonDeSortie.numeroFactureNormalise,
                daateCreation: vm.bonDeSortie.daateCreation,
                typeSortie: vm.bonDeSortie.typeSortie,
                typeVente: vm.bonDeSortie.typeVente,
                client: vm.bonDeSortie.client,
                demandeur: vm.bonDeSortie.demandeur,
                dateFacture: vm.bonDeSortie.dateFacture,
                magasin: vm.bonDeSortie.magasin,
                destination: vm.bonDeSortie.destination,
                id: vm.bonDeSortie.id,
//                id: null,
                ligneBonDeSorties: vm.sortieWrappers

            };


            vm.isSaving = true;

            console.log(data);
            if (vm.bonDeSortie.id !== null) {
                PromotionClient.update({}, data, onSaveSuccess, onSaveError);                
            } else {
                PromotionClient.savePromotionClient({}, data, onSaveSuccess, onSaveError);                
            }
            console.log("apres save");
            $scope.button_clicked = true;
            // }
        };

        FetchData.getData(API_URL + URL_USERS).then(function (response) {
            console.log(response);
            vm.userAimas = response.data;
        }, function (error) {
            console.log(error);
        });

        /**Initialise les valeurs à null**/
        vm.clear = function () {
            vm.lignecommande.prixDeVente = null;   
            vm.lignecommande.prixVente = null;
            vm.lignecommande.produit = null;
            vm.lignecommande.quantite = null;
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateFacture = false;
        vm.datePickerOpenStatus.dateCommande = false;
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

            FetchData.getData(API_URL + "api/ligne-bon-de-sorties/lignepromotion/" + idBonDeSortie).then(function (response) {
                console.log(response);
                vm.sortieWrappers = response.data;
                console.log(vm.sortieWrappers);            
                vm.ligneCommandeIndex = vm.sortieWrappers.length;
            }, function (error) {
                console.log(error);
            });

            $scope.btnModifierLigne = "modifier";
        };

        vm.confirmDeleteLigne = function (id, item) {
            LigneBonDeSortie.delete({id: id}, function () {
                console.log("Ligne supprimée " + id);
            });
            vm.removeLigneCommande(item);
        };
        
        vm.confirmDelete = function (id) {
            LigneBonDeSortie.delete({id: id}, function () {
//          $uibModalInstance.close(true);
            });
        };


        vm.recupererFacture = function (id) {
            FetchData.getData(API_URL + "api/facture-by-bon-de-sortie/" + id).then(function (response) {
                console.log(response);
                vm.factures = response.data;
                console.log(vm.factures);
                vm.bonDeSortie.dateFacture = DateUtils.convertLocalDateFromServer(vm.factures.dateFacture);
                console.log("LA FACTURE OK");
                console.log("LA DATE DE LA FACTURE OK " + vm.bonDeSortie.dateFacture);
            }, function (error) {
                console.log(error);
            });
        };

    }
})();
