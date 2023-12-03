(function () {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider

            .state('valide-vente', {
                parent: 'facture',
                url: '/validevente',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'facture/valide-vente.html',
                        controller: 'ValideVenteController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    dateCommande: null,
                                    quantiteCommande: null,
                                    prixAchat: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function () {
                        $state.go('facture', null, {reload: true});
                    }, function () {
                        $state.go('facture');
                    });
                }]
            })
            .state('facture', {
                parent: 'client-vente',
                url: '/facture',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'webstockerApp.livraison.home.title'
                },
                views: {
                    '@app': {
                        templateUrl: 'facture/factures.html',
                        controller: 'FactureController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('facture');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('facture-zero', {
                parent: 'destinataire-promotion',
                url: '/facture-zero',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'webstockerApp.livraison.home.title'
                },
                views: {
                    '@app': {
                        templateUrl: 'facture/facture-zero.html',
                        controller: 'FactureZeroController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('livraison');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('destinataire-promotion', {
                parent: 'app',
                url: '/destinataire-promotion',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'webstockerApp.livraison.home.title'
                },
                views: {
                    '@app': {
                        templateUrl: 'facture/destinataire-promotion.html',
                        controller: 'DestinatairePromotionController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('livraison');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('client-vente', {
                parent: 'app',
                url: '/client-vente',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'client-vente'
                },
                views: {
                    '@app': {
                        templateUrl: 'facture/vente_wizard.html',
                        controller: 'VenteClientController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: function () {
                        return {
                            numero: null,
                            numeroFactureNormalise:null,
                            daateCreation: null,
                            typeSortie: null,
                            typeVente: null,
                            id: null
                        };
                    },
                    lignecommandeEntity: function () {
                        return {
                            produit: null,
                            prixVente: null,
                            quantite: null,
                            prixDeVente: null,
                            id: null
                        };
                    },
                    venteClientEntity: function () {
                        return {
                            bonDeSortie: null,
                            ligneBonDeSorties: null
                        };
                    },
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('livraison');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('client-vente.edit', {
                    parent: 'client-vente',
//                    parent: 'app',
                    url: '/{id}/edit',
                    data: {
                        authorities: ['ROLE_USER']
                    },
                    views: {
                        '@app': {
                            templateUrl: 'facture/vente_wizard.html',
                            controller: 'VenteClientController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        entity: ['$stateParams','BonDeSortie', function ($stateParams,BonDeSortie) {
                                return BonDeSortie.get({id: $stateParams.id});
                            }]
                        ,
                         lignecommandeEntity:['$stateParams','LigneBonDeSortie', function($stateParams,LigneBonDeSortie){
                                 return LigneBonDeSortie.get({id: $stateParams.id});
                         }],
                     venteClientEntity:['$stateParams','LigneBonDeSortie',function($stateParams,LigneBonDeSortie){
                             return LigneBonDeSortie.get({id: $stateParams.id});
                     }]
                     
                    }
                   
                })
                 .state('bondesortie-vente', {
            parent: 'app',
            url: '/bondesortie-vente',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'modification vente'
            },
            views: {
                '@app': {
                    templateUrl: 'facture/bondesortie-vente.html',
                    controller: 'BonDeSortieVenteController',
                    controllerAs: 'vm'
                }
            }
        })

            .state('facture-vente', {
                parent: 'app',
                url: '/facture-vente',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'client-facture'
                },
                views: {
                    '@app': {
                        templateUrl: 'facture/vente_facture.html',
                         controller: 'PrintController'
                        // controllerAs: 'vm'
                    }
                }
            })
            .state('tresorerie', {
                parent: 'app',
                url: '/tresorerie',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'webstockerApp.livraison.home.title'
                },
                views: {
                    '@app': {
                        templateUrl: 'facture/tresorerie.html',
                        controller: 'TresorerieController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('facture');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('tresorerie.pay', {
                parent: 'tresorerie',
                url: '/tresorerie-pay',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'facture/tresorerie-dialog.html',
                        controller: 'ConfirmationTresorerieController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    quantiteFacture: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function() {
                        $state.go('tresorerie', null, { reload: true });
                    }, function() {
                        $state.go('tresorerie');
                    });
                }]
            });
    }

})();

