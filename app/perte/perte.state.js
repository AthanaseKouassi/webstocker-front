(function () {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {


        $stateProvider
           
            .state('perte-produit', {
                parent: 'app',
                url: '/perte-produit',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'perte-produit'
                },
                views: {
                    '@app': {
                        templateUrl: 'perte/perte_produit.html',
                        controller: 'PerteClientController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: function () {
                        return {
                            numero: null,
                            daateCreation: null,
                            typeSortie: null,
                            typeVente: null,
                            id: null
                        };
                    },
                    lignecommandeEntity: function () {
                        return {
                            produit: null,
                            prixVente: null,
                            quantite: null,
                            id: null
                        };
                    },
                    venteClientEntity: function () {
                        return {
                            bonDeSortie: null,
                            ligneBonDeSorties: null
                        };
                    },
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('livraison');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })

            .state('perte-produit-report', {
                parent: 'app',
                url: '/perte-produit-report',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'perte-produit'
                },
                views: {
                    '@app': {
                        templateUrl: 'perte/perte_produit_rapport.html',
                        controller: 'PrintController'
                    }
                }
            })
            .state('perte_facture_zero', {
                parent: 'app',
                url: '/perte_facture_zero',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'perte_facture_zero'
                },
                views: {
                    '@app': {
                        templateUrl: 'perte/perte_rapport_facture_zero.html',
                        //controller : 'PerteProduitFactureZeroController'
                        
                    }
                }
            });
    }

})();
