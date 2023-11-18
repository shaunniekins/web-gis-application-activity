// Create a button for returning to the home page
let homeButton = document.createElement("button");
homeButton.innerHTML =
  '<img src="/images/controls/home.png" alt="HOME" style="width:20px; height:20px; filter:brightness(0);vertical-align:middle"></img>';
homeButton.className = "myButton";

// Create a container for the home button
let homeElement = document.createElement("div");
homeElement.className = "homeButtonDiv";
homeElement.appendChild(homeButton);

// Create an OpenLayers control for the home button
let homeControl = new ol.control.Control({ element: homeElement });

// Add a click event listener to the home button that navigates to the home page
homeButton.addEventListener("click", () => {
  location.href = "index.html";
});

// Add the home control to the map
map.addControl(homeControl);

let fsButton = document.createElement("button");
fsButton.innerHTML =
  '<img src="/images/controls/fullscreen.png" alt="FULLSCREEN" style="width:20px; height:20px; filter:brightness(0); vertical-align:middle"></img>';
fsButton.className = "myButton";

let fsElement = document.createElement("div");
fsElement.className = "fsButtonDiv";
fsElement.appendChild(fsButton);

let fsControl = new ol.control.Control({
  element: fsElement,
});

fsButton.addEventListener("click", () => {
  let mapEle = document.getElementById("map");
  if (mapEle.requestFullscreen) {
    mapEle.requestFullscreen();
  } else if (mapEle.mozRequestFullscreen) {
    mapEle.mozRequestFullscreen();
  } else if (mapEle.webkitRequestFullscreen) {
    mapEle.webkitRequestFullscreen();
  } else if (mapEle.msRequestFullscreen) {
    mapEle.msRequestFullscreen();
  }
});

map.addControl(fsControl);

let featureInfoButton = document.createElement("button");
featureInfoButton.innerHTML =
  '<img src="/images/controls/featureInfo.png" alt="FEATURE INFO" style="width:20px; height:20px; filter:brightness(0); vertical-align:middle"></img>';
featureInfoButton.className = "myButton";
featureInfoButton.id = "featureInfoButton";

let featureInfoElement = document.createElement("div");
featureInfoElement.className = "featureInfoButtonDiv";
featureInfoElement.appendChild(featureInfoButton);

let featureInfoControl = new ol.control.Control({
  element: featureInfoElement,
});

let featureInfoFlag = false;
featureInfoButton.addEventListener("click", () => {
  featureInfoButton.classList.toggle("clicked");
  featureInfoFlag = !featureInfoFlag;

  // Hide the popup when turning off featureInfoFlag
  if (!featureInfoFlag) {
    popup.setPosition(undefined);
  }
});

map.addControl(featureInfoControl);

//start of length control
let lengthButton = document.createElement("button");
lengthButton.innerHTML =
  '<img src="/images/controls/length.png" alt="LENGTH" style="width:20px; height:20px; filter:brightness(0); vertical-align:middle"></img>';
lengthButton.className = "myButton";
lengthButton.id = "lengthButton";

let lengthElement = document.createElement("div");
lengthElement.className = "lengthButtonDiv";
lengthElement.appendChild(lengthButton);

let lengthControl = new ol.control.Control({
  element: lengthElement,
});

let lengthFlag = false;
lengthButton.addEventListener("click", () => {
  lengthButton.classList.toggle("clicked");
  lengthFlag = !lengthFlag;
  document.getElementById("map").style.cursor = "default";
  if (lengthFlag) {
    map.removeInteraction(draw);
    addInteraction("LineString");
  } else {
    map.removeInteraction(draw);
    source.clear();
    const elements = document.getElementsByClassName(
      "ol-tooltip ol-tooltip-static"
    );
    while (elements.length > 0) elements[0].remove();
  }
});
map.addControl(lengthControl);
//end of lengthControl

//start of areaControl
let areaButton = document.createElement("button");
areaButton.innerHTML =
  '<img src="/images/controls/area.png" alt="AREA" style="width:20px; height:20px; filter:brightness(0); vertical-align:middle"></img>';
areaButton.className = "myButton";
areaButton.id = "areaButton";

let areaElement = document.createElement("div");
areaElement.className = "areaButtonDiv";
areaElement.appendChild(areaButton);

let areaControl = new ol.control.Control({
  element: areaElement,
});

