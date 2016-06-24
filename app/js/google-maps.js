
/** =========================
 * ----- Google maps --------
 * ======================= */

function initMap() {

  if($('#map-box').length == 0) { return false; }

  // Create an array of styles.
  var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#e7a731"},{"visibility":"on"}]}]

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
      {name: "Styled Map"});

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var mapOptions = {
    scrollwheel: false,
    zoom: 11,
    center: new google.maps.LatLng(46.50,30.7471985),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  var map = new google.maps.Map(document.getElementById('map-box'),
      mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  var image = {
    url: "../img/map_marker.svg",
    scaledSize: new google.maps.Size(50, 71.46)
  };

  var marker = new google.maps.Marker({
    position: {lat: 46.4322939, lng: 30.7271985},
    icon: image
  });

  // To add the marker to the map, call setMap();
  marker.setMap(map);
}

