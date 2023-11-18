(function () {
    'use strict';

    angular
            .module('app')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('categorie', {
            parent: 'app',
            url: '/categorie',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.categorie.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'categorie/categories.html',
                    controller: 'CategorieController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('categorie');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
            }
        })
        .state('categorie-detail', {
            parent: 'app',
            url: '/categorie/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.categorie.detail.title'
            },
            views: {
                '@app': {
                    templateUrl: 'categorie/categorie-detail.html',
                    controller: 'CategorieDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('categorie');
                        return $translate.refresh();
                    }],
                entity: ['$stateParams', 'Categorie', function ($stateParams, Categorie) {
                        return Categorie.get({id: $stateParams.id});
                    }]
            }
        })
        .state('categorie.new', {
            parent: 'categorie',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'categorie/categorie-dialog.html',
                    controller: 'CategorieDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nomCategorie: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function () {
                    $state.go('categorie', null, {reload: true});
                }, function () {
                    $state.go('categorie');
                });
            }]
        })
        .state('categorie.edit', {
            parent: 'categorie',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'categorie/categorie-dialog.html',
                    controller: 'CategorieDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Categorie', function (Categorie) {
                                return Categorie.get({id: $stateParams.id});
                            }]
                    }
                }).result.then(function () {
                    $state.go('categorie', null, {reload: true});
                }, function () {
                    $state.go('^');
                });
            }]
        })
        .state('categorie.delete', {
            parent: 'categorie',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'categorie/categorie-delete-dialog.html',
                        controller: 'CategorieDeleteController',
                        controllerAs: 'vm',
                        size: 'md',
                        resolve: {
                            entity: ['Categorie', function (Categorie) {
                                    return Categorie.get({id: $stateParams.id});
                                }]
                        }
                    }).result.then(function () {
                        $state.go('categorie', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    });
                }]
        });
    }

})();
