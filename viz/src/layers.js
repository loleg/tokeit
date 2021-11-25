import { GeoJsonLayer, ColumnLayer } from "@deck.gl/layers";

const DATA_POPULATION = require("../data/centroids.json")
const DATA_REFERENCE = require("../data/hexgrid.geojson")

// https://deck.gl/docs/api-reference/layers/column-layer
export const populationLayer = (mapState) =>
  new ColumnLayer({
    id: "population",
    data: DATA_POPULATION,
    diskResolution: 6,
    radius: 100,
    extruded: true,
    pickable: true,
    elevationScale: 5,
    getPosition: (d) => [d.centroid[1], d.centroid[0]],
    getFillColor: (d) => [48, 128, d.value * 15, 255],
    getLineColor: [0, 0, 0],
    getElevation: (d) => d.value
    /*
    diskResolution: 6,
    radius: 250,
    extruded: true,
    pickable: true,
    elevationScale: 5000,
    getPosition: (d) => d.centroid,
    getFillColor: (d) => [48, 128, d.value * 255, 255],
    getLineColor: [0, 0, 0],
    getElevation: (d) => d.value
    */
  });

// https://deck.gl/docs/api-reference/layers/geojson-layer
export const referenceLayer = (mapState) =>
  new GeoJsonLayer({
    id: "reference",
    data: DATA_REFERENCE,
    // Styles
    filled: true,
    pointRadiusMinPixels: 2,
    pointRadiusScale: mapState.airportRadius,
    getPointRadius: (f) => 11 - f.properties.scalerank,
    getFillColor: [200, 0, 80, 180],
    // Interactive props
    pickable: true,
    autoHighlight: true,
    updateTriggers: {
      getPointRadiusScale: [mapState.airportRadius]
    },
    // getTooltip: ({object}) => object && {
    //   html: `<h2>${object.name}</h2><div>${object.message}</div>`,
    //   style: {
    //     backgroundColor: '#f00',
    //     fontSize: '0.8em'
    //   }
    // },
    onClick: (info) =>
      // eslint-disable-next-line
      info.object &&
      alert(`${info.object.properties.label}`)
  });
