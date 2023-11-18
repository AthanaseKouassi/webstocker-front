(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('fabricant', {
            parent: 'app',
            url: '/fabricant',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.fabricant.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'fabricant/fabricants.html',
                    controller: 'FabricantController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fabricant');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('fabricant-detail', {
            parent: 'app',
            url: '/fabricant/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.fabricant.detail.title'
            },
            views: {
                '@app': {
                    templateUrl: 'fabricant/fabricant-detail.html',
                    controller: 'FabricantDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fabricant');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Fabricant', function($stateParams, Fabricant) {
                    return Fabricant.get({id : $stateParams.id});
                }]
            }
        })
        .state('fabricant.new', {
            parent: 'fabricant',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'fabricant/fabricant-dialog.html',
                    controller: 'FabricantDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nomFabricant: null,
                                paysFabricant: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('fabricant', null, { reload: true });
                }, function() {
                    $state.go('fabricant');
                });
            }]
        })
        .state('fabricant.edit', {
            parent: 'fabricant',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'fabricant/fabricant-dialog.html',
                    controller: 'FabricantDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Fabricant', function(Fabricant) {
                            return Fabricant.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('fabricant', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('fabricant.delete', {
            parent: 'fabricant',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'fabricant/fabricant-delete-dialog.html',
                    controller: 'FabricantDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Fabricant', function(Fabricant) {
                            return Fabricant.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('fabricant', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
