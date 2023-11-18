(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('jhi-tracker', {
            parent: 'app',
            url: '/tracker',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'tracker.title'
            },
            views: {
                '@app': {
                    templateUrl: 'admin/tracker/tracker.html',
                    controller: 'JhiTrackerController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('tracker');
                    return $translate.refresh();
                }]
            },
            onEnter: function(JhiTrackerService) {
                JhiTrackerService.subscribe();
            },
            onExit: function(JhiTrackerService) {
                JhiTrackerService.unsubscribe();
            }
        });
    }
})();
