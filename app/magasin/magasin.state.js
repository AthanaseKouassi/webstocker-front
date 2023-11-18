(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('rapport-promotion-magasin', {
            parent: 'app',
            url: '/rapport-promotion-magasin',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.magasin.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'magasin/rapport-promotion-magasin.html',
                    controller: 'RapportPromotionMagasinController',
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
        // .state('etat-vente-magasin', {
        //     parent: 'app',
        //     url: '/etat-vente-magasin',
        //     data: {
        //         authorities: ['ROLE_USER'],
        //         pageTitle: 'webstockerApp.magasin.home.title'
        //     },
        //     views: {
        //         '@app': {
        //             templateUrl: 'magasin/etat-vente-magasin.html',
        //             controller: 'StockMagasinController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
        //             $translatePartialLoader.addPart('magasin');
        //             $translatePartialLoader.addPart('global');
        //             return $translate.refresh();
        //         }]
        //     }
        // })

        .state('magasin', {
            parent: 'app',
            url: '/magasin',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.magasin.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'magasin/magasins.html',
                    controller: 'MagasinController',
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
        .state('magasin-detail', {
            parent: 'app',
            url: '/magasin/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.magasin.detail.title'
            },
            views: {
                '@app': {
                    templateUrl: 'magasin/magasin-detail.html',
                    controller: 'MagasinDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('magasin');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Magasin', function($stateParams, Magasin) {
                    return Magasin.get({id : $stateParams.id});
                }]
            }
        })
        .state('magasin.new', {
            parent: 'magasin',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'magasin/magasin-dialog.html',
                    controller: 'MagasinDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nomMagasin: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('magasin', null, { reload: true });
                }, function() {
                    $state.go('magasin');
                });
            }]
        })
        .state('magasin.edit', {
            parent: 'magasin',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'magasin/magasin-dialog.html',
                    controller: 'MagasinDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Magasin', function(Magasin) {
                            return Magasin.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('magasin', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('magasin.delete', {
            parent: 'magasin',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'magasin/magasin-delete-dialog.html',
                    controller: 'MagasinDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Magasin', function(Magasin) {
                            return Magasin.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('magasin', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
