(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('lignecommande', {
            parent: 'app',
            url: '/lignecommande',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.lignecommande.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'lignecommande/lignecommandes.html',
                    controller: 'LignecommandeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('lignecommande');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('lignecommande-detail', {
            parent: 'app',
            url: '/lignecommande/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.lignecommande.detail.title'
            },
            views: {
                '@app': {
                    templateUrl: 'lignecommande/lignecommande-detail.html',
                    controller: 'LignecommandeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('lignecommande');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Lignecommande', function($stateParams, Lignecommande) {
                    return Lignecommande.get({id : $stateParams.id});
                }]
            }
        })
        .state('lignecommande.new', {
            parent: 'lignecommande',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'lignecommande/lignecommande-dialog.html',
                    controller: 'LignecommandeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                dateFabrication: null,
                                quantiteLigneCommande: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('lignecommande', null, { reload: true });
                }, function() {
                    $state.go('lignecommande');
                });
            }]
        })
        .state('lignecommande.edit', {
            parent: 'lignecommande',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'lignecommande/lignecommande-dialog.html',
                    controller: 'LignecommandeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Lignecommande', function(Lignecommande) {
                            return Lignecommande.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('lignecommande', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('lignecommande.delete', {
            parent: 'lignecommande',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'lignecommande/lignecommande-delete-dialog.html',
                    controller: 'LignecommandeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Lignecommande', function(Lignecommande) {
                            return Lignecommande.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('lignecommande', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
