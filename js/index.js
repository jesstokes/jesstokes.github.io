$(document).ready(function() {

  /* ============== SUPPORTS TOUCH OR NOT ========= */
  /*! Detects touch support and adds appropriate classes to html and returns a JS object
    Copyright (c) 2013 Izilla Partners Pty Ltd  | http://www.izilla.com.au 
    Licensed under the MIT license  |  https://coderwall.com/p/egbgdw 
  */
  var supports = (function() {
    var d = document.documentElement,
      c = "ontouchstart" in window || navigator.msMaxTouchPoints;
    if (c) {
      d.className += " touch";
      return {
        touch: true
      }
    } else {
      d.className += " no-touch";
      return {
        touch: false
      }
    }
  })();
  navigator.geolocation.getCurrentPosition(GetLocation);

  function GetLocation(location) {
    var lat = location.coords.latitude;
    var long = location.coords.longitude;
    var ebirdURL = "http://ebird.org/ws1.1/data/obs/geo/recent?lng=" + long + "&lat=" + lat + "&dist=50&back=14&maxResults=7&locale=en_US&fmt=json&includeProvisional=true&hotspot=true&callback=?";
    var birdName;
    var birdCount;
    var birdLoc;

    $.getJSON(ebirdURL, function(data) {

      var obLength = data.length;
      if (obLength > 0) {
        $("#message").html("Find the birds below in your neck of the woods:");
      }

      for (i = 0; i < obLength; i++) {
        birdName = data[i].comName;
        birdCount = data[i].howMany;
        birdLoc = data[i].locName;
        
        if (birdLoc.length > 25){
          birdLoc = birdLoc.substr(0, 25) + "..."
        }
        
        $("#ebird").append("<tr><td>" + birdName + "</td><td>" + birdLoc + "</td></tr>");
      }
    });
  };
});