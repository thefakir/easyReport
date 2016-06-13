

SERVICES.factory('Report', function($cordovaSQLite, $q) {
  // Might use a resource here that returns a JSON array


console.log(DB);
return {
    createReport: function(item, description, location, image, unit, note1, note2){
      var query = "INSERT INTO reports(item, description, location, image, unit, note1, note2) VALUES (?,?,?,?,?,?,?)";
      var attrs = [item, description, location, image, unit, note1, note2];
      $cordovaSQLite.execute(DB, query, attrs)
      .then(function( response ){
        console.log( response );
      })
      .catch(function( error ){
        console.log( error );
      });
    },
    getAllReports: function(){
    
      var reports = [];
      var query = "SELECT * FROM reports";
      return $cordovaSQLite.execute(DB, query)
      .then(function( response ){
        console.log( response + "fidel");
        for (var i = 0; i < response.rows.length; i++) {
          reports.push({
            id: response.rows.item(i).id,
            item: response.rows.item(i).item,
            description: response.rows.item(i).description,
            location: response.rows.item(i).location,
            image: response.rows.item(i).image,
            unit: response.rows.item(i).unit,
            note1: response.rows.item(i).note1,
            note2: response.rows.item(i).note2
            
          });
        };
        return $q.when( reports );
      })
      .catch(function( error ){
        return $q.reject( error );
      });
    },
    editReport: function(id, item, description, location, image, unit, note1, note2){
      var query = "UPDATE reports SET item = ?, description = ?, location = ?, image = ?, unit = ?, note1 = ?, note2 = ? WHERE id = ?";
      var attrs = [item, description, location, image, unit, note1, note2, id];
      $cordovaSQLite.execute(DB, query, attrs)
      .then(function( response ){
        console.log( response + "Updating");
      })
      .catch(function( error ){
        console.log( error );
      });

    },
    deleteReport: function(id){
      var query = "DELETE FROM reports where id = ?";
      var attrs = [id];
      $cordovaSQLite.execute(DB, query, attrs)
      .then(function( response ){
        console.log( response + "DELETING");
      })
      .catch(function( error ){
        console.log( error );
      });

    },
    getReport: function(id){

      console.log( id );
      var report = {};
      var query = "SELECT * FROM reports where id = ?";
      var attrs = [id];
      return $cordovaSQLite.execute(DB, query, attrs)
      .then(function( response ){
console.log( response );
        report = {
            id: response.rows.item(0).id,
            item: response.rows.item(0).item,
            description: response.rows.item(0).description,
            location: response.rows.item(0).location,
            image: response.rows.item(0).image,
            unit: response.rows.item(0).unit,
            note1: response.rows.item(0).note1,
            note2: response.rows.item(0).note2
            
          }
           
        return $q.when( report );

      }).catch(function( error ){
        return $q.reject( error );
      });

    }
  }
});
