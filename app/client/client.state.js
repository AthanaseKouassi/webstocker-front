(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('creance-client', {
            parent: 'gestion-clientelle',
            url: '/creance-client',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.client.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'client/creance-client.html',
                    controller: 'CreanceClientController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('client');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('chiffre-affaire-un-client', {
            parent: 'gestion-clientelle',
            url: '/chiffre-affaire-un-client',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.client.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'client/chiffre-affaire-un-client.html',
                    controller: 'ChiffreAffaireUnClientController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('client');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('fiche-client', {
            parent: 'app',
            url: '/fiche-client',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.client.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'client/fiche-client.html',
                    controller: 'FicheClientController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('client');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('frequence-achat', {
            parent: 'app',
            url: '/frequence-achat',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.client.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'client/frequence-achat.html',
                    controller: 'FrequenceAchatController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('client');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('chiffre-affaire-typeclient', {
            parent: 'app',
            url: '/chiffre-affaire-typeclient',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.client.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'client/chiffre-affaire-typeclient.html',
                    controller: 'ChiffreAffaireTypeClientController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('client');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('gestion-clientelle', {
            parent: 'app',
            url: '/gestion-clientelle',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.client.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'client/gestion-clientelle.html',
                    controller: 'GestionClientelleControlleur',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity : function(){
                    return  {
                        categorieclient : null,
                        client : null,
                        dateDeputPeriode : null,
                        dateFinPeriode : null                        
                    };
                },
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('client');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('chiffre-affaire-du-client', {
            parent: 'app',
            url: '/chiffre-affaire-du-client',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'chiffre-affaire-du-client'
            },
            views: {
                '@app': {
                    templateUrl: 'client/chiffre-affaire-un-client-pdf.html'                  
                }
            }
        })
            
        .state('client', {
            parent: 'app',
            url: '/client',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.client.home.title'
            },
            views: {
                '@app': {
                    templateUrl: 'client/clients.html',
                    controller: 'ClientController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('client');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('client-detail', {
            parent: 'app',
            url: '/client/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'webstockerApp.client.detail.title'
            },
            views: {
                '@app': {
                    templateUrl: 'client/client-detail.html',
                    controller: 'ClientDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('client');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Client', function($stateParams, Client) {
                    return Client.get({id : $stateParams.id});
                }]
            }
        })
        .state('client.new', {
            parent: 'client',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'client/client-dialog.html',
                    controller: 'ClientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nomClient: null,
                                telephoneClient: null,
                                boitepostale: null,
                                localiteClient: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('client', null, { reload: true });
                }, function() {
                    $state.go('client');
                });
            }]
        })
        .state('client.edit', {
            parent: 'client',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'client/client-dialog.html',
                    controller: 'ClientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Client', function(Client) {
                            return Client.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('client', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('client.delete', {
            parent: 'client',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'client/client-delete-dialog.html',
                    controller: 'ClientDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Client', function(Client) {
                            return Client.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('client', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('liste-client-categorie', {
            parent: 'app',
            url: '/liste-client-categorie',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'liste-client-categorie'
            },
            views: {
                '@app': {
                    templateUrl: 'client/liste-client-categorie-pdf.html'                    
                }
            }
        })
        .state('chiffre-affaire-typeclient-pdf', {
            parent: 'app',
            url: '/chiffre-affaire-typeclient-pdf',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'chiffre-affaire-typeclient-pdf'
            },
            views: {
                '@app': {
                    templateUrl: 'client/chiffre-affaire-typeclient-pdf.html'                    
                }
            }
        })
        .state('frequence-achat-pdf', {
            parent: 'app',
            url: '/frequence-achat-pdf',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'frequence-achat-pdf'
            },
            views: {
                '@app': {
                    templateUrl: 'client/frequence-achat-pdf.html'                    
                }
            }
        });
    }

})();
