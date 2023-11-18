(function() {
    'use strict';

    var jhiAlert = {
        template: '<div class="alerts" ng-cloak="">' +
                        '<div ng-repeat="alert in $ctrl.alerts" ng-class="[alert.position, {\'toast\': alert.toast}]">' +
                            '<uib-alert ng-cloak="" type="{{alert.type}}" close="alert.close($ctrl.alerts)"><pre>{{ alert.msg }}</pre></uib-alert>' +
                        '</div>' +
                  '</div>',
        controller: jhiAlertController
    };

    angular
        .module('app')
        .component('jhiAlert', jhiAlert);

    jhiAlertController.$inject = ['$scope', 'AlertService','toaster'];

    function jhiAlertController($scope, AlertService,toaster) {
        var vm = this;

        vm.alerts = AlertService.get();

        for (var i = 0; i < vm.alerts.length; i++) {
            var alert = vm.alerts[i];
            toaster.pop(alert.type, alert.type, alert.msg);
        }

        $scope.$on('$destroy', function () {
            vm.alerts = [];
        });
    }
})();
