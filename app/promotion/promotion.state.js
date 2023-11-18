(function () {
    'use strict';

    angular
            .module('app')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {


        $stateProvider

                .state('promotion-produit', {
                    parent: 'app',
                    url: '/promotion-produit',
                    data: {
                        authorities: ['ROLE_USER'],
                        pageTitle: 'promotion-produit'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'promotion/promotion_produit.html',
                            controller: 'PromotionClientController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        entity: function () {
                            return {
                                numero: null,
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
                                prixDeVente: null,
                                quantite: null,
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
                .state('promotion-produit.edit', {
                    parent: 'promotion-produit',
//                    parent: 'app',
                    url: '/{id}/edit',
                    data: {
                        authorities: ['ROLE_USER'],
                        pageTitle: 'promotion-produit'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'promotion/promotion_produit.html',
                            controller: 'PromotionClientController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        entity: ['$stateParams', 'BonDeSortie', function ($stateParams, BonDeSortie) {
                                return BonDeSortie.get({id: $stateParams.id});
                            }]
                        ,
                        lignecommandeEntity: ['$stateParams', 'LigneBonDeSortie', function ($stateParams, LigneBonDeSortie) {
                                return LigneBonDeSortie.get({id: $stateParams.id});
                            }],
                        venteClientEntity: ['$stateParams', 'LigneBonDeSortie', function ($stateParams, LigneBonDeSortie) {
                                return LigneBonDeSortie.get({id: $stateParams.id});
                            }]

                    }

                })
                .state('promotion-produit-report', {
                    parent: 'app',
                    url: '/promotion-produit-report',
                    data: {
                        authorities: ['ROLE_USER'],
                        pageTitle: 'promotion-produit'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'promotion/promotion_produit_rapport.html',
                            controller: 'PrintController'
                        }
                    }
                })
                .state('bondesortie-promotion', {
                    parent: 'app',
                    url: '/bondesortie-promotion',
                    data: {
                        authorities: ['ROLE_USER'],
                        pageTitle: 'modification promotion'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'promotion/bondesortie-promotion.html',
                            controller: 'BonDeSortiePromotionController',
                            controllerAs: 'vm'
                        }
                    }

                })
                .state('rapport_facture_zero', {
                    parent: 'app',
                    url: '/rapport_facture_zero',
                    data: {
                        authorities: ['ROLE_USER'],
                        pageTitle: 'rapport_facture_zero'
                    },
                    views: {
                        '@app': {
                            templateUrl: 'promotion/promotion_rapport_facture_zero.html',
                            //controller : 'PromotionProduitFactureZeroController'

                        }
                    }
                });
    }

})();
