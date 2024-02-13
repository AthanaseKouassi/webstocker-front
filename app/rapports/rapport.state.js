(function () {

    'use strict';

    angular
            .module('app')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider

                .state('rapport-de-vente', {
                    parent: 'app',
                    url: '/rapport-de-vente',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'rapport-de-vente'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/rapport-de-vente.html',
                            controller: 'RapportDeVenteController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        entity: function () {
                            return{
                                magasin: null,
                                ville: null,
                                dateDebutPeriode: null,
                                dateFinPeriode: null
                            };
                        },
//                    clientEntity : function(){
//                        return{
//                            nomClient : null,
//                            id : null                           
//                        };
//                    },
//                    bonDesortieEntity : function(){
//                        return{
//                            numero: null,
//                            daateCreation: null,
//                            typeSortie: null,
//                            typeVente: null,
//                            id: null
//                        };
//                    },
                        factureEntity: function () {
                            return{
                                client: null,
                                id: null,
                                dateFacture: null,
                                bonDeSortie: null
//                            dateDebutPeriode : null,
//                            dateFinPeriode : null                            
                            };
                        },
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('magasin');
                                $translatePartialLoader.addPart('global');
                                return $translate.refresh();
                            }]
                    }
                })
                .state('quantite-vendue-par-agent', {
                    parent: 'app',
                    url: '/quantite-vendue-par-agent',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'quantite-vendue-par-agent'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/quantite-vendue-par-agent.html',
                            controller: 'QuantiteVendueParAgentController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('magasin');
                                $translatePartialLoader.addPart('global');
                                return $translate.refresh();
                            }]
                    }
                })
                .state('quantite-vendue-par-agent-pdf', {
                    parent: 'app',
                    url: '/quantite-vendue-par-agent-pdf',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'quantite-vendue-par-agent-pdf'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/quantite-vendue-par-agent-pdf.html'                          
                        }
                    }
                })
                .state('chiffre-affaire-par-client-nouveau', {
                    parent: 'app',
                    url: '/chiffre-affaire-par-client-nouveau',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'chiffre-affaire-par-client-nouveau'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/chiffre-affaire-par-client-nouveau.html',
                            controller: 'ChiffreAffaireClientNouveauController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('magasin');
                                $translatePartialLoader.addPart('global');
                                return $translate.refresh();
                            }]
                    }
                })
                .state('chiffre-affaire-par-client-nouveau-pdf', {
                    parent: 'app',
                    url: '/chiffre-affaire-par-client-nouveau-pdf',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'chiffre-affaire-par-client-nouveau-pdf'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/chiffre-affaire-par-client-nouveau-pdf.html'
                        }
                    }
                })
                .state('chiffre-affaire-par-client-nouveau2-pdf', {
                    parent: 'app',
                    url: '/chiffre-affaire-par-client-nouveau2-pdf',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'chiffre-affaire-par-client-nouveau2-pdf'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/chiffre-affaire-par-client-nouveau2-pdf.html'
                        }
                    }
                })
                .state('rapport-quantite-vendu-produit-district', {
                    parent: 'app',
                    url: '/rapport-quantite-vendu-produit-district',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'rapport-quantite-vendu-produit-district'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/rapport-quantite-vendu-produit-district.html',
                            controller: 'RapportQuantiteVenduParDistrictController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('magasin');
                                $translatePartialLoader.addPart('global');
                                return $translate.refresh();
                            }]
                    }
                })

                .state('etat-de-reconciliation-pdf', {
                    parent: 'app',
                    url: '/etat-de-reconciliation-pdf',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'liste-facture'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/etat-de-reconciliation-pdf.html'
                        }
                    }
                })
                .state('liste-facture', {
                    parent: 'app',
                    url: '/liste-facture',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'liste-facture'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/liste-des-factures-pdf.html'
                        }
                    }
                })
                .state('facture-vente-pdf', {
                    parent: 'app',
                    url: '/facture-vente-pdf',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'facture-vente-pdf'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/facture-vente-pdf.html'
                        }
                    }
                })
                .state('facture-zero-pdf', {
                    parent: 'app',
                    url: '/facture-zero-pdf',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'facture-zero-pdf'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/facture-zero-pdf.html'
                        }
                    }
                })
                .state('taux-atteinte-objectif', {
                    parent: 'app',
                    url: '/taux-atteinte-objectif',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'taux-atteinte-objectif'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/taux-atteinte-objectif-pdf.html'
                        }
                    }
                })
                .state('chiffre-affaire-magasin', {
                    parent: 'app',
                    url: '/chiffre-affaire-magasin',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'chiffre-affaire-magasin'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/rapport-chiffre-affaire-magasin-pdf.html'
                        }
                    }
                })
                .state('chiffre-affaire-client', {
                    parent: 'app',
                    url: '/chiffre-affaire-client',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'chiffre-affaire-client'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/rapport-chiffre-affaire-client-pdf.html'
                        }
                    }
                })
                .state('rapport-chiffre-affaire-produit', {
                    parent: 'app',
                    url: '/rapport-chiffre-affaire-produit',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'rapport-chiffre-affaire-produit'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/rapport-chiffre-affaire-produit-pdf.html'
                        }
                    }
                })
                .state('rapport-quantite-vendu-district', {
                    parent: 'app',
                    url: '/rapport-quantite-vendu-district',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'rapport-quantite-vendu-district'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/rapport-quantite-vendu-district-pdf.html'
                        }
                    }
                })
                .state('etat-produits-par-magasin', {
                    parent: 'app',
                    url: '/etat-produits-par-magasin',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'produit par magasin'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/etat-produits-par-magasin-pdf.html'
                        }
                    }
                })
                .state('bondesortie-par-magasin', {
                    parent: 'app',
                    url: '/bondesortie-par-magasin',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'Bon de sortie par magasin'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/bondesortie-par-magasin-pdf.html'
                        }
                    }
                })
                .state('bordereau-livraison-par-magasin', {
                    parent: 'app',
                    url: '/bordereau-livraison-par-magasin',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'Bordereau de livraison par magasin'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/bordereau-livraison-par-magasin-pdf.html'
                        }
                    }
                })
                .state('etat-stock-par-magasin-de-produit', {
                    parent: 'app',
                    url: '/etat-stock-par-magasin-de-produit',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'Stock d\'un produit dans les magasin'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/etat-stock-par-magasin-de-produit-pdf.html'
                        }
                    }
                })
                .state('liste-transfert-par-magasin', {
                    parent: 'app',
                    url: '/liste-transfert-par-magasin',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'Liste des transferts par magasin'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/liste-transfert-par-magasin-pdf.html'
                        }
                    }
                })
                .state('inventaireancien', {
                    parent: 'app',
                    url: '/inventaire',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'inventaire'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/inventaire.html',
                            controller: 'InventaireController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        entityInventaire: function () {
                            return{
                                magasin: null,
                                produit: null,
                                quantite: null,
                                dateDebutPeriode: null,
                                dateFinPeriode: null
                            };
                        },
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('magasin');
                                $translatePartialLoader.addPart('global');
                                return $translate.refresh();
                            }]
                    }
                })
                .state('liste-des-factures', {
                    parent: 'app',
                    url: '/liste-des-factures',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'liste-des-factures'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/liste-des-factures.html',
                            controller: 'ListeDesFacturesController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {

                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('magasin');
                                $translatePartialLoader.addPart('global');
                                return $translate.refresh();
                            }]
                        ,
                        entityListe: ['$stateParams', 'ListeFacturesService', function ($stateParams, ListeFacturesService) {
                                return ListeFacturesService.queryListeFac({id: $stateParams.id});
                            }]
                    }
                })
                .state('rapport-chiffre-affaire-client', {
                    parent: 'app',
                    url: '/rapport-chiffre-affaire-client',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'rapport-chiffre-affaire-client'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/rapport-chiffre-affaire-client.html',
                            controller: 'RapportChiffreAffaireClientController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('magasin');
                                $translatePartialLoader.addPart('global');
                                return $translate.refresh();
                            }]
                    }
                })
                .state('etat-de-reconciliation', {
                    parent: 'app',
                    url: '/etat-de-reconciliation',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'etat-de-reconciliation'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/etat-de-reconciliation.html',
                            controller: 'EtatDeReconciliationController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('magasin');
                                $translatePartialLoader.addPart('global');
                                return $translate.refresh();
                            }]
                    }
                })
                .state('rapport-chiffre-affaire-magasin', {
                    parent: 'app',
                    url: '/rapport-chiffre-affaire-magasin',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'rapport-chiffre-affaire-magasin'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/rapport-chiffre-affaire-magasin.html',
                            controller: 'ChiffreAffaireParMagasinController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('magasin');
                                $translatePartialLoader.addPart('global');
                                return $translate.refresh();
                            }]
                    }
                })
                .state('taux-atteinte-des-resultats', {
                    parent: 'app',
                    url: '/taux-atteinte-des-resultats',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'taux-atteinte-des-resultats'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/taux-atteinte-des-resultats.html',
                            controller: 'TauxAtteinteResultatController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('objectifs');
                                $translatePartialLoader.addPart('global');
                                return $translate.refresh();
                            }]
                    }
                })
                .state('chiffre-affaire-par-mode-paiement', {
                    parent: 'app',
                    url: '/chiffre-affaire-par-mode-paiement',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'chiffre-affaire-par-mode-paiement'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/chiffre-affaire-par-mode-paiement.html',
                            controller: 'ChiffreAffaireParModePaiementController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('magasin');
                                $translatePartialLoader.addPart('global');
                                return $translate.refresh();
                            }]
                    }
                })
                .state('chiffre-affaire-par-mode-paiement-pdf', {
                    parent: 'app',
                    url: '/chiffre-affaire-par-mode-paiement-pdf',
                    data: {
                        authorities: ['ROLE_USER'],
                        pagetitle: 'chiffre-affaire-par-mode-paiement-pdf'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'rapports/chiffre-affaire-par-mode-paiement-pdf.html'                          
                        }
                    }
                });
//            .state('rapport-delegues', {
//                parent: 'app',
//                url: '/rapport-delegues',
//                data: {
//                    authorities: ['ROLE_USER'],
//                    pagetitle: 'rapport-delegues'
//                },
//                views: {
//                    '@app': {
//                        templateUrl: 'rapports/rapport-delegues.html',
//                        controller: 'RapportDelegueController',
//                        controllerAs: 'vm'
//                    }
//                },
//                resolve: {
//                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                            $translatePartialLoader.addPart('magasin');
//                            $translatePartialLoader.addPart('global');
//                            return $translate.refresh();
//                    }]
//                }
//            });
    }
})();