CTRLS.controller('DashCtrl', function($scope) {});

CTRLS.controller('ReportsCtrl', function($scope,$cordovaCamera , Report, $ionicModal, $ionicListDelegate) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

 $scope.addNewReport = addNewReport;
 $scope.closeModal =  closeModal;
 $scope.takePicture =  takePicture;
 $scope.saveReport = saveReport;
 $scope.editReport = editReport;
 $scope.report = {};
 $scope.reports = [];
 $scope.isNew = false;


   Report.getAllReports()
    .then(function(reports){
      console.log( reports );
      if(reports != undefined) $scope.reports = reports; 
    })
    .catch(function( error ){
      console.log( error );
    });



   function indexOfReport(report)
   {
      for(var i = 0; i < $scope.reports.length; i++)
      if($scope.reports[i].id == report.id)
         {         
          return i;
         }

   }
  //$scope.reports = Report.all();
  $scope.remove = function(report) {
    console.log( report );
    Report.deleteReport(report.id);

    for(var i = 0; i < $scope.reports.length; i++)
      if($scope.reports[i].id == report.id)
         {
          $scope.reports.splice( i, 1 );
          i =  $scope.reports.length;
         }
    
  };

  $ionicModal.fromTemplateUrl("templates/report-modal.html", {
    scope: $scope
  })
  .then(function(modal){
    $scope.modal = modal;
  });

function addNewReport(){
    $scope.isNew = true;
    $scope.report = {};
    //$scope.popover.hide();
    $scope.modal.show();
  }
  function closeModal(){
    $scope.modal.hide();
  }
   

  function takePicture(){

    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture( options )
    .then(function( imageData ){
      $scope.report.image = "data:image/jpeg;base64," + imageData;
    });
  }

  function saveReport(){
     // ComicService.createComic($scope.comic.title, $scope.comic.author, $scope.comic.cover, $scope.comic.year);
   if($scope.isNew){
      Report.createReport($scope.report.item, $scope.report.description, $scope.report.location, $scope.report.image, $scope.report.unit, $scope.report.note1, $scope.report.note2);
      $scope.reports.push( $scope.report );
      
    }else{
    Report.editReport($scope.report.id, $scope.report.item, $scope.report.description, $scope.report.location, $scope.report.image, $scope.report.unit, $scope.report.note1, $scope.report.note2);
    }
    $scope.report = {};
    
    $scope.modal.hide();
    
  }

  function editReport( report ){
    $scope.isNew = false;
    $scope.report = $scope.reports[indexOfReport(report)];
    $ionicListDelegate.closeOptionButtons();
    $scope.modal.show();  
  }

});

CTRLS.controller('ReportDetailCtrl', function($scope, $stateParams, Report) {
  console.log($stateParams);
  console.log($stateParams.reportId);
  
    Report.getReport($stateParams.chatId)
    .then(function(report){
      console.log( report);
      if(report != undefined) $scope.report = report; 
    })
    .catch(function( error ){
      console.log( error );
    });
});

CTRLS.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