let areaFlag = false;
areaButton.addEventListener("click", () => {
  areaButton.classList.toggle("clicked");
  areaFlag = !areaFlag;
  document.getElementById("map").style.cursor = "default";
  if (areaFlag) {
    map.removeInteraction(draw);
    addInteraction("Polygon");
  } else {
    map.removeInteraction(draw);
    source.clear();
    const elements = document.getElementsByClassName(
      "ol-tooltip ol-tooltip-static"
    );
    while (elements.length > 0) elements[0].remove();
  }
});
map.addControl(areaControl);
//end of areaControl

// start of zoom in Control
let zoomInInteraction = new ol.interaction.DragBox();

zoomInInteraction.on("boxend", function () {
  let zoomInExtent = zoomInInteraction.getGeometry().getExtent();
  map.getView().fit(zoomInExtent);
});

let ziButton = document.createElement("button");
ziButton.innerHTML =
  '<img src="/images/controls/zoom-in.png" alt="ZOOM-IN" style="width:20px; height:20px; filter:brightness(0); vertical-align:middle"></img>';
ziButton.className = "myButton";
ziButton.id = "ziButton";

let ziElement = document.createElement("div");
ziElement.className = "ziButtonDiv";
ziElement.appendChild(ziButton);

let ziControl = new ol.control.Control({
  element: ziElement,
});

let zoomInFlag = false;
ziButton.addEventListener("click", () => {
  ziButton.classList.toggle("clicked");
  zoomInFlag = !zoomInFlag;
  if (zoomInFlag) {
    document.getElementById("map").style.cursor = "zoom-in";
    map.addInteraction(zoomInInteraction);
  } else {
    map.removeInteraction(zoomInInteraction);
    document.getElementById("map").style.cursor = "default";
  }
});

map.addControl(ziControl);
// end of zoom in Control

//start of zoom-out control
let zoomOutInteraction = new ol.interaction.DragBox();
zoomOutInteraction.on("boxend", function () {
  let zoomOutExtent = zoomOutInteraction.getGeometry().getExtent();
  map.getView().setCenter(ol.extent.getCenter(zoomOutExtent));
  mapView.setZoom(mapView.getZoom() - 1);
});

let zoButton = document.createElement("button");
zoButton.innerHTML =
  '<img src="/images/controls/zoom-out.png" alt= "ZOOM OUT" style="width:20px; height:20px; filter:brightness(0);vertical-align:middle"></img>';
zoButton.className = "myButton";
zoButton.id = "zoButton";

let zoElement = document.createElement("div");
zoElement.className = "zoButtonDiv";
zoElement.appendChild(zoButton);

let zoControl = new ol.control.Control({
  element: zoElement,
});

let zoomOutFlag = false;
zoButton.addEventListener("click", () => {
  zoButton.classList.toggle("clicked");
  zoomOutFlag = !zoomOutFlag;
  if (zoomOutFlag) {
    document.getElementById("map").style.cursor = "zoom-out";
    map.addInteraction(zoomOutInteraction);
  } else {
    map.removeInteraction(zoomOutInteraction);
    document.getElementById("map").style.cursor = "default";
  }
});
map.addControl(zoControl);
//end of zoom-out control

/**
 * Message to show when the user draws a polygon.
 * @type {string}
 */

let continuePolygonMsg =
  "Click to continue drawing the polygon, Double click to complete it.";
/**
 * Message to show when the user is drawing a line.
 * @type {string}
 */

let continuelineMsg =
  "Click to continue drawing the line, Double click to complete it.";
let draw; // global so we can remove it later

let source = new ol.source.Vector();
let vector = new ol.layer.Vector({
  source: source,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: "rgba(255, 255, 255, 0.2)",
    }),
    stroke: new ol.style.Stroke({
      color: "#ffcc33",
      width: 2,
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: "#ffcc33",
      }),
    }),
  }),
});
map.addLayer(vector);

