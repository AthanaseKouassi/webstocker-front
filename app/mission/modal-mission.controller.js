(function () {
    'use strict';

    angular
            .module('app')
            .controller('ModalMissionController', ModalMissionController)
            .value('URL_MISSION_DETAILS', 'api/missions/');
//            .value('URL_MISSION_DETAILS', 'http://83.166.138.228:8080/api/missions/');
//            .value('URL_MISSION_DETAILS', 'http://localhost:8080/api/missions/');

    ModalMissionController.$inject = ['$scope','object', 'FetchData', 'URL_MISSION_DETAILS', '$uibModalInstance','API_URL'];

    function ModalMissionController($scope,object,FetchData, URL_MISSION_DETAILS, $uibModalInstance,API_URL) {
        $scope.mission = {};
        console.log(object);
        FetchData.getData(API_URL+URL_MISSION_DETAILS+ object).then(function (result) {
            console.log(result);
            $scope.mission = result.data;
        }, function (error) {
            alert('Erreur lors du chargement des données');
        });

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();



