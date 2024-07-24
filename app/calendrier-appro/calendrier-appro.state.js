(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('calendrier-appro', {
            parent: 'app',
            url: '/calendrier-appro',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Calendrier approvisionnement'
            },
            views: {
                '@app': {
                    templateUrl: 'calendrier-appro/calendrier-appro.html',
                    controller: 'CalendrierApproController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    // $translatePartialLoader.addPart('calendrier-appro');
                    // $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('calendrier-appro-form', {
            parent: 'app',
            url: '/calendrier-appro-form/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Calendrier approvisionnement form'
            },
            views: {
                '@app': {
                    templateUrl: 'calendrier-appro/calendrier-appro-form.html',
                    controller: 'CalendrierApproControllerForm',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    // $translatePartialLoader.addPart('calendrier-appro');
                    // $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        // .state('lignefacture-detail', {
        //     parent: 'app',
        //     url: '/lignefacture/{id}',
        //     data: {
        //         authorities: ['ROLE_USER'],
        //         pageTitle: 'webstockerApp.lignefacture.detail.title'
        //     },
        //     views: {
        //         '@app': {
        //             templateUrl: 'lignefacture/lignefacture-detail.html',
        //             controller: 'LignefactureDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
        //             $translatePartialLoader.addPart('lignefacture');
        //             return $translate.refresh();
        //         }],
        //         entity: ['$stateParams', 'Lignefacture', function($stateParams, Lignefacture) {
        //             return Lignefacture.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        // .state('lignefacture.new', {
        //     parent: 'lignefacture',
        //     url: '/new',
        //     data: {
        //         authorities: ['ROLE_USER']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'lignefacture/lignefacture-dialog.html',
        //             controller: 'LignefactureDialogController',
        //             controllerAs: 'vm',
        //             backdrop: 'static',
        //             size: 'lg',
        //             resolve: {
        //                 entity: function () {
        //                     return {
        //                         quantiteFacture: null,
        //                         id: null
        //                     };
        //                 }
        //             }
        //         }).result.then(function() {
        //             $state.go('lignefacture', null, { reload: true });
        //         }, function() {
        //             $state.go('lignefacture');
        //         });
        //     }]
        // })
        // .state('lignefacture.edit', {
        //     parent: 'lignefacture',
        //     url: '/{id}/edit',
        //     data: {
        //         authorities: ['ROLE_USER']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'lignefacture/lignefacture-dialog.html',
        //             controller: 'LignefactureDialogController',
        //             controllerAs: 'vm',
        //             backdrop: 'static',
        //             size: 'lg',
        //             resolve: {
        //                 entity: ['Lignefacture', function(Lignefacture) {
        //                     return Lignefacture.get({id : $stateParams.id});
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('lignefacture', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        // .state('lignefacture.delete', {
        //     parent: 'lignefacture',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_USER']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'lignefacture/lignefacture-delete-dialog.html',
        //             controller: 'LignefactureDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['Lignefacture', function(Lignefacture) {
        //                     return Lignefacture.get({id : $stateParams.id});
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('lignefacture', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // });
    }

})();
