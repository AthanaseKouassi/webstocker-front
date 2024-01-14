'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', ['$rootScope','$scope', '$translate', '$localStorage', '$window','$timeout','API_URL',
    function(        $rootScope,      $scope,   $translate,   $localStorage,   $window, $timeout, API_URL ) {
      // console.log('ehhhhhhhhhh');
      // var countUp = function() {
      //   console.log('ekiooo');
      //   $timeout(countUp, 500);
      // };
      // $timeout(countUp,500);
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      if(isIE){ angular.element($window.document.body).addClass('ie');}
      if(isSmartDevice( $window ) ){ angular.element($window.document.body).addClass('smart')};

      $rootScope.factureUrl='';
      $rootScope.menuElement="";
      $rootScope.user=null;

      // config
      $scope.app = {
        name: 'Webstocker',
        version: '2.2.0',
        backendUrl: API_URL ,
//        backendUrl: 'http://83.166.138.228:8080/',
//        backendUrl: 'http://localhost:8080/',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false
        }
      }

      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // for box layout, add background image
        $scope.app.settings.container ? angular.element('html').addClass('bg') : angular.element('html').removeClass('bg');
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }




      




//       setInterval(() => {
        
        
//                 // Display a warning toast, with no title
// //toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!')

// // Display a success toast, with a title
// //toastr.success('Have fun storming the castle!', 'Miracle Max Says')

// // Display an error toast, with a title
// //toastr.error('I do not think that word means what you think it means.', 'Inconceivable!')

// // Immediately remove current toasts without using animation
// //toastr.remove()

// // Remove current toasts using animation
// //toastr.clear()

// // Override global options
// //toastr.success('We do have the Kapua suite available.', 'Turtle Bay Resort', {timeOut: 5000})


// //toastr.options.closeButton = true;



// toastr.options = {
//   "closeButton": true,
//   "debug": true,
//   "newestOnTop": true,
//   "progressBar": true,
//   "positionClass": "toast-top-right",
//   "preventDuplicates": true,
//   //"onclick": null,
//   "onclick": (event) => {
//     console.log("Cliqué: ====> redirection", event.type, "&&&&&", event.message, "&&&&&&", event.target.innerText);
//     alert("Cliqué: ====> redirection");
//   },
//   "showDuration": "300",
//   "hideDuration": "1000",
//   "timeOut": "10000",
//   "extendedTimeOut": "5000",
//   "showEasing": "swing",
//   "hideEasing": "linear",
//   "showMethod": "fadeIn",
//   "hideMethod": "fadeOut"
// };

// toastr.error('Isaac N\'DRI, Brice ZAMBLE3, F000003, AIMAS, 2 632 000 XOF', 'Créance client');
// toastr.success('Isaac N\'DRI, Brice ZAMBLE2, F000002, PREGNON, 780 000 XOF', 'Créance client');
// toastr.info('Isaac N\'DRI, Brice ZAMBLE3, F000003, AIMAS, 2 632 000 XOF', 'Créance client');
// toastr.warning('Isaac N\'DRI, Brice ZAMBLE1, F000001, COMPLICE, 450 000 XOF', 'Créance client');


//       }, 20000);



  }]);
