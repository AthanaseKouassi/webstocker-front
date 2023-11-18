(function () {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('stock-magasin', {
                parent: 'app',
                url: '/stock-magasin',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'webstockerApp.magasin.home.title'
                },
                views: {
                    '@app': {
                        templateUrl: 'rapport-stock/stock-magasin.html',
                        controller: 'StockMagasinController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {

                    entity : function () {
                        return {
                            typeSortie: null,
                            magasin: null,
                            produit: null,
                            dateDebutPeriode: null,
                            dateFinPeriode: null
                        };
                    },
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('magasin');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
                        
            .state('rapport-stock', {
                parent: 'app',
                url: '/rapport-stock',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'rapport-stock'
                },
                views: {
                    '@app': {
                        templateUrl: 'rapport-stock/rapport-stock-pdf.html'
                        // controller: 'VenteClientController',
                        // controllerAs: 'vm'
                    }
                }
            });
    }

})();

