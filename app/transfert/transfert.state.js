(function () {
'use strict';
        angular
        .module('app')
        .config(stateConfig);
        stateConfig.$inject = ['$stateProvider'];
        function stateConfig($stateProvider) {
        $stateProvider

            .state('transfert-produit', {
            parent: 'app',
                    url: '/transfert-produit',
                    data: {
                    authorities: ['ROLE_USER'],
                            pageTitle: 'transfert-produit'
                    },
                    views: {
                    '@app': {
                    templateUrl: 'transfert/transfert_produit.html',
                            controller: 'TransfertClientController',
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
                            statusTranfert: null,
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
            .state('transfert-produit.edit', {
                parent: 'transfert-produit',
//                    parent: 'app',
                url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            views: {
            '@app': {
                templateUrl: 'transfert/transfert_produit.html',
                controller: 'TransfertClientController',
                controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'BonDeSortie', function ($stateParams, BonDeSortie) {
                    return BonDeSortie.get({id: $stateParams.id});
                }],
                lignecommandeEntity: ['$stateParams', 'LigneBonDeSortie', function ($stateParams, LigneBonDeSortie) {
                    return LigneBonDeSortie.get({id: $stateParams.id});
                }],
                venteClientEntity: ['$stateParams', 'LigneBonDeSortie', function ($stateParams, LigneBonDeSortie) {
                    return LigneBonDeSortie.get({id: $stateParams.id});
                }]

            }

            })
            .state('bondesortie-transfert', {
                parent: 'app',
                url: '/bondesortie-transfert',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'modification transfert'
            },
            views: {
            '@app': {
                templateUrl: 'transfert/bondesortie-transfert.html',
                controller: 'BonDeSortieTransfertController',
                controllerAs: 'vm'
                }
            }

            })

            .state('transfert-produit-report', {
            parent: 'app',
                    url: '/transfert-produit-report',
                    data: {
                    authorities: ['ROLE_USER'],
                            pageTitle: 'transfert-produit'
                    },
                    views: {
                    '@app': {
                    templateUrl: 'transfert/transfert_produit_rapport.html',
                            controller: 'PrintController'
                    }
                    }
            })
            .state('reception_transfert', {
            parent: 'app',
            url: '/reception_transfert',
            data: {
            authorities: ['ROLE_USER'],
                    pageTitle: 'reception_transfert'
            },
            views: {
            '@app': {
            templateUrl: 'transfert/reception_transfert.html',
                    controller: 'ReceptionTransfertController',
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
                        dateReception: null,
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
            .state('reception_transfert.edit', {
            parent: 'reception_transfert',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER']
                 },
                 onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                     $uibModal.open({
                    templateUrl: 'transfert/confirmation-transfert-dialog.html',
                    controller: 'ConfirmationTransfertController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['BonDeSortie', function (BonDeSortie) {
                        return BonDeSortie.get({id: $stateParams.id});
                        }]
                    }
                }).result.then(function () {
                    $state.go('reception_transfert', null, {reload: true});
                    }, function () {
                    $state.go('^');
                });
            }]
        });
    } 
            
 })();
