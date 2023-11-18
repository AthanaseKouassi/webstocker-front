(function(){
    "use strict";
    angular.module('app')
            .factory('PaginationService', PaginationService);
            PaginationService.$inject = ['PagerService'];
       function PaginationService(PagerService){
       var services = {};
       
       services.page = refresh;
       return services;
       
          function refresh(recup, ObjItem, vm) {
            if (recup !== null) {
                vm.dummyItems = recup; // dummy array of items to be paged
            } else {
                vm.dummyItems = ObjItem; // dummy array of items to be paged
            }
//        vm.dummyItems = _.range(1, 151); // dummy array of items to be paged
            vm.pager = {};
            vm.setPage = setPage;

            initController();

            function initController() {
                // initialize to page 1
                vm.setPage(1);
            }

            function setPage(page) {
                if (page < 1 || page > vm.pager.totalPages) {
                    return;
                }

                // get pager object from service
                vm.pager = PagerService.GetPager(vm.dummyItems.length, page,20);

                // get current page of items
                vm.items = vm.dummyItems.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
            }


//                  }
        }; 
     
   
     
       } 
     
})();
