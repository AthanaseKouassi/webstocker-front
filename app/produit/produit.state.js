(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('rapport-global-stock.bailleur', {
            parent: 'rapport-global-stock',
            url: '/bailleur',
            data: {
                authorities: ['ROLE_USER']               
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'produit/rapport-global-stock-bailleur.html',
                    controller: 'RapportGlobalStockBailleurController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nomProduit: null,
                                prixVente: null,
                                prixVenteGros: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('rapport-global-stock-bailleur-pdf', null, { reload: true });
                }, function() {
                    $state.go('rapport-global-stock-bailleur-pdf');
                });
            }]
        })
         .state('rapport-global-stock-bailleur-pdf', {
            parent: 'app',
            url: '/rapport-global-stock-bailleur-pdf',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'rapport-global-stock-bailleur'
            },
            views: {
                '@app': {
                    templateUrl: 'produit/rapport-global-stock-bailleur-pdf.html'
                }
            }
        })
         .state('rapport-stock-global-pdf', {
            parent: 'app',
            url: '/rapport-stock-global-pdf',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'rapport-stock-global'
            },
            views: {
                '@app': {
                    templateUrl: 'produit/rapport-stock-global-pdf.html'
                }
            }
        })
         .state('rapport-global-stock', {
            parent: 'app',
            url: '/rapport-global-stock',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.produit.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'produit/rapport-global-stock.html',
                    controller: 'RapportGlobalStockControlleur',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('produit');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('produit-abime-perime', {
            parent: 'app',
            url: '/produit-abime-perime',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.produit.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'produit/produit-abime-perime.html',
                    controller: 'ProduitAbimePerimeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('produit');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('produit', {
            parent: 'app',
            url: '/produit',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.produit.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'produit/produits.html',
                    controller: 'ProduitController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('produit');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('produit-detail', {
            parent: 'app',
            url: '/produit/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.produit.detail.title'
            },
            views: {
                '@app': {
                    templateUrl: 'produit/produit-detail.html',
                    controller: 'ProduitDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('produit');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Produit', function($stateParams, Produit) {
                    return Produit.get({id : $stateParams.id});
                }]
            }
        })
        .state('produit.new', {
            parent: 'produit',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'produit/produit-dialog.html',
                    controller: 'ProduitDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nomProduit: null,
                                prixVente: null,
                                prixVenteGros: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('produit', null, { reload: true });
                }, function() {
                    $state.go('produit');
                });
            }]
        })
        .state('produit.edit', {
            parent: 'produit',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'produit/produit-dialog.html',
                    controller: 'ProduitDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Produit', function(Produit) {
                            return Produit.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('produit', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('produit.delete', {
            parent: 'produit',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'produit/produit-delete-dialog.html',
                    controller: 'ProduitDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Produit', function(Produit) {
                            return Produit.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('produit', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
