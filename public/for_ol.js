// Define the coordinates for Butuan City and Philippines.
const butuanCityCoords = ol.proj.fromLonLat([125.568014, 8.8904]);
const philippinesCoords = ol.proj.fromLonLat([122.563, 11.803]);

// Create a view centered on Butuan City.
const mapView = new ol.View({
  center: philippinesCoords,
  zoom: 6.5,
});

// Create a new OpenLayers map instance and associate it with an HTML element by ID.
const map = new ol.Map({
  target: "map", // HTML element with the ID "map"
  view: mapView,
  controls: [],
});

// Define base layers
const baseLayers = {
  none: {
    title: "None",
    type: "base",
    visible: false,
  },
  osm: {
    title: "OpenStreetMap",
    type: "base",
    // visible: true,
    source: new ol.source.OSM(),
  },
  bingMapsAerial: {
    title: "Aerial",
    type: "base",
    visible: true,

    source: new ol.source.BingMaps({
      key: "AsMcqtm-jc8We9M2m9Dq9K8c62I7jlwqVCQ4Hpv1mpVIk6u8ZhAmHuG6BgPwTEBn",
      imagerySet: "Aerial",
    }),
  },
};

// Create a group of base layers containing OSM, none, and Bing Maps Aerial.
const baseGroup = new ol.layer.Group({
  title: "Base Maps",
  fold: true,
  layers: Object.values(baseLayers).map((layer) => new ol.layer.Tile(layer)),
});

// Add the base layer group to the map.
map.addLayer(baseGroup);

// Create a function to define a layer for WMS data
function createWMSTileLayer(title, layerName, propertyName) {
  return new ol.layer.Tile({
    title: title,
    source: new ol.source.TileWMS({
      url: "http://localhost:8080/geoserver/ITE-18-WEBGIS/wms",
      params: {
        LAYERS: `ITE-18-WEBGIS:${layerName}`,
        TILED: true,
      },
      serverType: "geoserver",
      visible: true,
    }),
    propertyName: propertyName,
  });
}

// Define a layer for Butuan City data using WMS (Web Map Service).
const add_butuan = createWMSTileLayer(
  "Butuan",
  "projected_butuan_PostGIS",
  "barangay,class,shape_area"
);

// Define a layer for Land Cover data of the Philippines using WMS.
const add_land_cover_ph = createWMSTileLayer(
  "Land Cover of the Philippines",
  "LandCover_w84",
  "DESCRIPT,AREA"
);

// Create a group of overlay layers containing Butuan City and Land Cover of the Philippines.
const overlayGroup = new ol.layer.Group({
  title: "Overlays",
  fold: true,
  layers: [add_land_cover_ph, add_butuan],
});

// Add the overlay layer group to the map.
map.addLayer(overlayGroup);

// Create a layer switcher control for toggling between base and overlay layers.
const layerSwitcher = new ol.control.LayerSwitcher({
  // switcher
  activationMode: "click",
  startActive: false,
  groupSelectStyle: "children",
});
// Add the layer switcher control to the map.
map.addControl(layerSwitcher);

const mousePosition = new ol.control.MousePosition({
  // mouse position coordinates
  className: "mousePosition",
  projection: "EPSG:4326",
  coordinateFormat: function (coordinate) {
    return ol.coordinate.format(coordinate, "{y},{x}", 6);
  },
});
map.addControl(mousePosition);

// Create a mouse position control to display coordinates on the map.
const scaleControl = new ol.control.ScaleLine({
  // scale control
  bar: true,
  text: true,
});
// Add the mouse position control to the map.
map.addControl(scaleControl);

// Create an OpenLayers overlay for pop-up information.
const container = document.getElementById("popup");
const content = document.getElementById("popup-content");
const closer = document.getElementById("popup-closer");

const popup = new ol.Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});
// Add the pop-up overlay to the map.
map.addOverlay(popup);

closer.onclick = function () {
  popup.setPosition(undefined);
  closer.blur();
  return false;
};

// Define a function to handle click events and display information in the pop-up
function handlePopupClick(layer, propertyName, e) {
  if (featureInfoFlag) {
    content.innerHTML = " ";
    var resolution = mapView.getResolution();
    var projection = mapView.getProjection();

    var url = layer
      .getSource()
      .getFeatureInfoUrl(e.coordinate, resolution, projection, {
        INFO_FORMAT: "application/json",
        propertyName: propertyName,
      });

    if (url) {
      $.getJSON(url, function (data) {
        var feature = data.features[0];
        var props = feature.properties;
        content.innerHTML = Object.keys(props)
          .map((key) => `<h2>${key}: </h2><p>${props[key]}</p>`)
          .join("<br>");
        popup.setPosition(e.coordinate);
      });
    } else {
      popup.setPosition(undefined);
    }
  }
}

// Add click event handlers for both layers
map.on("singleclick", function (e) {
  handlePopupClick(add_butuan, "barangay,class,shape_area", e);
  handlePopupClick(add_land_cover_ph, "DESCRIPT,AREA", e);
});
