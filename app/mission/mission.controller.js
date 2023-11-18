(function() {
    'use strict';

    angular
        .module('app')
        .controller('MissionController', MissionController)
        .value('URL_SEARCH_MISSION','api/mission-critere');
//        .value('URL_SEARCH_MISSION','http://83.166.138.228:8080/api/mission-critere');
//        .value('URL_SEARCH_MISSION','http://localhost:8080/api/mission-critere');

    MissionController.$inject = ['$scope', '$state', 'Mission', 'API_URL','MissionSearch', 'ParseLinks', 'AlertService', 'pagingParams', 'paginationConstants','Localite','entity','TypeActivite','ligneactiviteEntity','lignebudgetEntity','MissionEntity','FetchData','URL_SEARCH_MISSION'];

    function MissionController ($scope, $state, Mission,API_URL, MissionSearch, ParseLinks, AlertService, pagingParams, paginationConstants,Localite,entity,TypeActivite,ligneactiviteEntity,lignebudgetEntity,MissionEntity,FetchData,URL_SEARCH_MISSION) {
        var vm = this;
        vm.loadAll = loadAll;
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.mission= entity;
        vm.MissionEntity = MissionEntity;
        vm.ligneBudgetMissions = [];
        vm.ligneActiviteMissions = [];
        vm.ligneBudgetIndex = 0;
        vm.ligneActiviteIndex = 0;
        vm.transition = transition;
        vm.clear = clear;
        vm.search = search;
        vm.localites = Localite.query();
        vm.typeactivites  = TypeActivite.query();
        vm.searchQuery = pagingParams.search;
        vm.currentSearch = pagingParams.search;
        vm.activite = null;
        vm.lignebudget= null;
        vm.budget= 0;
        vm.loadAll();
        vm.ligneactiviteEntity = ligneactiviteEntity;
        vm.lignebudgetEntity = lignebudgetEntity;
        vm.criteria = {};
        
        vm.addLigneActiviteMission = function () {
            vm.ligneactiviteEntity.activite = vm.activite;
            var object = {
                activite : vm.ligneactiviteEntity.activite
            };
            vm.ligneActiviteMissions[vm.ligneActiviteIndex] = object;
            vm.ligneActiviteIndex = vm.ligneActiviteIndex + 1;
            vm.ligneactiviteEntity.activite = null;
            vm.activite = {
                nomActivite:'',
                descriptionActivite:'',
                resultatAttendu:''
                
            };
        };
        vm.removeLigneActiviteMission = function(item){
            var index = vm.ligneActiviteMissions.indexOf(item);
            vm.ligneActiviteMissions.splice(index, 1);
            console.log(vm.ligneActiviteIndex);
            if (vm.ligneActiviteIndex >= 1) {
                 vm.ligneActiviteIndex = vm.ligneActiviteIndex - 1;
            }
        };
        vm.checkMontantBudget = function () {
           console.log(vm.lignebudget);
            if (vm.lignebudget == null) {
                console.log('le montant est '+vm.budget);
                return vm.budget;
            }

            vm.montantBudget = vm.budget;
            vm.montantBudgetLigne = 0;

            for (var i = 0; i <  vm.ligneBudgetMissions.length; i++) {
                vm.ligneBudgetMissionTmp =  vm.ligneBudgetMissions[i];
                vm.montantBudgetLigne = vm.montantBudgetLigne + vm.ligneBudgetMissionTmp.montantLigneBudget;
            }

            return  vm.montantBudgetLigne;


        };
        vm.montantBudgetMax = vm.checkMontantBudget();
        vm.qteBudgetRestanteText = "Montant restant à traiter ";
        $scope.qteCommandeRestantePlaceholder =
        $scope.$watch('vm.lignebudget.montantLigneBudget', function (newValue) {
                console.log("nouvelle ligne budget");
                console.log(newValue);
                if (newValue != null) {
                    vm.montantBudgetMax = vm.checkMontantBudget();
                    vm.BudgetRestantePlaceholder = vm.qteBudgetRestanteText + " : " + vm.montantBudgetMax;
                }
        }, true);
        vm.addLigneBudgetMission = function(){
            if(vm.lignebudget.montantLigneBudget > vm.budget){
                alert('Le montant des lignes du budget ne peut doit\n\
                       pas être supérieur à celui du budget');
                return;
            }
            vm.lignebudgetEntity.budget = vm.lignebudget;
            vm.ligneBudgetMissions[vm.ligneBudgetIndex] =vm.lignebudgetEntity.budget;
            console.log(vm.ligneBudgetMissions);
            console.log(vm.lignebudget);
            console.log(vm.lignebudgetEntity.budget);
            vm.ligneBudgetIndex = vm.ligneBudgetIndex + 1;
            vm.lignebudgetEntity.budget = null;
            vm.lignebudget = {
                libelleLigneBudget:'',
                montantLigneBudget:''
            };
        };
        vm.removeLigneBudgetMission = function(item){
            var index =  vm.ligneBudgetMissions.indexOf(item);
            vm.ligneBudgetMissions.splice(index, 1);
            console.log(vm.ligneBudgetIndex);
            if (vm.ligneBudgetIndex >= 1) {
                 vm.ligneBudgetIndex = vm.ligneBudgetIndex - 1;
            }
        };
        function loadAll () {
            if (pagingParams.search) {
                MissionSearch.query({
                    query: pagingParams.search,
                    page: pagingParams.page - 1,
                    size: paginationConstants.itemsPerPage,
                    sort: sort()
                }, onSuccess, onError);
            } else {
                Mission.query({
                    page: pagingParams.page - 1,
                    size: paginationConstants.itemsPerPage,
                    sort: sort()
                }, onSuccess, onError);
            }
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.missions = data;
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadPage (page) {
            vm.page = page;
            vm.transition();
        }

        function transition () {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }

        function search (searchQuery) {
            if (!searchQuery){
                return vm.clear();
            }
            vm.links = null;
            vm.page = 1;
            vm.predicate = '_score';
            vm.reverse = false;
            vm.currentSearch = searchQuery;
            vm.transition();
        }

        function clear () {
            vm.links = null;
            vm.page = 1;
            vm.predicate = 'id';
            vm.reverse = true;
            vm.currentSearch = null;
            vm.transition();
        }
        
        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateDebut = false;
        vm.datePickerOpenStatus.dateFin = false;
        
        
        vm.addLigneCommande = function () {
            vm.lignecommande.produit = vm.produitCommande;
            vm.lignecommandes[vm.ligneCommandeIndex] = vm.lignecommande;
            vm.ligneBudgetIndex = vm.ligneCommandeIndex + 1;
            vm.lignecommande = null;
        };
       
        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };
        var onSaveSuccess = function (result) {
           console.log(result);
           $state.go('mission_list', null, { reload: true });
        };

        var onSaveError = function (error) {
            console.log(error);
            vm.isSaving = false;
        };
        vm.saveMission = function () {
            vm.MissionEntity.mission = vm.mission;
            vm.MissionEntity.ligneMissionActivites = vm.ligneActiviteMissions;
            vm.MissionEntity.ligneBudgets = vm.ligneBudgetMissions;
            vm.isSaving = true;
            console.log(vm.MissionEntity);
            Mission.save(vm.MissionEntity, onSaveSuccess, onSaveError);
            
            console.log("apres save");
        };
        
        vm.loadData = function(){
           console.log($scope.criteria);
           var dateDebut='',dateFin='';
           if(vm.criteria.dateDebut!==null){
               dateDebut = $filter('date')(vm.criteria.dateDebut, 'yyyy-MM-dd');
           }
           if(vm.criteria.dateFin!==null){
               dateFin = $filter('date')(vm.criteria.dateFin, 'yyyy-MM-dd');
           }
           FetchData.getData(API_URL+URL_SEARCH_MISSION+'?dateDebut='+dateDebut+'&dateFin='+dateFin+'&libelle='+$scope.criteria.libelle)
                   .then(function(response){
                        console.log(response);
                        $scope.mission = response.data;
                      
                     },function(error){
                        console.log(error); 
             });
        };
        
    }
})();
