// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var DB = null;

var APP = angular.module('starter', [
  'ionic',
  'ngCordova',
  'starter.controllers',
  'starter.services'
]);

var CTRLS = angular.module('starter.controllers', []);
var SERVICES = angular.module('starter.services', []);


APP.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    
    }
    if (window.cordova) {
      DB = $cordovaSQLite.openDB({
      name: 'app.db',
      location: 'default',
      iosDatabaseLocation: 'Library'
    }); //device
      console.log("Device");
    }else{
      DB = window.openDatabase("app.db", '1', 'my', 1024 * 1024 * 100); // browser
      console.log("browser");
    }
     console.log(DB);

     //Create Tables
    var query = "CREATE TABLE IF NOT EXISTS reports (id integer PRIMARY KEY AUTOINCREMENT, item text,description text, location text, image text, unit text, note1 text, note2 text)";
    $cordovaSQLite.execute(DB, query)
    .then(function( response ){
      console.log( response );
    })
    .catch(function( error ){
      console.log( error );
    });

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.reports', {
      url: '/reports',
      views: {
        'tab-reports': {
          templateUrl: 'templates/tab-reports.html',
          controller: 'ReportsCtrl'
        }
      }
    })
    .state('tab.report-detail', {
      url: '/reports/:chatId',
      views: {
        'tab-reports': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ReportDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/reports');

});
