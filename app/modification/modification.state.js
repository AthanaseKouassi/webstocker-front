(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
//        .state('bondesortie-vente', {
//            parent: 'app',
////            url: '/bondesortie-vente',
//            data: {
//                authorities: ['ROLE_USER'],
//                pageTitle: 'modification vente'
//            },
//            views: {
//                '@app': {
//                    templateUrl: 'modification/bondesortie-vente.html',
//                    controller: 'BonDeSortieVenteController',
//                    controllerAs: 'vm'
//                }
//            }
//        });
//        .state('bondesortie-transfert', {
//            parent: 'app',
//            url: '/bondesortie-transfert',
//            data: {
//                authorities: ['ROLE_USER'],
//                pageTitle: 'modification transfert'
//            },
//            views: {
//                '@app': {
//                    templateUrl: 'modification/bondesortie-transfert.html',
//                    controller: 'BonDeSortieTransfertController',
//                    controllerAs: 'vm'
//                }
//            }
//           
//        })
//        .state('bondesortie-promotion', {
//            parent: 'app',
//            url: '/bondesortie-promotion',
//            data: {
//                authorities: ['ROLE_USER'],
//                pageTitle: 'modification promotion'
//            },
//            views: {
//                '@app': {
//                    templateUrl: 'modification/bondesortie-promotion.html',
//                    controller: 'BonDeSortiePromotionController',
//                    controllerAs: 'vm'
//                }
//            }
//            
//        });
    }

})();
