(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider

        .state('commande', {
            parent: 'app',
            url: '/commande',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.commande.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'commande/commandes.html',
                    controller: 'CommandeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: function () {
                    return {
                        dateCommande: null,
                        quantiteCommande: null,
                        prixAchat: null,
                        id: null
                    };
                },
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('commande');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })


            .state('commande.new', {
            parent: 'commande',
            url: '/new',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.commande.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'commande/commande_wizard.html',
                    controller: 'CommandeFournisseurController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: function () {
                    return {
                        dateCommande: null,
                        quantiteCommande: null,
                        prixAchat: null,
                        id: null
                    };
                },
                lignecommandeEntity: function () {
                    return {
                        dateFabrication: null,
                        quantiteLigneCommande: null,
                        id: null
                    };
                },
                commandeFournisseurEntity: function(){
                  return {
                      commande : null,
                      lignecommandes:null
                  } ;
                },
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('commande');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('rapport-commande', {
            parent: 'app',
            url: '/rapport-commande',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'rapport-commande'
            },
            views: {
                '@app': {
                    templateUrl: 'commande/rapport-commande-pdf.html'
//                    controller: 'CommandeDetailController',
//                    controllerAs: 'vm'
                }
            }
          })
        .state('commande-detail', {
            parent: 'app',
            url: '/commande/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.commande.detail.title'
            },
            views: {
                '@app': {
                    templateUrl: 'commande/commande-detail.html',
                    controller: 'CommandeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('commande');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Commande', function($stateParams, Commande) {
                    return Commande.get({id : $stateParams.id});
                }]
            }
        })
        // .state('commande.new', {
        //     parent: 'commande',
        //     url: '/new',
        //     data: {
        //         authorities: ['ROLE_USER']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'commande/commande-dialog.html',
        //             controller: 'CommandeDialogController',
        //             controllerAs: 'vm',
        //             backdrop: 'static',
        //             size: 'lg',
        //             resolve: {
        //                 entity: function () {
        //                     return {
        //                         dateCommande: null,
        //                         quantiteCommande: null,
        //                         prixAchat: null,
        //                         id: null
        //                     };
        //                 }
        //             }
        //         }).result.then(function() {
        //             $state.go('commande', null, { reload: true });
        //         }, function() {
        //             $state.go('commande');
        //         });
        //     }]
        // })
        .state('commande.edit', {
            parent: 'commande',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'commande/commande-dialog.html',
                    controller: 'CommandeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Commande', function(Commande) {
                            return Commande.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('commande', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('commande.delete', {
            parent: 'commande',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'commande/commande-delete-dialog.html',
                    controller: 'CommandeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Commande', function(Commande) {
                            return Commande.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('commande', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