function addInteraction(intType) {
  draw = new ol.interaction.Draw({
    source: source,
    type: intType,
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: "rgba(200, 200, 200, 0.6)",
      }),
      stroke: new ol.style.Stroke({
        color: "#ffcc33",
        lineDash: [10, 10],
        width: 2,
      }),
      image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
          color: "rgba(0, 0, 0, 0.7)",
        }),
        fill: new ol.style.Fill({
          color: "#ffcc33",
        }),
      }),
    }),
  });

  map.addInteraction(draw);

  createMeasureTooltip();
  createHelpTooltip();

  /**
   * Currently drawn features.
   * @type {import("./tools/ol/Feature.js").default}
   */

  let sketch;

  /**
   * Handle pointer move.
   * @param {import("./tools/ol/MapBrowserEvent.js").default} evt Map browser event.
   */

  let pointerMoveHandler = function (evt) {
    if (evt.dragging) {
      return;
    }
    /**
     *@type {string}
     */
    let helpMsg = "Click to start drawing";
    if (sketch) {
      let geom = sketch.getGeometry();
    }
  };

  map.on("pointermove", pointerMoveHandler);

  draw.on("drawstart", function (evt) {
    //set sketch
    sketch = evt.feature;
    /**@type {import("./tools/ol/coordinate.js").Coordinate underfined} */
    let tooltipCoord = evt.coordinate;
    sketch.getGeometry().on("change", function (evt) {
      let geom = evt.target;
      let output;
      if (geom instanceof ol.geom.Polygon) {
        output = formatArea(geom);
        tooltipCoord = geom.getInteriorPoint().getCoordinates();
      } else if (geom instanceof ol.geom.LineString) {
        output = formatLength(geom);
        tooltipCoord = geom.getLastCoordinate();
      }
      measureTooltipElement.innerHTML = output;
      measureTooltip.setPosition(tooltipCoord);
    });
  });

  draw.on("drawend", function () {
    measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
    measureTooltip.setOffset([0, -7]);
    //unset sketch
    sketch = null;
    //unset tooltip so that a new one can be created
    measureTooltipElement = null;
    createMeasureTooltip();
  });
}

/**
 * the help tooltip element.
 * @type {HTMLElement}
 */
let helpTooltipElement;

/**
 * Overlay to show the help messages.
 * @type {Overlay}
 */
let helpTooltip;

/**
 * Creates a new help tooltip
 */

function createHelpTooltip() {
  if (helpTooltipElement) {
    helpTooltipElement.parentNode.removeChild(helpTooltipElement);
  }
  helpTooltipElement = document.createElement("div");
  helpTooltipElement.className = "ol-tooltip hidden";
  helpTooltip = new ol.Overlay({
    element: helpTooltipElement,
    offset: [15, 0],
    positioning: "center-left",
  });
  map.addOverlay(helpTooltip);
}

map.getViewport().addEventListener("mouseout", function () {
  helpTooltipElement.classList.add("hidden");
});

/**
 * The measure tooltip element.
 * @type {HTMLElement}
 */
let measureTooltipElement;
/**
 * Overlay to show the measurement.
 * @type {Overlay}
 */
let measureTooltip;
/**
 * Creates a new measure tooltip.
 */

function createMeasureTooltip() {
  if (measureTooltipElement) {
    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  }
  measureTooltipElement = document.createElement("div");
  measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
  measureTooltip = new ol.Overlay({
    element: measureTooltipElement,
    offset: [0, -15],
    positioning: "bottom-center",
  });
  map.addOverlay(measureTooltip);
}

/** Format length output.
 * @param {LineString} line The line.
 * @return {string} The formatted length.
 */

let formatLength = function (line) {
  let length = ol.sphere.getLength(line);
  let output;
  if (length > 100) {
    output = Math.round((length / 1000) * 100) / 100 + "" + "km";
  } else {
    output = Math.round(length * 100) / 100 + "" + "m";
  }
  return output;
};

/**
 * Format area output.
 * @param {Polygon} polygon The polygon.
 * @return {string} The formatted area.
 */

let formatArea = function (polygon) {
  console.log("test");
  let area = ol.sphere.getArea(polygon);
  let output;
  if (area > 10000) {
    output = Math.round((area / 1000000) * 100) / 100 + "" + "km<sup>2</sup>";
  } else {
    output = Math.round(area * 100) / 100 + "" + "m<sup>2</sup>";
  }
  return output;
};

//start of attribute query control
let geojson;
let featureOverlay;

// Attribute Query Control
let qryButton = document.createElement("button");
qryButton.innerHTML =
  '<img src="/images/controls/attribute-query.png" alt="ATTRIBUTE-QUERY" style="width: 20px; height:20px; filter:brightness(0); vertical-align:middle"></img>';
qryButton.className = "myButton";
qryButton.id = "qryButton";

let qryElement = document.createElement("div");
qryElement.className = "qryButtonDiv";
qryElement.appendChild(qryButton);

let qryControl = new ol.control.Control({
  element: qryElement,
});

