(function () {
    'use strict';

    angular
            .module('app')
            .controller('PrintController', PrintController);

    PrintController.$inject = ['$rootScope', '$scope', '$state', '$window', '$stateParams', '$location', '$http'];


    function PrintController($rootScope, $scope, $state, $window, $stateParams, $location, $http) {
        
        var vm = this;

        vm.typeVente = localStorage.getItem("type");
        vm.url3 = localStorage.getItem("url3");

        // alert(vm.typeVente);
         $scope.getPdf = function(url){
            if(url===undefined){
                alert('Erreur d\'impression');
                return;
            }
            $http.get(url, {responseType: 'arraybuffer'})
                    .success(function (data) {
                        console.log('le blob');
                        console.log(data);
                        var ieEDGE = navigator.userAgent.match(/Edge/g);
                        var ie = navigator.userAgent.match(/.NET/g); // IE 11+
                        var oldIE = navigator.userAgent.match(/MSIE/g);
                        var name = "file";
                        var blob = new window.Blob([data], {type: 'application/pdf'});
                        if (ie || oldIE || ieEDGE) {
                            var fileName = name + '.pdf';
                            window.navigator.msSaveBlob(blob, fileName);
                        } else {
                            var file = new Blob([data], {
                                type: 'application/pdf'
                            });
                            var fileURL = URL.createObjectURL(file);
                            var a = document.createElement('a');
                            a.href = fileURL;
                            a.target = '_blank';
                            a.download = name + '.pdf';
                            document.body.appendChild(a);
                            a.click();
                        }
                    });
        }

    }
})();
