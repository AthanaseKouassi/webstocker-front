(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('reglement-credit', {
            parent: 'app',
            url: '/reglement-credit',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.produit.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'reglement/reglement-credit.html',
                    controller: 'ReglementCreditController',
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
//        .state('paiement', {
//            parent: 'reglement-credit',
//            url: '/paiement',
//            data: {
//                authorities: ['ROLE_USER'],
//                pageTitle: 'webstockerApp.produit.detail.title'
//            },
//            views: {
//                '@app': {
//                    templateUrl: 'reglement/paiement.html',
//                    controller: 'PaiementController',
//                    controllerAs: 'vm'
//                }
//            },
//            resolve: {
//                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                    $translatePartialLoader.addPart('produit');
//                    return $translate.refresh();
//                }],
//                entity: ['$stateParams', 'Produit', function($stateParams, Produit) {
//                    return Produit.get({id : $stateParams.id});
//                }]
//            }
//        });
        .state('paiement', {
            parent: 'reglement-credit',
            url: '/paiement/:reste?numero',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'reglement/paiement.html',
                    controller: 'PaiementController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity:  function () {
                            console.log("stateeeeeeeee");
                            console.log($stateParams.numero);
                            console.log($stateParams.reste);

                            return {
                                dateReglement: null,
                                montantReglement: null,
                                facture: null,
                                id: null,
                                reste: parseInt($stateParams.reste,10),
                                numero: $stateParams.numero
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('reglement-credit', null, { reload: true });
                }, function() {
                    $state.go('reglement-credit');
                });
            }]
        });
//        .state('produit.edit', {
//            parent: 'produit',
//            url: '/{id}/edit',
//            data: {
//                authorities: ['ROLE_USER']
//            },
//            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
//                $uibModal.open({
//                    templateUrl: 'produit/produit-dialog.html',
//                    controller: 'ProduitDialogController',
//                    controllerAs: 'vm',
//                    backdrop: 'static',
//                    size: 'lg',
//                    resolve: {
//                        entity: ['Produit', function(Produit) {
//                            return Produit.get({id : $stateParams.id});
//                        }]
//                    }
//                }).result.then(function() {
//                    $state.go('produit', null, { reload: true });
//                }, function() {
//                    $state.go('^');
//                });
//            }]
//        })
//        .state('produit.delete', {
//            parent: 'produit',
//            url: '/{id}/delete',
//            data: {
//                authorities: ['ROLE_USER']
//            },
//            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
//                $uibModal.open({
//                    templateUrl: 'produit/produit-delete-dialog.html',
//                    controller: 'ProduitDeleteController',
//                    controllerAs: 'vm',
//                    size: 'md',
//                    resolve: {
//                        entity: ['Produit', function(Produit) {
//                            return Produit.get({id : $stateParams.id});
//                        }]
//                    }
//                }).result.then(function() {
//                    $state.go('produit', null, { reload: true });
//                }, function() {
//                    $state.go('^');
//                });
//            }]
//        });
    }

})();