let qryFlag = false;
qryButton.addEventListener("click", () => {
  qryButton.classList.toggle("clicked");
  qryFlag = !qryFlag;
  document.getElementById("map").style.cursor = "default";
  if (qryFlag) {
    if (geojson) {
      geojson.getSource().clear();
      map.removeLayer(geojson);
    }

    if (featureOverlay) {
      featureOverlay.getSource().clear();
      map.removeLayer(featureOverlay);
    }
    document.getElementById("attQueryDiv").style.display = "block";

    bolIdentify = false;

    addMapLayerList();
  } else {
    document.getElementById("attQueryDiv").style.display = "none";
    document.getElementById("attListDiv").style.display = "none";

    if (geojson) {
      geojson.getSource().clear();
      map.removeLayer(geojson);
    }
    if (featureOverlay) {
      featureOverlay.getSource.clear();
      map.removeLayer(featureOverlay);
    }
  }
});
// Add the attribute query control to the map
map.addControl(qryControl);

function addMapLayerList() {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/geoserver/ITE-18-WEBGIS/wfs?request=GetCapabilities",
      dataType: "xml",
      success: function (xml) {
        let select = $("#selectLayer");
        select.append("<option class='ddindent' value=''></option>");
        $(xml)
          .find("FeatureType")
          .each(function () {
            $(this)
              .find("Name")
              .each(function () {
                let name = $(this).text();
                select.append(
                  "<option class='ddindent' value='" +
                    name +
                    "'>" +
                    name +
                    "</option>"
                );
              });
          });
      },
    });
  });
}

$(function () {
  document.getElementById("selectLayer").onchange = function () {
    let select = document.getElementById("selectAttribute");
    while (select.options.length > 0) {
      select.remove(0);
    }
    let value_layer = $(this).val();
    $(document).ready(function () {
      $.ajax({
        type: "GET",
        url:
          "http://localhost:8080/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName=" +
          value_layer,
        dataType: "xml",
        success: function (xml) {
          let select = $("#selectAttribute");
          select.append("<option class='ddindent' value=''></option>");
          $(xml)
            .find("xsd\\:sequence")
            .each(function () {
              $(this)
                .find("xsd\\:element")
                .each(function () {
                  let value = $(this).attr("name");
                  let type = $(this).attr("type");
                  if (value != "geom" && value != "the_geom") {
                    select.append(
                      "<option class='ddindent' value='" +
                        type +
                        "'>" +
                        value +
                        "</option>"
                    );
                  }
                });
            });
        },
      });
    });
  };
  document.getElementById("selectAttribute").onchange = function () {
    let operator = document.getElementById("selectOperator");
    while (operator.options.length > 0) {
      operator.remove(0);
    }

    let value_type = $(this).val();
    let value_attribute = $("#selectAttribute option:selected").text();
    operator.options[0] = new Option("Select operator", "");

    if (
      value_type == "xsd:short" ||
      value_type == "xsd:int" ||
      value_type == "xsd:double"
    ) {
      let operator1 = document.getElementById("selectOperator");
      operator1.options[1] = new Option("Greater than", ">");
      operator1.options[2] = new Option("Less than", "<");
      operator1.options[3] = new Option("Equal to", "=");
    } else if (value_type == "xsd:string") {
      let operator1 = document.getElementById("selectOperator");
      operator1.options[1] = new Option("Like", "Like");
      operator1.options[2] = new Option("Equal to", "=");
    }
  };

  document.getElementById("attQryRun").onclick = function () {
    map.set("isLoading", "YES");

    if (featureOverlay) {
      featureOverlay.getSource().clear();
      map.removeLayer(featureOverlay);
    }
    let layer = document.getElementById("selectLayer");
    let attribute = document.getElementById("selectAttribute");
    let operator = document.getElementById("selectOperator");
    let txt = document.getElementById("enterValue");

    if (layer.options.selectedIndex == 0) {
      alert("Select Layer");
    } else if (attribute.options.selectedIndex == -1) {
      alert("Select Attribute");
    } else if (operator.options.selectedIndex <= 0) {
      alert("Select operator");
    } else if (txt.value.length <= 0) {
      alert("Enter value");
    } else {
      let value_layer = layer.options[layer.selectedIndex].value;
      let value_attribute = attribute.options[attribute.selectedIndex].text;
      let value_operator = operator.options[operator.selectedIndex].value;
      let value_txt = txt.value;
      if (value_operator == "Like") {
        value_txt = "%25" + value_txt + "%25";
      } else {
        value_txt = value_txt;
      }
      let url =
        "http://localhost:8080/geoserver/ITE-18-WEBGIS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" +
        value_layer +
        "&CQL_FILTER=" +
        value_attribute +
        "+" +
        value_operator +
        "+'" +
        value_txt +
        "'&outputFormat=application/json";
      newaddGeoJsonToMap(url);
      newpopulateQueryTable(url);
      setTimeout(function () {
        newaddRowHandlers(url);
      }, 300);
      map.set("isLoading", "NO");
    }
  };
});

