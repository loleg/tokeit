import "./styles.css";
import { Deck } from "@deck.gl/core";
import mapboxgl from "maplibre-gl";

const INITIAL_VIEW_STATE = {
  longitude: 8.31,
  latitude: 47.054,
  zoom: 12,
  bearing: 0,
  pitch: 20
};

const MAP_STYLE =
  'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json';
  // 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL';
  // "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

class MapState {
  constructor() {
    // this.arcWidth = 5;
    // this.airportRadius = 5000;
  }
}

export function initMap(containerElement) {
  const mapState = new MapState();
  const mapElement = document.createElement("div");
  const deckCanvas = document.createElement("canvas");
  const layers = [];
  mapElement.id = "map";
  deckCanvas.id = "deck-canvas";
  containerElement.appendChild(mapElement);
  containerElement.appendChild(deckCanvas);

  const maplibre = new mapboxgl.Map({
    container: "map",
    style: MAP_STYLE,
    // Note: deck.gl will be in charge of interaction and event handling
    interactive: false,
    center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
    zoom: INITIAL_VIEW_STATE.zoom,
    bearing: INITIAL_VIEW_STATE.bearing,
    pitch: INITIAL_VIEW_STATE.pitch
  });

  function calcTokits(num) {
    return Math.round(num / 100);
  }

  const deck = new Deck({
    canvas: "deck-canvas",
    width: "100%",
    height: "100%",
    initialViewState: INITIAL_VIEW_STATE,
    controller: true,
    onViewStateChange: ({ viewState }) => {
      maplibre.jumpTo({
        center: [viewState.longitude, viewState.latitude],
        zoom: viewState.zoom,
        bearing: viewState.bearing,
        pitch: viewState.pitch
      });
    },
    getTooltip: ({object}) => object && object.properties && {
      html: `<div class="num">${calcTokits(object.properties.NUMPOINTS)}</div><span class="label">Tokits</span><div class="coord">&#x1F4CC; ${object.properties.label}</div>`
    }
  });

  const redraw = () => {
    deck.setProps({ layers: layers.map((l) => l(mapState)) });
  };

  const addLayers = (deckLayers) => {
    layers.push(...deckLayers);
    redraw();
  };
  const removeLayer = () => {
    // TODO
  };

  return {
    maplibre,
    deck,
    mapState,
    addLayers,
    removeLayer,
    redraw
  };
}
