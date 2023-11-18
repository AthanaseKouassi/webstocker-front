(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('conditionnement', {
            parent: 'app',
            url: '/conditionnement',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.conditionnement.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'conditionnement/conditionnements.html',
                    controller: 'ConditionnementController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('conditionnement');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('conditionnement-detail', {
            parent: 'app',
            url: '/conditionnement/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.conditionnement.detail.title'
            },
            views: {
                '@app': {
                    templateUrl: 'conditionnement/conditionnement-detail.html',
                    controller: 'ConditionnementDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('conditionnement');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Conditionnement', function($stateParams, Conditionnement) {
                    return Conditionnement.get({id : $stateParams.id});
                }]
            }
        })
        .state('conditionnement.new', {
            parent: 'conditionnement',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'conditionnement/conditionnement-dialog.html',
                    controller: 'ConditionnementDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                libelle: null,
                                descriptionCond: null,
                                capaciteCarton: null,
                                capaciteCartouche: null,
                                capaciteEtui: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('conditionnement', null, { reload: true });
                }, function() {
                    $state.go('conditionnement');
                });
            }]
        })
        .state('conditionnement.edit', {
            parent: 'conditionnement',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'conditionnement/conditionnement-dialog.html',
                    controller: 'ConditionnementDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Conditionnement', function(Conditionnement) {
                            return Conditionnement.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('conditionnement', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('conditionnement.delete', {
            parent: 'conditionnement',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'conditionnement/conditionnement-delete-dialog.html',
                    controller: 'ConditionnementDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Conditionnement', function(Conditionnement) {
                            return Conditionnement.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('conditionnement', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
