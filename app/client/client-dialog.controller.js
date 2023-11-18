(function () {
    'use strict';

    angular
            .module('app')
            .controller('ClientDialogController', ClientDialogController)
            .value('URL_TROUVER_CLIENT', 'api/clients/clientparNometTelephone')
            .value('URL_UN_CLIENT_PAR_NOMCLIENT', 'api/clients/retrouver-un-client/');

    ClientDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Client', 'Categorieclient', 'Facture', 'Localite', 'FetchData', 'URL_TROUVER_CLIENT','API_URL','Commune','URL_UN_CLIENT_PAR_NOMCLIENT','SweetAlert'];

    function ClientDialogController($scope, $stateParams, $uibModalInstance, entity, Client, Categorieclient, Facture, Localite, FetchData, URL_TROUVER_CLIENT,API_URL,Commune,URL_UN_CLIENT_PAR_NOMCLIENT,SweetAlert) {
        var vm = this;
        vm.client = entity;
        vm.categorieclients = Categorieclient.query();
        vm.factures = Facture.query();
        vm.localites = Localite.query();
        vm.communes = Commune.query();
        vm.donnees = {};
        vm.load = function (id) {
            Client.get({id: id}, function (result) {
                vm.client = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:clientUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        
        vm.rechercher = function () {            
            FetchData.getData(API_URL+URL_TROUVER_CLIENT+'?nomclient='+vm.client.nomClient+'&telephoneClient='+vm.client.telephoneClient).then(function (result) {
                console.log(result);
                vm.donnees = result.data;
                console.log('DONNEES TROUVER ' + vm.donnees.nomClient+' et '+vm.donnees.telephoneClient);
//                if (vm.donnees.nomCategorie!=null){
                if ((angular.lowercase(vm.donnees.nomClient) === angular.lowercase(vm.client.nomClient))&&(vm.donnees.telephoneClient === vm.client.telephoneClient)) {
                    alert("Attention, cette information existe déjà!");
                }
//                else {
//                    vm.save();
//                }
            }, function (error) {
//            alert('Erreur lors du chargement des données');
            console.log('Erreur lors du chargement des données');
                vm.save();
            });
        };

        /**
         * @returns {nomClient}
         * Rechercher un client par le nom du client
         */
        vm.trouverUnClientParNomClient = function(){
           var nomClient = null;
           var valide = false;
            nomClient = vm.client.nomClient;            
            if(nomClient!== null){
            FetchData.getData(API_URL + URL_UN_CLIENT_PAR_NOMCLIENT + nomClient).then(function (result) {
                    console.log(result);
                    vm.donnees = result.data;
                    console.log('Client Trouvé: ' + vm.donnees.nomClient);
                    if (vm.client.id !== null) {                           
                        Client.update(vm.client, onSaveSuccess, onSaveError);
                        console.log("Modification Client");
                        valide = true;                  
                    }
                    
                    if (!valide) {
                        if (vm.donnees.nomClient === nomClient) {
                            SweetAlert.alert("Le client " + vm.donnees.nomClient + " existe déjà.", {title: "Websocker"});
                        }
                    }                   
                }, function (error) { 
                    console.log(error);
                    vm.save();
                });
            }
//            return vm.donnees.nomClient;
        };
       
        vm.save = function () {
            vm.isSaving = true;
            if (vm.client.id !== null) {
                Client.update(vm.client, onSaveSuccess, onSaveError);
            } else{
                Client.save(vm.client, onSaveSuccess, onSaveError);  
                console.log("Client enregistré");
            }
        };

        vm.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
