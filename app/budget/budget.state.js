(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('budget', {
            parent: 'app',
            url: '/budget',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.budget.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'budget/budgets.html',
                    controller: 'BudgetController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('budget');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('budget-detail', {
            parent: 'app',
            url: '/budget/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.budget.detail.title'
            },
            views: {
                '@app': {
                    templateUrl: 'budget/budget-detail.html',
                    controller: 'BudgetDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('budget');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Budget', function($stateParams, Budget) {
                    return Budget.get({id : $stateParams.id});
                }]
            }
        })
        .state('budget.new', {
            parent: 'budget',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'budget/budget-dialog.html',
                    controller: 'BudgetDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                montantBudget: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('budget', null, { reload: true });
                }, function() {
                    $state.go('budget');
                });
            }]
        })
        .state('budget.edit', {
            parent: 'budget',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'budget/budget-dialog.html',
                    controller: 'BudgetDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Budget', function(Budget) {
                            return Budget.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('budget', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('budget.delete', {
            parent: 'budget',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'budget/budget-delete-dialog.html',
                    controller: 'BudgetDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Budget', function(Budget) {
                            return Budget.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('budget', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
