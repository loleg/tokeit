import { GeoJsonLayer, ArcLayer, ColumnLayer } from "@deck.gl/layers";
// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

// https://deck.gl/docs/api-reference/layers/column-layer
export const columnLayer = (mapState) =>
  new ColumnLayer({
    id: "column-layer",
    data: "./data/centroids.json",
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
export const airportLayer = (mapState) =>
  new GeoJsonLayer({
    id: "airports",
    data: AIR_PORTS,
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
    onClick: (info) =>
      // eslint-disable-next-line
      info.object &&
      alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
  });

// https://deck.gl/docs/api-reference/layers/arc-layer
export const arcLayer = (mapState) =>
  new ArcLayer({
    id: "arcs",
    data: AIR_PORTS,
    dataTransform: (d) => d.features.filter((f) => f.properties.scalerank < 4),
    // Styles
    getSourcePosition: (f) => [-0.4531566, 51.4709959], // London
    getTargetPosition: (f) => f.geometry.coordinates,
    getSourceColor: [0, 128, 200],
    getTargetColor: [200, 0, 80],
    getWidth: () => mapState.arcWidth,
    getHeight: () => mapState.arcHeight,
    updateTriggers: {
      getWidth: mapState.arcWidth,
      getHeight: mapState.arcHeight
    }
  });
