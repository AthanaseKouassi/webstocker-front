(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('bon-de-sortie-wizard', {
            parent: 'app',
            url: '/bon-de-sortie-wizard',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.bonDeSortie.detail.title'
            },
            views: {
                '@app': {
                    templateUrl: 'bon-de-sortie/bon-de-sortie-wizard.html',
                    controller: 'BonDeSortieWizardController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('bonDeSortie');
                    $translatePartialLoader.addPart('typeSortie');
                    $translatePartialLoader.addPart('typeVente');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'BonDeSortie', function($stateParams, BonDeSortie) {
                    return BonDeSortie.get({id : $stateParams.id});
                }]
            }
        })
        .state('bon-de-sortie', {
            parent: 'app',
            url: '/bon-de-sortie?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.bonDeSortie.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'bon-de-sortie/bon-de-sorties.html',
                    controller: 'BonDeSortieController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('bonDeSortie');
                    $translatePartialLoader.addPart('typeSortie');
                    $translatePartialLoader.addPart('typeVente');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('bon-de-sortie-detail', {
            parent: 'app',
            url: '/bon-de-sortie/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.bonDeSortie.detail.title'
            },
            views: {
                '@app': {
                    templateUrl: 'bon-de-sortie/bon-de-sortie-detail.html',
                    controller: 'BonDeSortieDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('bonDeSortie');
                    $translatePartialLoader.addPart('typeSortie');
                    $translatePartialLoader.addPart('typeVente');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'BonDeSortie', function($stateParams, BonDeSortie) {
                    return BonDeSortie.get({id : $stateParams.id});
                }]
            }
        })
        .state('bon-de-sortie.new', {
            parent: 'bon-de-sortie',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'bon-de-sortie/bon-de-sortie-dialog.html',
                    controller: 'BonDeSortieDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                numero: null,
                                daateCreation: null,
                                typeSortie: null,
                                typeVente: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('bon-de-sortie', null, { reload: true });
                }, function() {
                    $state.go('bon-de-sortie');
                });
            }]
        })
        .state('bon-de-sortie.edit', {
            parent: 'bon-de-sortie',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'bon-de-sortie/bon-de-sortie-dialog.html',
                    controller: 'BonDeSortieDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['BonDeSortie', function(BonDeSortie) {
                            return BonDeSortie.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('bon-de-sortie', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('bon-de-sortie.delete', {
            parent: 'bon-de-sortie',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'bon-de-sortie/bon-de-sortie-delete-dialog.html',
                    controller: 'BonDeSortieDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['BonDeSortie', function(BonDeSortie) {
                            return BonDeSortie.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('bon-de-sortie', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
