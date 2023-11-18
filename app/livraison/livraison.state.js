(function () {
    'use strict';

    angular
            .module('app')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider

            .state('reception-livraison-report', {
                parent: 'app',
                url: '/reception-livraison-report',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Bordereau de réception'
                },
                views: {
                    '@app': {
                        templateUrl: 'livraison/reception-livraison-rapport.html'
                    }
                }
            })
            .state('liste-bon-de-sortie', {
                parent: 'app',
                url: '/liste-bon-de-sortie',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'liste-bon-de-sortie'
                },
                views: {
                    '@app': {
                        templateUrl: 'livraison/liste-bon-de-sortie-pdf.html'
                    }
                }
            })
            .state('liste-bordereau-pdf', {
                parent: 'app',
                url: '/liste-bordereau-pdf',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'liste-bordereau-pdf'
                },
                views: {
                    '@app': {
                        templateUrl: 'livraison/liste-bordereau-pdf.html'
                    }
                }
            })
            .state('etat-transfert-magasin', {
                parent: 'app',
                url: '/etat-transfert-magasin',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'webstockerApp.livraison.home.title'
                },
                views: {
                    '@app': {
                        templateUrl: 'livraison/etat-transfert-magasin.html',
                        controller: 'EtatTransfertMagasinController',
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
            .state('quantite-agence-produit', {
                parent: 'app',
                url: '/quantite-agence-produit',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'webstockerApp.livraison.home.title'
                },
                views: {
                    '@app': {
                        templateUrl: 'livraison/quantite-agence-produit.html',
                        controller: 'QuantiteAgenceproduitController',
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
//        .state('facture', {
//            parent: 'app',
//            url: '/facture',
//            data: {
//                authorities: ['ROLE_USER'],
//                pageTitle: 'webstockerApp.livraison.home.title'
//            },
//            views: {
//                '@app': {
//                    templateUrl: 'facture/facture.html',
//                    controller: 'FactureController',
//                    controllerAs: 'vm'
//                }
//            },
//            resolve: {
//                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                    $translatePartialLoader.addPart('livraison');
//                    $translatePartialLoader.addPart('global');
//                    return $translate.refresh();
//                }]
//            }
//        })            

        $stateProvider
            .state('livraison', {
                parent: 'app',
                url: '/livraison',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'webstockerApp.livraison.home.title'
                },
                views: {
                    '@app': {
                        templateUrl: 'livraison/livraisons.html',
                        controller: 'LivraisonController',
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
            .state('transfert', {//livraison
                parent: 'app',
                url: '/transfert',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'webstockerApp.livraison.home.title'
                },
                views: {
                    '@app': {
                        templateUrl: 'livraison/transfert.html',
                        controller: 'LivraisonController',
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
            .state('liste-bordereau-livraison', {//livraison
                parent: 'app',
                url: '/liste-bordereau-livraison',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'webstockerApp.livraison.home.title'
                },
                views: {
                    '@app': {
                        templateUrl: 'livraison/liste-bordereau-livraison.html',
                        controller: 'ListeBodereauLivraisonController',
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
            .state('livraison-detail', {
                parent: 'app',
                url: '/livraison/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'webstockerApp.livraison.detail.title'
                },
                views: {
                    '@app': {
                        templateUrl: 'livraison/livraison-detail.html',
                        controller: 'LivraisonDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('livraison');
                            return $translate.refresh();
                        }],
                    entity: ['$stateParams', 'Livraison', function ($stateParams, Livraison) {
                            return Livraison.get({id: $stateParams.id});
                        }]
                }
            })
            .state('livraison.new', {
                parent: 'livraison',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER']
                },
                views: {
                    '@app': {
                        templateUrl: 'livraison/commande_livraison_wizard.html',
                        controller: 'CommandeLivraisonController',
                        controllerAs: 'vm',
                    }
                },
                resolve: {
                    entity: function () {
                        return {
                            dateLivraison: null,
                            quantiteLivre: null,
                            id: null
                        };
                    },
                    lignelivraisonEntity: function () {
                        return {
                            quantiteLotLivre: null,
                            quantiteCartonLot: null,
                            id: null
                        };
                    },
                    commandeLivraisonEntity: function () {
                        return {
                            livraison: null,
                            lignelivraisons: null
                        };
                    },
                    lotEntity: function () {
                        return {
                            numeroLot: null,
                            dateFabrication: null,
                            datePeremption: null,
                            descriptionLot: null,
                            quantiteLot: null,
                            quantiteCartonLot: null,
                            id: null
                        };
                    },
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('livraison');
                            $translatePartialLoader.addPart('global');
                            return $translate.refresh();
                        }]
                }

            })
            .state('livraison.edit', {
                parent: 'livraison',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                        $uibModal.open({
                            templateUrl: 'livraison/livraison-dialog.html',
                            controller: 'LivraisonDialogController',
                            controllerAs: 'vm',
                            backdrop: 'static',
                            size: 'lg',
                            resolve: {
                                entity: ['Livraison', function (Livraison) {
                                        return Livraison.get({id: $stateParams.id});
                                    }]
                            }
                        }).result.then(function () {
                            $state.go('livraison', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        });
                    }]
            })
            .state('livraison.delete', {
                parent: 'livraison',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                        $uibModal.open({
                            templateUrl: 'livraison/livraison-delete-dialog.html',
                            controller: 'LivraisonDeleteController',
                            controllerAs: 'vm',
                            size: 'md',
                            resolve: {
                                entity: ['Livraison', function (Livraison) {
                                        return Livraison.get({id: $stateParams.id});
                                    }]
                            }
                        }).result.then(function () {
                            $state.go('livraison', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        });
                    }]
            });
    }

})();
