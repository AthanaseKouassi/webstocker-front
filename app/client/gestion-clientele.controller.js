(function () {
    'use strict';

    angular
            .module('app')
            .controller('GestionClientelleControlleur', GestionClientelleControlleur);

    GestionClientelleControlleur.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'entity', 'Client', 'DateUtils', 'FrequenceAchatService', 'Categorieclient', 'ChiffreAffaireCategorieClientService','API_URL'];

    function GestionClientelleControlleur($rootScope, $scope, $state, $stateParams, entity, Client, DateUtils, FrequenceAchatService, Categorieclient, ChiffreAffaireCategorieClientService, API_URL) {
        var vm = this;
        vm.rapportData = entity;
        vm.clients = Client.query();
        vm.categorieclients = Categorieclient.query();
        vm.client = null;
        vm.pdfContent = null;

//        vm.facture = Facture.query();        
//        vm.reglement = Reglement.query();

//        vm.load = function(id) {
//            Localite.get({id : id}, function(result) {
//                vm.localite = result;
//            });
//        };
        $scope.chiffreAffaireUnClientUrl = 'client/chiffre-affaire-un-client.html';
        $scope.frequenceAchatUrl = 'client/frequence-achat.html';
        $scope.chiffreAffaireTypeClientUrl = 'client/chiffre-affaire-typeclient.html';

        $scope.formGestionClient = [
            {
                "id": 1,
                "urlTemplate": "client/frequence-achat.html"
            },
            {
                "id": 2,
                "urlTemplate": ""
            },
            {
                "id": 3,
                "urlTemplate": ""
            },
            {
                "id": 4,
                "urlTemplate": ""
            },
            {
                "id": 5,
                "urlTemplate": ""
            },
            {
                "id": 6,
                "urlTemplate": ""
            }
        ];

        $scope.valeurUrlTemplate = $scope.formGestionClient;
        $scope.valeurClick = $scope.valeurUrlTemplate.id;

        $scope.choixTemplate = function () {
            if ($scope.valeurClick === 1) {
                console.log($scope.valeurClick);
            }
        };

        vm.afficherListeClientCategorie = function () {
            console.log("imprimer les client");
            vm.pdfContent = API_URL+'api/report/clients/liste';
            $rootScope.listeCategorieCleintUrl = API_URL+'api/report/clients/liste';
            
//            vm.pdfContent = 'http://83.166.138.228:8080/api/report/clients/liste';
//            $rootScope.listeCategorieCleintUrl = 'http://83.166.138.228:8080/api/report/clients/liste';
            
            
//            vm.pdfContent = 'http://localhost:8080/api/report/clients/liste';
//            $rootScope.listeCategorieCleintUrl = 'http://localhost:8080/api/report/clients/liste';
            console.log('url finale ' + $rootScope.listeCategorieCleintUrl);
            $state.go('liste-client-categorie');
        };


        vm.afficherChiffreAffaireUnClient = function () {
            console.log("***********************************************************");
            console.log("imprimer le chiffre d'affaire d'un client");
            console.log(vm.rapportData);
            console.log("*************************************************************");
            var d = DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode);
            console.log("oohh la date " + d);
//           vm.pdfContent =  'http://localhost:8080/api/report/lignebondesorties/chiffreaffaireunclient/vm.rapportData.client.nomClient/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
//           $rootScope.chiffreUnClientURL =  'http://localhost:8080/api/report/lignebondesorties/chiffreaffaireunclient/'+vm.rapportData.client.nomClient+'/'+DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode)+'/'+DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            
//            vm.pdfContent = 'http://83.166.138.228:8080/api/report/lignebondesorties/chiffreaffaireunclient/vm.rapportData.client.nomClient/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
//            $rootScope.chiffreUnClientURL = 'http://83.166.138.228:8080/api/report/lignebondesorties/chiffreaffaireunclient/' + vm.rapportData.client.nomClient + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            
            vm.pdfContent = API_URL+'api/report/lignebondesorties/chiffreaffaireunclient/vm.rapportData.client.nomClient/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
            $rootScope.chiffreUnClientURL = API_URL+'api/report/lignebondesorties/chiffreaffaireunclient/' + vm.rapportData.client.nomClient + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            console.log('url finale ' + $rootScope.chiffreUnClientURL);
            $state.go('chiffre-affaire-du-client');
        };


        vm.afficherFrequenceAchat = function () {
            console.log("fréquence achat ***** ");
//            vm.pdfContent = 'http://localhost:8080/api/report/clients/frequenceAchat/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
//            $rootScope.frequenceAchatUrl = 'http://localhost:8080/api/report/clients/frequenceAchat/'+DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode)+'/'+ DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
           
            
//            vm.pdfContent = 'http://83.166.138.228:8080/api/report/clients/frequenceAchat/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
//            $rootScope.frequenceAchatUrl = 'http://83.166.138.228:8080/api/report/clients/frequenceAchat/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            
            vm.pdfContent = API_URL+'api/report/clients/frequenceAchat/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
            $rootScope.frequenceAchatUrl = API_URL+'api/report/clients/frequenceAchat/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            console.log('url finale ' + $rootScope.frequenceAchatUrl);
            $state.go('frequence-achat-pdf');
        };

        vm.chiffreAffaireTypeClient = function () {
            console.log("le chiffre d'affaire par type de client ***** ");
//           vm.pdfContent = 'http://localhost:8080/api/report/clients/chiffreaffairetypeclient/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
//         $rootScope.chiffreAffaireTypeClientUrl = 'http://localhost:8080/api/report/clients/chiffreaffairetypeclient/'+DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode)+'/'+ DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
        
//            vm.pdfContent = 'http://83.166.138.228:8080/api/report/clients/chiffreaffairetypeclient/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
//            $rootScope.chiffreAffaireTypeClientUrl = 'http://83.166.138.228:8080/api/report/clients/chiffreaffairetypeclient/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
           
            vm.pdfContent = API_URL+'api/report/clients/chiffreaffairetypeclient/vm.rapportData.dateDebutPeriode/vm.rapportData.dateFinPeriode';
            $rootScope.chiffreAffaireTypeClientUrl = API_URL+'api/report/clients/chiffreaffairetypeclient/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateDebutPeriode) + '/' + DateUtils.convertLocalDateToServer(vm.rapportData.dateFinPeriode);
            console.log('url finale ' + $rootScope.chiffreAffaireTypeClientUrl);
            $state.go('chiffre-affaire-typeclient-pdf');
        };



        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateDebutMois = false;
        vm.datePickerOpenStatus.dateFinMois = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };

//        var onSaveSuccess = function (result) {
//            $scope.$emit('webstockerApp:localiteUpdate', result);
//            $uibModalInstance.close(result);
//            vm.isSaving = false;
//        };
//
//        var onSaveError = function () {
//            vm.isSaving = false;
//        };

//        vm.save = function () {
//            vm.isSaving = true;
//            if (vm.localite.id !== null) {
//                Localite.update(vm.localite, onSaveSuccess, onSaveError);
//            } else {
//                Localite.save(vm.localite, onSaveSuccess, onSaveError);
//            }
//        };
//
//        vm.clear = function() {
//            $uibModalInstance.dismiss('cancel');
//        };
    }
})();
