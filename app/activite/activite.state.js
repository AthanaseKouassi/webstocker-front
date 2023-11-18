(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig); 

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('activite', {
            parent: 'app', 
            url: '/activite?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.activite.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'activite/activites.html',
                    controller: 'ActiviteController',
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
                    $translatePartialLoader.addPart('activite');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('activite-detail', {
            parent: 'app',
            url: '/activite/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.activite.detail.title'
            },
            views: {
                '@app': {
                    templateUrl: 'activite/activite-detail.html',
                    controller: 'ActiviteDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('activite');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Activite', function($stateParams, Activite) {
                    return Activite.get({id : $stateParams.id});
                }]
            }
        })
        .state('activite.new', {
            parent: 'activite',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'activite/activite-dialog.html',
                    controller: 'ActiviteDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nomActivite: null,
                                descriptionActivite: null,
                                resultatAttendu: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('activite', null, { reload: true });
                }, function() {
                    $state.go('activite');
                });
            }]
        })
        .state('activite.edit', {
            parent: 'activite',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'activite/activite-dialog.html',
                    controller: 'ActiviteDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Activite', function(Activite) {
                            return Activite.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('activite', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('activite.delete', {
            parent: 'activite',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'activite/activite-delete-dialog.html',
                    controller: 'ActiviteDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Activite', function(Activite) {
                            return Activite.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('activite', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('choix-activite', {
            parent: 'app',
            url: '/choix-activite',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.activite.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'activite/choix-activite.html',
                    controller: 'ChoixActiviteController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                 entity : function(){
                        return{                           
                            dateDebutPeriode : null,
                            dateFinPeriode : null                            
                        };
                    },
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('activite');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]               
            }
        })
        .state('rapport-delegues-pdf', {
            parent: 'app',
            url: '/rapport-delegues-pdf',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'rapport-delegues-pdf'
            },
            views: {
                '@app': {
                    templateUrl: 'activite/rapport-delegues-pdf.html'                    
                }
            }
        })
        
        .state('rapport-delegues', {
                parent: 'app',
                url: '/rapport-delegues',
                data: {
                    authorities: ['ROLE_USER'],
                    pagetitle: 'rapport-delegues'
                },
                views: {
                    '@app': {
                        templateUrl: 'activite/rapport-delegues.html',
                        controller: 'RapportDelegueController',
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
            });
        
   //     ;
    }

})();
