(function () {
    'use strict';

    angular
            .module('app')
            .controller('RapportDeVenteController', RapportDeVenteController)
            .value('URL_SEARCH_FACTURE', 'api/ligne-bon-de-sorties/facturesparperiode')
            .value('URL_LIST_BONS', 'api/bondesortieparmagasin')
            .value('URL_LISTE_BONS_TRANSFERT', 'api/transfert-par-magasin/')
            .value('URL_FACTURE_TROUVER', 'api/liste-facture-par-periode')
            .value('URL_FIND_ALL_FACTURE', 'api/liste-facture-par-periode?dateDebut=')
            .value('URL_FIND_ONE_FACTURE', 'api/facture-par-numeroFacture?numeroFacture=')
            .value('URL_VENTE_PAR_PRODUIT', 'api/vente-par-produit-par-magasin?nomProduit=')
            .value('URL_PROMOTION_PAR_PRODUIT', 'api/promotion-par-produit-par-magasin?nomProduit=')
            .value('URL_TRANSFERT_PAR_PRODUIT', 'api/transfert-par-produit-par-magasin?nomProduit=')
            .value('URL_PERTE_PAR_PRODUIT', 'api/perte-par-produit-par-magasin?nomProduit=');


//            .value('URL_SEARCH_FACTURE','http://localhost:8080/api/facture-by-date');

    RapportDeVenteController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'entity', 'Ville', 'Objectifs', 'DateUtils', 'RapportQuantiteVendueParDistrict', 'RapportChiffreAffaireProduit', 'RapportChiffreAffaireClient', 'ChiffreAffaireMagasin', 'ListeFactureService', 'Facture', 'ListeFacturesSearch', 'URL_SEARCH_FACTURE', 'FetchData', '$filter', 'API_URL', 'Produit', 'Magasin', 'URL_LIST_BONS', 'URL_LISTE_BONS_TRANSFERT', 'URL_FACTURE_TROUVER', 'URL_FIND_ALL_FACTURE', 'URL_FIND_ONE_FACTURE', 'URL_VENTE_PAR_PRODUIT', 'URL_PROMOTION_PAR_PRODUIT', 'URL_TRANSFERT_PAR_PRODUIT', 'URL_PERTE_PAR_PRODUIT', 'Client', 'Categorieclient'];

    function RapportDeVenteController($rootScope, $scope, $state, $stateParams, entity, Ville, Objectifs, DateUtils, RapportQuantiteVendueParDistrict, RapportChiffreAffaireProduit, RapportChiffreAffaireClient, ChiffreAffaireMagasin, ListeFactureService, Facture, ListeFacturesSearch, URL_SEARCH_FACTURE, FetchData, $filter, API_URL, Produit, Magasin, URL_LIST_BONS, URL_LISTE_BONS_TRANSFERT, URL_FACTURE_TROUVER, URL_FIND_ALL_FACTURE, URL_FIND_ONE_FACTURE, URL_VENTE_PAR_PRODUIT, URL_PROMOTION_PAR_PRODUIT, URL_TRANSFERT_PAR_PRODUIT, URL_PERTE_PAR_PRODUIT, Client, Categorieclient) {
        var vm = this;
        vm.rapportData = entity;
        vm.clients = Client.query();     
        vm.categorieClients = Categorieclient.query();
        vm.villes = Ville.query();
        vm.ville = null;
        vm.produits = Produit.query();
        vm.magasins = Magasin.query();
        vm.listeFacture = [];
        vm.factures = [];
        vm.lignebons = [];
        vm.criteria = {};
        vm.pdfContent = null;

        vm.modePaiement = '';

        vm.currentPage = 0;
        vm.pageSize = 10;
        
        // Charger tous les users par ordre 
        FetchData.getData(API_URL+'api/users/aimas') .then(function (response) {
                            console.log(response);
                            vm.users = response.data;
                        }, function (error) {
                            console.log(error);
                        });

        $scope.rapportVenteParDistrictUrl = 'rapports/rapport-quantite-vendu-produit-district.html';
        $scope.rapportChiffredAffaireProduitUrl = 'rapports/rapport-chiffre-affaire-produit.html';
        $scope.listeDesFacturesUrl = 'rapports/liste-des-factures.html';
        $scope.rapportChiffreAffaireClientUrl = 'rapports/rapport-chiffre-affaire-client.html';
        $scope.etatdereconciliationControllerUrl = 'rapports/etat-de-reconciliation.html';
        $scope.rapportChiffreAffaireMagasinUrl = 'rapports/rapport-chiffre-affaire-magasin.html';
        $scope.tauxAtteinteResultatsUrl = 'rapports/taux-atteinte-des-resultats.html';
        $scope.etatProduitsParMagasinUrl = 'rapports/etat-produits-par-magasin.html';
        $scope.bondesortieParMagasinUrl = 'rapports/bondesortie-par-magasin.html';
        $scope.bordereauLivraisonParMagasinUrl = 'rapports/bordereau-livraison-par-magasin.html';
        $scope.etatStockparMagasindeProduitUrl = 'rapports/etat-stock-par-magasin-de-produit.html';
        $scope.listeDesTranfertParMagasinUrl = 'rapports/liste-transfert-par-magasin.html';
        $scope.venteParProduitMagasinUrl = 'rapports/vente-par-produit-magasin.html';
        $scope.promotionParProduitMagasinUrl = 'rapports/promotion-par-produit-magasin.html';
        $scope.transfertParProduitMagasinUrl = 'rapports/transfert-par-produit-magasin.html';
        $scope.perteParProduitMagasinUrl = 'rapports/perte-par-produit-magasin.html';
        $scope.chriffreAffaireParClientNouveauUrl = 'rapports/chiffre-affaire-par-client-nouveau.html';
        $scope.quantiteVendueParAgentUrl = 'rapports/quantite-vendue-par-agent.html';
        $scope.chiffreAffaireParModePaiement = 'rapports/chiffre-affaire-par-mode-paiement.html';
        $scope.detailPaiementParFacture = 'rapports/detail-paiement-par-facture.html';
        $scope.etatCreanceParCommercial = 'rapports/etat-creance-par-commercial.html';
        $scope.listeClientsCommercial = 'rapports/liste-clients-commercial.html';
        $scope.etatFacturesSoldesNonSoldes = 'rapports/etat-factures-soldes-non-soldes.html';
        $scope.creanceClientParPeriode = 'rapports/creance-client-par-periode.html';

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
        };

        $scope.visibleSelcetClient = false;
        var nomCategorie = '';

        $scope.$watch('vm.rapportData.categorieClient', function (newValue) {
            // console.log("Categorie du client : " + newValue.libelleCategorieclient);
            if (newValue !== null) {
                $scope.visibleSelcetClient = true;
                nomCategorie = newValue.libelleCategorieclient;
                FetchData.getData(API_URL + 'api/client-d-une-categorieclient?libelleCategorieclient=' + newValue.libelleCategorieclient)
                        .then(function (response) {
                            console.log(response);
                            vm.clientParCategories = response.data;
                        }, function (error) {
                            console.log(error);
                        });

            } else {
                $scope.visibleSelcetClient = false;
            }

        }, true);

        var nomDuClient = null;
        $scope.$watch('vm.rapportData.clientParCategorie', function (newValue) {
            // console.log("client : " + newValue.nomClient);
            if (newValue !== null) {
                if (newValue.nomClient !== undefined) {
                    nomDuClient = newValue.nomClient;
                }else {
                    alert("Vous n'avez pas definir de client");
                }
            }
        }, true);
        
        //Rapport de chaque commercial
        $scope.produitVisible = false;
        var IdCommercial ='';
        $scope.$watch('vm.bonDeSortie.demandeur', function (newValue) {
            
            if (newValue !== null) {
                $scope.produitVisible = true;
                 IdCommercial = newValue.id;

                // console.log("Le USER : " + newValue.lastName+' '+ newValue.firstName);
                // console.log("Le ID USER : " + newValue.id);
            }
        }, true);
        
        vm.imprimerRapportVenteParCommercial = function(){
             var dateDebut = '', datefin = '';
            dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            datefin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            $rootScope.quantiteVenduCommercialUrl = API_URL + 'api/report/quantite/quantite-vendue-par-commercial/' + IdCommercial + '/' + dateDebut + '/' + datefin;
            console.log('url finale ' + $rootScope.quantiteVenduCommercialUrl);
            $state.go('quantite-vendue-par-agent-pdf');
        };


        vm.imprimerRapportChiffreAffaireParModePaiement = function() {
            var dateDebut = '', datefin = '';
           dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
           datefin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
           $rootScope.chiffreAffaireParModePaiementUrl = API_URL + 'api/report/chiffre-affaire/chiffre-affaire-par-mode-paiement/' + vm.modePaiement + '/' + dateDebut + '/' + datefin;
           console.log('url finale ' + $rootScope.chiffreAffaireParModePaiementUrl);
           $state.go('chiffre-affaire-par-mode-paiement-pdf');
       };


    
       vm.imprimerDetailPaiementParFacture= function() {
            // var dateDebut = '', datefin = '';
            // dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            // datefin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            $rootScope.detailPaiementParFactureUrl = API_URL + 'api/report/facture/paiement/numero/' + vm.numeroFacture;
            console.log('url finale ' + $rootScope.detailPaiementParFactureUrl);
            $state.go('detail-paiement-par-facture-pdf');
        };

        vm.imprimerDetailPaiementParFactureId= function(factureId) {
            // var dateDebut = '', datefin = '';
            // dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            // datefin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            $rootScope.detailPaiementParFactureUrl = API_URL + 'api/report/facture/paiement/' + factureId;
            console.log('url finale ' + $rootScope.detailPaiementParFactureUrl);
            $state.go('detail-paiement-par-facture-pdf');
        };

        vm.commercial = {};
        vm.imprimerRapportEtatCreanceParCommercial = function() {
            var dateDebut = '', datefin = '';
           dateDebut = DateUtils.convertLocalDateToServer(vm.dateDebut);
           datefin = DateUtils.convertLocalDateToServer(vm.dateFin);
           $rootScope.etatCreanceParCommercialUrl = API_URL + 'api/report/creance/commercial/' + vm.commercial.id + '/' + dateDebut + '/' + datefin;
           console.log('url finale ' + $rootScope.etatCreanceParCommercialUrl);
           $state.go('etat-creance-par-commercial-pdf');
       };



       vm.imprimerListeClientCommercial = function() {
            var dateDebut = '', datefin = '';
            dateDebut = DateUtils.convertLocalDateToServer(vm.dateDebut);
            datefin = DateUtils.convertLocalDateToServer(vm.dateFin);
            $rootScope.etatCreanceParCommercialUrl = API_URL + 'api/report/client/commercial/' + vm.commercial.id + '/' + dateDebut + '/' + datefin;
            console.log('url finale ' + $rootScope.etatCreanceParCommercialUrl);
            $state.go('liste-clients-commercial-pdf');
        };


        vm.client = {};
        vm.imprimerCreanceClientParPEriode = function() {
            var dateDebut = '', datefin = '';
            dateDebut = DateUtils.convertLocalDateToServer(vm.dateDebut);
            datefin = DateUtils.convertLocalDateToServer(vm.dateFin);
            $rootScope.creanceClientParPeriodeUrl = API_URL + 'api/report/facture/creance-client-period?idClient=' + vm.client.id + '&dateDebut=' + dateDebut + '&dateFin=' + datefin;
            console.log('url finale ' + $rootScope.creanceClientParPeriodeUrl);
            $state.go('creance-client-par-periode-pdf');
        };

        vm.typeFacture = '';
        vm.imprimerEtatFacturesSoldesNonSoldes = function() {
            var dateDebut = '', datefin = '';
            dateDebut = DateUtils.convertLocalDateToServer(vm.dateDebut);
            datefin = DateUtils.convertLocalDateToServer(vm.dateFin);
            $rootScope.etatFacturesSoldesNonSoldesUrl = API_URL + 'api/report/facture/liste-factures-soldees-non-soldees/'+ vm.typeFacture + '/' + dateDebut + '/' + datefin;
            console.log('url finale ' + $rootScope.etatFacturesSoldesNonSoldesUrl);
            $state.go('etat-factures-soldes-non-soldes-pdf');
        };
                
        


        vm.imprimerRapportChiffreAffaireClient = function () {
            if (nomDuClient !== null) {
                if (nomDuClient !== undefined) {
                    vm.imprimerChiffreAffaireDunClient();
                }
            } else {
                vm.imprimerEtatChiffreAffaireUneCategorieClient();
            }
        };


        vm.imprimerChiffreAffaireDunClient = function () {
            var dateDebut = '', datefin = '';
            dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            datefin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            $rootScope.chiffreAffaireDunClient2Url = API_URL + 'api/report/client/chiffreaffaireunclient/' + nomDuClient + '/' + dateDebut + '/' + datefin;
            console.log('url finale ' + $rootScope.chiffreAffaireDunClient2Url);
            $state.go('chiffre-affaire-par-client-nouveau2-pdf');
        };


        // rapport du chiffre d'affaire par client
        vm.imprimerEtatChiffreAffaireUneCategorieClient = function () {
            var dateDebut = '', datefin = '';
            dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            datefin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            $rootScope.rapportChiffreAffaireParCategorieClientUrl = API_URL + 'api/report/clients/chiffreaffairetypeclient/' + nomCategorie + '/' + dateDebut + '/' + datefin;

            console.log('url finale ' + $rootScope.rapportChiffreAffaireParCategorieClientUrl);
            $state.go('chiffre-affaire-par-client-nouveau-pdf');
        };

        vm.afficherEtat = function () {
            console.log("************************************************************");
            console.log("cherchons ensemble");
            console.log(vm.rapportData);
            console.log("************************************************************");
            var d = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            console.log('Convertissons la date' + d);
            vm.pdfContent = API_URL + 'api/report/bondesortie/quantiteproduitvenduedansuneville/vm.rapportData.libelle/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
            $rootScope.rapportQauntiteVenduDistrictURL = API_URL + 'api/report/bondesortie/quantiteproduitvenduedansuneville/' + vm.rapportData.ville.libelle + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);

            console.log('url finale ' + $rootScope.rapportQauntiteVenduDistrictURL);
            $state.go('rapport-quantite-vendu-district');
        };


        vm.afficherChiffreAffaireParProduit = function () {
            console.log("************************************************************");
            console.log("cherchons ensemble");
            console.log(vm.rapportData);
            console.log("************************************************************");
            vm.pdfContent = API_URL + 'api/report/lignebondesorties/chiffreaffaireparproduit/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
            $rootScope.rapportChiffreAffaireProduitURL = API_URL + 'api/report/lignebondesorties/chiffreaffaireparproduit/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);

            console.log('url finale ' + $rootScope.rapportChiffreAffaireProduitURL);
            $state.go('rapport-chiffre-affaire-produit');
        };


        vm.afficherChiffreAffaireParClient = function () {
            console.log(vm.rapportData);
            console.log("************************************************************");
            vm.pdfContent = API_URL + 'api/report/lignebondesorties/chiffreaffaireparclient/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
            $rootScope.rapportChiffreAffaireClientUrl = API_URL + 'api/report/lignebondesorties/chiffreaffaireparclient/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);

            console.log('url finale ' + $rootScope.rapportChiffreAffaireClientUrl);
            $state.go('chiffre-affaire-client');
        };

        vm.afficherChiffreAffaireParMagasin = function () {
            console.log("************************************************************");
            console.log("cherchons ensemble");
            console.log(vm.rapportData);
            console.log("************************************************************");
            vm.pdfContent = API_URL + 'api/report/lignebondesorties/chiffreaffaireparmagasin/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
            $rootScope.rapportChiffreAffaireMagasinUrl = API_URL + 'api/report/lignebondesorties/chiffreaffaireparmagasin/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);

            console.log('url finale ' + $rootScope.rapportChiffreAffaireMagasinUrl);
            $state.go('chiffre-affaire-magasin');
        };


        vm.afficherTauxAtteinteObjectif = function () {
            console.log("************************************************************");
            console.log("cherchons ensemble le taux d'atteinte par mois ");
            console.log(vm.rapportData);
            console.log("************************************************************");
            vm.pdfContent = API_URL + 'api/report/objectifs/tauxatteinteobjectifsparmois/vm.rapportData.dateDebutPeriode';
            $rootScope.tauxAtteinteObjectifMoisUrl = API_URL + 'api/report/objectifs/tauxatteinteobjectifsparmois/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            console.log('url finale ' + $rootScope.tauxAtteinteObjectifMoisUrl);
            $state.go('taux-atteinte-objectif');
        };

        vm.afficherListeDesFacturePeriode = function () {

            if (vm.rapportData.dateDebutPeriode === null || vm.rapportData.dateFinPeriode === null) {
                alert("Il faut renseigner les champs date début et date fin");
            } else {
                vm.pdfContent = API_URL + 'api/report/rapportdesventes/listedesfacturesparperiode/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
                $rootScope.listeDesFacturesUrl = API_URL + 'api/report/rapportdesventes/listedesfacturesparperiode/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
                console.log('url finale ' + $rootScope.listeDesFacturesUrl);
                $state.go('liste-facture');
            }
            ;
        };

        vm.afficherEtatDeReconciliation = function () {
            console.log("************************************************************");
            console.log("Etat de reconciliation mmensuel");
            console.log("************************************************************");
            vm.pdfContent = API_URL + 'api/report/etatdereconciliationmensuel/vm.rapportData.dateDebutPeriode';
            $rootScope.etatDereconciliationUrl = API_URL + 'api/report/etatdereconciliationmensuel/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            console.log('url finale ' + $rootScope.etatDereconciliationUrl);
            $state.go('etat-de-reconciliation-pdf');
        };



        vm.impressionFactureVenteOuZero = function(result){
            if(designeFactureAImprimer ==='Z'){
               vm.imprimerFactureZero(result);
            }else if(designeFactureAImprimer === 'V'){
                 vm.imprimerFacture(result);
            }
        };

        vm.imprimerFacture = function (result) {
            vm.pdfContent = API_URL + 'api/report/lignesfactures/facture/result';
            $rootScope.factureUrl = API_URL + 'api/report/lignesfactures/facture/' + result;
            console.log("url pdf oh");
            console.log($rootScope.factureUrl);
            $state.go("facture-vente-pdf");
        };

        vm.imprimerFactureZero = function (result) {
            vm.pdfContent = API_URL + 'api/report/lignesfactures/facturezero/result';
            $rootScope.factureZeroUrl = API_URL + 'api/report/lignesfactures/facturezero/' + result;
            console.log("url pdf oh");
            console.log($rootScope.factureZeroUrl);
            $state.go("facture-zero-pdf");
        };

        vm.imprimerEtatstockParMagasin = function () {
            console.log(vm.rapportData);
            var dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            var dateFin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            $rootScope.etatStockParMagasinUrl = API_URL + 'api/report/etatdeproduitsparmagasin/' + vm.rapportData.produit.nomProduit + '/' + dateDebut + '/' + dateFin;
            console.log('url finale ' + $rootScope.etatStockParMagasinUrl);
            $state.go('etat-produits-par-magasin');
//            $state.go('rapport-stock');
            $scope.button_clicked = true;
        };

        vm.imprimerEtatstockDesProduitsDunMagasin = function () {
            console.log(vm.rapportData);
            var dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            var dateFin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            $rootScope.etattousLesproduitsDuMagasinUrl = API_URL + 'api/report/etatdetouslesproduitsdunmagasin/' + vm.rapportData.magasin.nomMagasin + '/' + dateDebut + '/' + dateFin;
            console.log('url finale ' + $rootScope.etattousLesproduitsDuMagasinUrl);
            $state.go('etat-stock-par-magasin-de-produit');
            $scope.button_clicked = true;
        };

        //rechercher des facture à afficher dans le tableau 
        vm.rechercherFactures = function () {
            var dateDebut = '', dateFin = '';
            if (vm.rapportData.dateDebutPeriode === null || vm.rapportData.dateFinPeriode === null) {
                alert("Il faut renseigner les champs date début et date fin");
            } else {
                designeFactureAImprimer = 'V';
                dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
                dateFin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
                FetchData.getData(API_URL + URL_FIND_ALL_FACTURE + dateDebut + '&dateFin=' + dateFin).then(function (response) {
                    console.log(response);
                    vm.lignebons = response.data;
                }, function (error) {
                    console.log(error);
                });
            }
            ;
        };

        vm.setPage = function (p) {
            vm.currentPage = p;
            vm.rechercherFactures();
//            vm.loadAll();
        };

        var designeFactureAImprimer = '';
        
        vm.trouverUneFactureZero = function () {
            if (vm.rapportData.numeroFactureZero === null) {
                alert("Le champ est vide");
            } else {
                designeFactureAImprimer = 'Z';
                
                FetchData.getData(API_URL + 'api/facture-zero-par-numeroFacture?numeroFacture=' + vm.rapportData.numeroFactureZero)
                        .then(function (response) {
                            console.log(response);
                            vm.lignebons = response.data;
                        }, function (error) {
                            console.log(error);
                        });
            }
        };

     
        vm.trouverFactureZeroParPeriode = function () {
            var dateDebut = '', dateFin = '';
            designeFactureAImprimer = 'Z';
            dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            dateFin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            console.log("LE BON RESULTAT "+dateDebut)
            FetchData.getData(API_URL + 'api/liste-facture-zero-par-periode?dateDebut=' + dateDebut + '&dateFin=' + dateFin)
                    .then(function (response) {
                        console.log(response);
                        vm.lignebons = response.data;
                    }, function (error) {
                        console.log(error);
                    });

        };
        
        
        vm.trouverUneFacture = function () {
            if (vm.rapportData.numeroFacture === null) {
                alert("Le champ est vide");
            } else {
                designeFactureAImprimer = 'V';
                FetchData.getData(API_URL + URL_FIND_ONE_FACTURE + vm.rapportData.numeroFacture)
                        .then(function (response) {
                            console.log(response);
                            vm.lignebons = response.data;
                        }, function (error) {
                            console.log(error);
                        });
            }
        };
              
        //Nouvelle methode rechercher des facture à afficher dans le tableau  
        vm.factureTrouverDuneperiode = function () {
            var dateDebut = '', dateFin = '';
            designeFactureAImprimer = 'V';
            dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            dateFin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);

            FetchData.getData(API_URL + URL_FACTURE_TROUVER + '?dateDebut=' + dateDebut + '&dateFin=' + dateFin)
                    .then(function (response) {
                        console.log(response);
                        vm.lignebons = response.data;
                    }, function (error) {
                        console.log(error);
                    });

        };

        vm.afficherBondesorties = function () {
            console.log(vm.rapportData);
            var dateDebut = '', dateFin = '';
            dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            dateFin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            FetchData.getData(API_URL + URL_LIST_BONS + '/' + vm.rapportData.magasin.nomMagasin + '/' + dateDebut + '/' + dateFin)
                    .then(function (response) {
                        console.log(response);
                        vm.lignebons = response.data;
                    }, function (error) {
                        console.log(error);
                    });

        };

        vm.imprimerBordereauLivraison = function (valeur) {
            vm.pdfContent = API_URL + 'api/report/lignelivraisons/bordereaulivraison/valeur';
            $rootScope.bordereauLivraisonUrl = API_URL + 'api/report/lignelivraisons/bordereaulivraison/' + valeur;
            console.log('url finale ' + $rootScope.bordereauLivraisonUrl);
//            $state.go('liste-bordereau-pdf');
            $state.go('bordereau-livraison-par-magasin');
        };
