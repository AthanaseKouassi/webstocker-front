(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('prix', {
            parent: 'app',
            url: '/prix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.prix.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'prix/prixes.html',
                    controller: 'PrixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('prix');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('prix-detail', {
            parent: 'app',
            url: '/prix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.prix.detail.title'
            },
            views: {
                '@app': {
                    templateUrl: 'prix/prix-detail.html',
                    controller: 'PrixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('prix');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Prix', function($stateParams, Prix) {
                    return Prix.get({id : $stateParams.id});
                }]
            }
        })
        .state('prix.new', {
            parent: 'prix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'prix/prix-dialog.html',
                    controller: 'PrixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                prixUnitaire: null,
                                dateFixation: null,
                                actif: false,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('prix', null, { reload: true });
                }, function() {
                    $state.go('prix');
                });
            }]
        })
        .state('prix.edit', {
            parent: 'prix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'prix/prix-dialog.html',
                    controller: 'PrixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Prix', function(Prix) {
                            return Prix.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('prix', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('prix.delete', {
            parent: 'prix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'prix/prix-delete-dialog.html',
                    controller: 'PrixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Prix', function(Prix) {
                            return Prix.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('prix', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
