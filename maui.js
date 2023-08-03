var mymap = L.map('map', {
  maxZoom:17,
  minZoom:10,
  fullscreenControl: true,
  popupMovable: true,
  closePopupOnClick: false,
  fullscreenControlOptions: {
    position: 'topleft'
  }}).setView([20.8045, -156.353292], 10);

L.control.navbar().addTo(mymap);

new L.basemapsSwitcher([
    {
      layer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }),
      icon: 'base/em.jpg',
      name: 'Imagery'
    },
    {
      layer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'    
      }).addTo(mymap), //DEFAULT MAP
      icon: 'base/mm.jpg',
      name: 'Topographic'
    },
    {
        layer: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
        icon: 'base/om.jpg',
        name: 'Street'
      },
  ], { position: 'topright' }).addTo(mymap);
  
  // Live USGS all month Earthquake feed.
$.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",function(data){
  L.geoJson(data, {
      pointToLayer: function(feature, latlng){
        var marker = L.circleMarker(latlng, {radius: feature.properties.mag, weight: 0.5, color: 'orange', opacity: 0.75});
        marker.bindPopup("<p5><i><b>Earthquake</b></p5><br></i>M " + feature.properties.mag + " earthquake located " + feature.properties.place);
          return marker;
      }
  }).addTo(mymap);
});

var Mc = {
  "color": "red",
  "weight" : 0.05,
  "fillOpacity": 0.1,
}

L.geoJSON(Mdata, {
  style: Mc
  }).bindPopup(function (layer) {
    return ('<p5><b>Flooding</b></p5><br><i>1% Coastal Flood Zone with 3.2 ft Sea Level Rise: </i>' + layer.feature.properties.T1PCFZ3 +
    '<i><br>Flood Hazard Zone: </i>' + layer.feature.properties.FHADFIRM +
    '<br><br><hr class="solid"><br><p5><i><b>Fire</b></p5><br>Fire Risk Area: </i>' + layer.feature.properties.FRA +
    '<br><br><hr class="solid"><br><p5><b><i>Tsunami</b></p5><br>Tsunami Evacuation Zone: </i>' + layer.feature.properties.TSU);
  }).addTo(mymap);

  //Popup moveable
var popup = L.popup({
    autoClose:false
  });
  const pm = new L.Map.PopupMovable(Lmap);
  pm.popupDispersion();