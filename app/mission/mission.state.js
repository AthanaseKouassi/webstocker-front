(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('mission', {
            parent: 'app',
            url: '/mission?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.mission.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'mission/missions.html',
                    controller: 'MissionController',
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
                    $translatePartialLoader.addPart('mission');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('mission-detail', {
            parent: 'app',
            url: '/mission/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.mission.detail.title'
            },
            views: {
                '@app': {
                    templateUrl: 'mission/mission-detail.html',
                    controller: 'MissionDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('mission');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Mission', function($stateParams, Mission) {
                    return Mission.get({id : $stateParams.id});
                }]
            }
        })
        .state('mission.new', {
            parent: 'mission',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'mission/mission-dialog.html',
                    controller: 'MissionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                libelle: null,
                                dateDebut: null,
                                dateFin: null,
                                objectifGeneral: null,
                                objectifSpecifique: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('mission', null, { reload: true });
                }, function() {
                    $state.go('mission');
                });
            }]
        })
        .state('mission.edit', {
            parent: 'mission',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'mission/mission-dialog.html',
                    controller: 'MissionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Mission', function(Mission) {
                            return Mission.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('mission', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('mission.delete', {
            parent: 'mission',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'mission/mission-delete-dialog.html',
                    controller: 'MissionDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Mission', function(Mission) {
                            return Mission.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('mission', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('mission_list', {
            parent: 'mission',
            url: '/mission_list',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.mission.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'mission/mission_list.html',
                    controller: 'MissionControllerList',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('mission');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('mission_wizard', {
            parent: 'mission',
            url: '/mission_wizard',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.mission.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'mission/mission_wizard.html',
                    controller: 'MissionController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('mission');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                  entity: function () {
                            return {
                                libelle: null,
                                dateDebut: null,
                                dateFin: null,
                                objectifGeneral: null,
                                objectifSpecifique: null,
                                localite:null,
                                id: null
                            };
                   },
                   ligneactiviteEntity:function(){
                        return {
                            activite: null
                        };
                    },
                   lignebudgetEntity: function () {
                        return {
                            budget: null
                        };
                    },
                    MissionEntity: function () {
                        return {
                            mission: null,
                            ligneMissionActivites: null,
                            ligneBudgets: null
                        };
                    }
            }
        })
        .state('rapport-mission', {
            parent: 'app',
            url: '/rapport-mission',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Rapport de mission'
            },
            views: {
                '@app': {
                    templateUrl: 'mission/rapport-mission.html',
                    controller: 'RapportMissionController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('mission');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('resultat-obtenu', {
            parent: 'rapport-mission',
            url: '/resultat-obtenu',
            data: {
                authorities: ['ROLE_USER']
                
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'mission/resultat-obtenu.html',
                    controller: 'ResultatObtenuController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Mission', function(Mission) {
                            return Mission.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('rapport-mission', null, { reload: true });
                }, function() {
                    $state.go('rapport-mission');
                });
            }]
        });
    }

})();
