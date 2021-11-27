import { GeoJsonLayer, ColumnLayer } from "@deck.gl/layers";

const DATA_POPULATION = require("../data/centroids.json");
const DATA_REFERENCE = require("../data/hexgrid.geojson");

// https://deck.gl/docs/api-reference/layers/column-layer
export const populationLayer = (mapState) =>
  new ColumnLayer({
    id: "population",
    data: DATA_POPULATION,
    diskResolution: 6,
    opacity: 0.04,
    radius: 150,
    extruded: true,
    pickable: false,
    elevationScale: 0.8,
    getPosition: (d) => [d.centroid[1], d.centroid[0]],
    getFillColor: (d) => [10, 10, (d.value-100)*20, 255],
    getLineColor: [0, 0, 0],
    getElevation: (d) => d.value
  });

// https://deck.gl/docs/api-reference/layers/geojson-layer
export const referenceLayer = (mapState) =>
  new GeoJsonLayer({
    id: "reference",
    data: DATA_REFERENCE,
    // Styles
    filled: true,
    stroked: false,
    getFillColor: [255, 255, 255, 80],
    // Interactive props
    pickable: true,
    autoHighlight: true,
    onClick: (info) => {
      if (info.object && info.object.properties) {
        console.debug(info.object.properties);
        // `(${info.object.properties.abbrev})`)
      }
      resetTimer();
    }
  });

  // Open info-box after a delay (e.g. 100s)
  const TIME_OUT = 100 * 1000;
  let timer = Date.now();
  function resetTimer() { timer = Date.now(); }
  function checkTimer() {
    if (Date.now() - timer > TIME_OUT) {
      document.getElementById("info").style.display = 'block';
      resetTimer();
    }
    setTimeout(checkTimer, 1000);
  }
  setTimeout(checkTimer, 1000);