///report/lignesfactures/facturezero/{id}
        vm.imprimerBonDeSortie = function (valeur) {
            vm.pdfContent = API_URL + 'api/report/bondesorties/toutbondesortie/valeur';
            $rootScope.bonDesortieUrl = API_URL + 'api/report/bondesorties/toutbondesortie/' + valeur;
            console.log('url finale ' + $rootScope.bonDesortieUrl);
            $state.go('bondesortie-par-magasin');
        };

        //Impression des bon de sortie transfert et des détails des tranferts pour un magasin
        vm.imprimerDetailsTransfert = function () {
            var dateDebut = '', dateFin = '';
            dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            dateFin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            vm.pdfContent = API_URL + 'api/report/listedestransfertsparmagasin/vm.rapportData.magasin.nomMagasin/dateDebut/dateFin';
            $rootScope.tranfertUrl = API_URL + 'api/report/listedestransfertsparmagasin/' + vm.rapportData.magasin.nomMagasin + '/' + dateDebut + '/' + dateFin;
            console.log('url finale ' + $rootScope.tranfertUrl);
            $state.go('liste-transfert-par-magasin');

        };

        vm.listeBonDeSortieTransfert = function () {
            console.log(vm.rapportData);
            var dateDebut = '', dateFin = '';
            dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            dateFin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            FetchData.getData(API_URL + URL_LISTE_BONS_TRANSFERT + '/' + vm.rapportData.magasin.nomMagasin + '/' + dateDebut + '/' + dateFin)
                    .then(function (response) {
                        console.log(response);
                        vm.bonDeSortieTranfert = response.data;
                    }, function (error) {
                        console.log(error);
                    });
        };

        vm.venteParProduitMagasin = function () {
            console.log(vm.rapportData);
            var dateDebut = '', dateFin = '';
            dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            dateFin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            
            FetchData.getData(API_URL + URL_VENTE_PAR_PRODUIT + vm.rapportData.produit.nomProduit + '&nomMagasin=' + vm.rapportData.magasin.nomMagasin + '&dateDebut=' + dateDebut + '&dateFin=' + dateFin)
                    .then(function (response) {
                        console.log(response);
                console.log("AHHHHHHHHHHH  LE DEBUT "+dateDebut);
            console.log("AHHHHHHHHHHH LA FIN "+dateFin);
                        vm.bonsVente = response.data;
                    }, function (error) {
                        console.log(error);
                    });
        };

        vm.promotionParProduitMagasin = function () {
            console.log(vm.rapportData);
            var dateDebut = '', dateFin = '';
            dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            dateFin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            FetchData.getData(API_URL + URL_PROMOTION_PAR_PRODUIT + vm.rapportData.produit.nomProduit + '&nomMagasin=' + vm.rapportData.magasin.nomMagasin + '&dateDebut=' + dateDebut + '&dateFin=' + dateFin)
                    .then(function (response) {
                        console.log(response);
                        vm.bonsPromotion = response.data;
                    }, function (error) {
                        console.log(error);
                    });
        };

        vm.transfertParProduitMagasin = function () {
            console.log(vm.rapportData);
            var dateDebut = '', dateFin = '';
            dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            dateFin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            FetchData.getData(API_URL + URL_TRANSFERT_PAR_PRODUIT + vm.rapportData.produit.nomProduit + '&nomMagasin=' + vm.rapportData.magasin.nomMagasin + '&dateDebut=' + dateDebut + '&dateFin=' + dateFin)
                    .then(function (response) {
                        console.log(response);
                        vm.bonsTransfert = response.data;
                    }, function (error) {
                        console.log(error);
                    });
        };

        vm.perteParProduitMagasin = function () {
            console.log(vm.rapportData);
            var dateDebut = '', dateFin = '';
            dateDebut = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            dateFin = DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            FetchData.getData(API_URL + URL_PERTE_PAR_PRODUIT + vm.rapportData.produit.nomProduit + '&nomMagasin=' + vm.rapportData.magasin.nomMagasin + '&dateDebut=' + dateDebut + '&dateFin=' + dateFin)
                    .then(function (response) {
                        console.log(response);
                        vm.bonsPerte = response.data;
                    }, function (error) {
                        console.log(error);
                    });
        };



        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateDebutMois = false;
        vm.datePickerOpenStatus.dateFinMois = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };


        // -----------------------------




        

        vm.factures = [];

       vm.typeRecherche = 'bynum';


       vm.dateDebut = "";
       vm.dateFin = "";

       vm.numeroFacture = null;

        
