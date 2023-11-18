(function () {
    'use strict';

    angular
            .module('app')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('objectifs_chart', {
                parent: 'app',
                url: '/objectifs_chart',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'webstockerApp.objectifs.home.title'
                },
                views: {
                    '@app': {
                        templateUrl: 'objectifs/objectifs_chart.html',
                        controller: 'ObjectifsChartController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('objectifs');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('objectifs_mise_a_jour', {
                parent: 'app',
                url: '/objectifs_mise_a_jour/{madate}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'webstockerApp.objectifs.home.title'
                },
                views: {
                    '@app': {
                        templateUrl: 'objectifs/objectifs_mise_a_jour.html',
                        controller: 'ObjectifMiseaJourController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('objectifs');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }],
                 entity: ['$stateParams','Objectifs', function ($stateParams, Objectifs) {
                        return Objectifs.query({id: $stateParams.id});
                        }]
                        
                }
            }).state('objectifs_mise_a_jour.edit', {
                parent: 'objectifs_mise_a_jour',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'objectifs/objectif_maj_dialog.html',
                        controller: 'ObjectifsMajDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            entity: ['Objectifs', function (ObjectifsTauxMAJ) {
                                    return ObjectifsTauxMAJ.get({id: $stateParams.id});
                                }]
                        }
                    }).result.then(function () {
                        $state.go('objectifs_mise_a_jour', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    });
                }]
            })
//            .state('objectifs-vente-journal', {
//                parent: 'app',
//                url: '/objectifs-vente-journal',
//                data: {
//                    authorities: ['ROLE_USER'],
//                    pageTitle: 'webstockerApp.objectifs.home.title'
//                },
//                views: {
//                    '@app': {
//                        templateUrl: 'objectifs/objectifs-vente-journal.html',
//                        controller: 'ObjectifVenteJournalController',
//                        controllerAs: 'vm'
//                    }
//                },
//                resolve: {
//                    entity: function () {
//                        return {
//                            dateDebut: null,
//                            dateFin: null,
//                            produit: null
////                            quantiteObtenu: null,
////                            taux: null,
////                            id: null
//                        };
//                    },
//                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                        $translatePartialLoader.addPart('objectifs');
//                        $translatePartialLoader.addPart('global');
//                        return $translate.refresh();
//                    }]
//                }
//            })
            .state('objectifs', {
                parent: 'app',
                url: '/objectifs',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'webstockerApp.objectifs.home.title'
                },
                views: {
                    '@app': {
                        templateUrl: 'objectifs/objectifs.html',
                        controller: 'ObjectifsController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('objectifs');
                            $translatePartialLoader.addPart('global');
                            return $translate.refresh();
                        }]
                }
            })
            .state('objectifs-detail', {
                parent: 'app',
                url: '/objectifs/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'webstockerApp.objectifs.detail.title'
                },
                views: {
                    '@app': {
                        templateUrl: 'objectifs/objectifs-detail.html',
                        controller: 'ObjectifsDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('objectifs');
                            return $translate.refresh();
                        }],
                    entity: ['$stateParams', 'Objectifs', function ($stateParams, Objectifs) {
                            return Objectifs.get({id: $stateParams.id});
                        }]
                }
            })
            .state('objectifs.new', {
                parent: 'objectifs',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'objectifs/objectifs-dialog.html',
                        controller: 'ObjectifsDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    periode: null,
                                    quantiteAttendue: null,
                                    quantiteObtenu: null,
                                    taux: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function () {
                        $state.go('objectifs', null, {reload: true});
                    }, function () {
                        $state.go('objectifs');
                    });
                }]
            })
            .state('objectifs.edit', {
                parent: 'objectifs',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'objectifs/objectifs-dialog.html',
                        controller: 'ObjectifsDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            entity: ['Objectifs', function (Objectifs) {
                                    return Objectifs.get({id: $stateParams.id});
                                }]
                        }
                    }).result.then(function () {
                        $state.go('objectifs', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    });
                }]
            })
            .state('objectifs.delete', {
                parent: 'objectifs',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'objectifs/objectifs-delete-dialog.html',
                        controller: 'ObjectifsDeleteController',
                        controllerAs: 'vm',
                        size: 'md',
                        resolve: {
                            entity: ['Objectifs', function (Objectifs) {
                                    return Objectifs.get({id: $stateParams.id});
                                }]
                        }
                    }).result.then(function () {
                        $state.go('objectifs', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    });
                }]
            });
    }

})();