function newaddGeoJsonToMap(url) {
  if (geojson) {
    geojson.getSource().clear();
    map.removeLayer(geojson);
  }

  let style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "#FFFF00",
      width: 3,
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: "#FFFF00",
      }),
    }),
  });

  geojson = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: url,
      format: new ol.format.GeoJSON(),
    }),
    style: style,
  });

  geojson.getSource().on("addfeature", function () {
    map.getView().fit(geojson.getSource().getExtent(), {
      duration: 1590,
      size: map.getSize(),
      maxZoom: 21,
    });
  });
  map.addLayer(geojson);
}

function newpopulateQueryTable(url) {
  if (typeof attributePanel !== "undefined") {
    if (attributePanel.parentElement !== null) {
      attributePanel.close();
    }
  }
  $.getJSON(url, function (data) {
    let col = [];
    col.push("id");
    for (let i = 0; i < data.features.length; i++) {
      for (let key in data.features[i].properties) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }
    let table = document.createElement("table");
    table.setAttribute(
      "class",
      "table table-bordered table-hover table-condensed"
    );
    table.setAttribute("id", "attQryTable");
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    let tr = table.insertRow(-1);
    for (let i = 0; i < col.length; i++) {
      let th = document.createElement("th");
      th.innerHTML = col[i];
      tr.appendChild(th);
    }
    //ADD JSON DATA TO THE TABLE AS ROWS.
    for (let i = 0; i < data.features.length; i++) {
      tr = table.insertRow(-1);
      for (let j = 0; j < col.length; j++) {
        let tabcell = tr.insertCell(-1);
        if (j == 0) {
          tabcell.innerHTML = data.features[i]["id"];
        } else {
          tabcell.innerHTML = data.features[i].properties[col[j]];
        }
      }
    }

    let tabDiv = document.getElementById("attListDiv");

    let delTab = document.getElementById("attQryTable");
    if (delTab) {
      tabDiv.removeChild(delTab);
    }
    tabDiv.appendChild(table);
    document.getElementById("attListDiv").style.display = "block";
  });

  let highlightStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: "rgba(255,255,0,0.7)",
    }),
    stroke: new ol.style.Stroke({
      color: "rgba(255,0,0,0.7)",
      width: 3,
    }),
    image: new ol.style.Circle({
      radius: 10,
      fill: new ol.style.Fill({ color: "#FF00FF" }),
    }),
  });

  let featureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: highlightStyle,
  });
}

function newaddRowHandlers() {
  let table = document.getElementById("attQryTable");
  let rows = document.getElementById("attQryTable").rows;
  let heads = table.getElementsByTagName("th");
  let col_no;

  for (let i = 0; i < heads.length; i++) {
    //Take each cell
    let head = heads[1];
    if ((head.innerHTML = "id")) {
      col_no = i + 1;
    }
  }
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = (function () {
      return function () {
        featureOverlay.getSource().clear();

        $(function () {
          $("#attQryTable td").each(function () {
            $(this).parent("tr").css("background-color", "white");
          });
        });

        let cell = this.cells[col_no - 1];
        let id = cell.innerHTML;
        $(document).ready(function () {
          $("#attonyTable td:nth-child(" + col_no + ")").each(function () {
            if ($(this).text() == id) {
              $(this).parent("tr").css("background-color", "#d1d8e2");
            }
          });
        });

        let features = geojson.getSource().getFeatures();

        for (i = 0; i < features.length; i++) {
          if (features[i].getId() == id) {
            featureOverlay.getSource().addFeature(features[1]);

            featureOverlay.getSource().on("addfeature", function () {
              map.getView().fit(featureOverlay.getSource().getExtent(), {
                duration: 1500,
                size: map.getSize(),
                maxZoom: 24,
              });
            });
          }
        }
      };
    })(rows[i]);
  }
}
//end of attribute query control