//        vm.datePickerOpenStatus = {};
//        vm.datePickerOpenStatus.dateCommande = false;
//        vm.datePickerOpenStatus.dateDebutMois = false;
//        vm.datePickerOpenStatus.dateFinMois= false;
//
//        vm.openCalendar = function (date) {
//            vm.datePickerOpenStatus[date] = true;
//        };


        
        vm.totalPage = 0;
        vm.loadAllFacturesByPeriode = function () {
            var dateDebut, dateFin = null;
            if(vm.dateDebut!==null){
                dateDebut = $filter('date')(vm.dateDebut, 'yyyy-MM-dd');
            }
            if(vm.dateFin!==null){
                dateFin = $filter('date')(vm.dateFin, 'yyyy-MM-dd');
            }
            if (dateDebut && dateFin)
                // FetchData.getData(API_URL + 'api/facture/factures-non-solde/?dateDebut=' + dateDebut + '&dateFin=' + dateFin)
                FetchData.getData(API_URL + 'api/facture/factures-all-page/?dateDebut=' + dateDebut + '&dateFin=' + dateFin + '&page=' + vm.currentPage + '&size=' + vm.pageSize)
                .then(function (response, a, b) {
                    console.log('RESPONSE:::: ', response, response.headers, response.headers());
                    vm.factures = response.data;
                    // vm.onSuccess(response.getAllResponseHeaders());
                    // vm.totalElements = response.data.totalElements;
                    // vm.totalPage = response.data.totalPages;
                    vm.totalPage = response.headers('X-Total-Count');

                    console.log('nombre d\'élément @@@ ' + vm.totalElements);
                    console.log('nombre de page @@@ ' + vm.totalPage);
                    // console.log("OUUHHH "+vm.bonDeSortie.numero);
                }, function (error) {
                    console.log(error);
                });
        };



    

        vm.loadFactureByNumFacture = function () {

            if (vm.numeroFacture)
                FetchData.getData(API_URL + 'api/facture/'+vm.numeroFacture+'/factures-non-solde', vm.onSuccess)
                .then(function (response) {
                    console.log(response);
                    vm.factures = response.data;
                    vm.totalElements = response.data.totalElements;
                    vm.totalPage = response.data.totalPages;

                    console.log('nombre d\'élément ' + vm.totalElements);
                    console.log('nombre de page ' + vm.totalPage);
                    // console.log("OUUHHH "+vm.bonDeSortie.numero);
                }, function (error) {
                    console.log(error);
                });
        };


        



        vm.options = {};
        vm.toggleMin = function() {
            console.log("toggleMin");
            vm.options.maxDate = vm.options.maxDate ? null : new Date();
        };

        vm.toggleMin();


    }
})();
