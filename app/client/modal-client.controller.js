(function() {
    'use strict';

    angular
        .module('app')
        .controller('ModalClientController', ModalClientController)
        .value('URL_CLIENT_DETAILS','api/facture-client-detail')
        .value('URL_FACTURE_NREG','api/factures-non-reglees')
        .value('URL_ALL_FACTURE_CLIENT','api/all-factures-client');

//        .value('URL_CLIENT_DETAILS','http://83.166.138.228:8080/api/facture-client-detail')
//        .value('URL_FACTURE_NREG','http://83.166.138.228:8080/api/factures-non-reglees')
//        .value('URL_ALL_FACTURE_CLIENT','http://83.166.138.228:8080/api/all-factures-client');
//        
//        .value('URL_CLIENT_DETAILS','http://localhost:8080/api/facture-client-detail')
//        .value('URL_FACTURE_NREG','http://localhost:8080/api/factures-non-reglees')
//        .value('URL_ALL_FACTURE_CLIENT','http://localhost:8080/api/all-factures-client');

    ModalClientController.$inject = ['$scope', '$state','object','FetchData','URL_CLIENT_DETAILS','URL_FACTURE_NREG','URL_ALL_FACTURE_CLIENT','$uibModalInstance','API_URL'];

    function ModalClientController ($scope, $state,object,FetchData,URL_CLIENT_DETAILS,URL_FACTURE_NREG,URL_ALL_FACTURE_CLIENT,$uibModalInstance,API_URL) {
        console.log(object);
        $scope.client={};
        $scope.facturesNonReglees = [];
        $scope.AllFacturesClient = [];
        FetchData.getData(API_URL+URL_CLIENT_DETAILS+'?id='+object).then(function(result){
            console.log(result);
            $scope.client = result.data;
        },function(error){
           alert('Erreur lors du chargement des données');
        });
        $scope.totalFacturesNonReglees = 0;
        $scope.totalFacturesClient = 0;
        $scope.loadFacturesNonReglees = function(id){
            FetchData.getData(API_URL + URL_FACTURE_NREG+'?id='+object).then(function(result){
            console.log(result);
            $scope.facturesNonReglees = result.data;
            $scope.totalFacturesNonReglees = $scope.getTotalFactures($scope.facturesNonReglees);
        },function(error){
           alert('Erreur lors du chargement des données');
        });
      };
      $scope.getTotalFactures = function(tabFacture){
       var total = 0;
       var tab = tabFacture;
       if(tab.length<0)return;
       for(var i = 0; i < tab.length; i++){
           console.log(tab[i].length);
           for(var j=0;j<tab[i].length;j++){
               if(j===3){
                  total += parseInt(tab[i][j]);
               }
           }
       }
      return total;
    };
    $scope.cancel= function(){
        //ModalClientService.cancel();
        $uibModalInstance.dismiss('cancel');
    };
      $scope.loadAllFacturesClient = function(id){
            FetchData.getData(API_URL + URL_ALL_FACTURE_CLIENT+'?id='+object).then(function(result){
            console.log(result);
            $scope.AllFacturesClient = result.data;
            $scope.totalFacturesClient = $scope.getTotalFactures($scope.AllFacturesClient);
        },function(error){
           alert('Erreur lors du chargement des données');
        });
      };
    }
})();



