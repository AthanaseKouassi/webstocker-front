(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
    
//        .state('bondesortie-transfert', {
//            parent: 'app',
//            url: '/bondesortie-transfert',
//            data: {
//                authorities: ['ROLE_USER'],
//                pageTitle: 'modification transfert'
//            },
//            views: {
//                '@app': {
//                    templateUrl: 'modification-transfert/bondesortie-transfert.html',
//                    controller: 'BonDeSortieTransfertController',
//                    controllerAs: 'vm'
//                }
//            }
//           
//        })
//        .state('transfert-produit.edit', {
//            parent: 'app',
//            url: '/{id}/edit',
//            data: {
//                authorities: ['ROLE_USER']
//            },
//             views: {
//                    '@app': {
//                        templateUrl: 'transfert/transfert_produit.html',
//                        controller: 'TransfertClientController',
//                        controllerAs: 'vm'
//                    }
//                },
//                resolve: {
//                        entity: ['BonDeSortie', function(BonDeSortie) {
//                            return BonDeSortie.get({id : $stateParams.id});
//                        }]
//                }
//                    }).result.then(function() {
//                    $state.go('transfert-produit', null, { reload: true });
//                }, function() {
//                    $state.go('transfert-produit');
//                });
                
        }
      
})();
