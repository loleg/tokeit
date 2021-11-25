import "./styles.css";
import { Deck } from "@deck.gl/core";
import mapboxgl from "maplibre-gl";

const INITIAL_VIEW_STATE = {
  longitude: 8.3095 ,
  latitude: 47.05,
  zoom: 13,
  bearing: 0,
  pitch: 1
};

const MAP_STYLE =
  require('../data/swiss_style.json');
  // 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';
  // 'https://api.maptiler.com/tiles/v3/tiles.json?key=7r2P9F2eOXwOW6g3HfCo';
  // 'https://raw.githubusercontent.com/nst-guide/osm-liberty-topo/gh-pages/style.json';

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
    pitch: INITIAL_VIEW_STATE.pitch,
    hash: true
  });

  function calcTokits(num) {
    return Math.round(num / 150);
  }
  function calcTokits2(num) {
    return Math.round(calcTokits(num) * 1.2);
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
      html:
            `<div class="coord">&#x1F4CC; ${object.properties.label}</div>` +
            `<div class="col">` +
              `<div class="num">${calcTokits(object.properties.NUMPOINTS)}</div>` +
              `<span class="label">in 2020</span>` +
              `<div class="tower" style="height:${calcTokits(object.properties.NUMPOINTS)}em"></div>` +
            `</div><div class="col future">` +
              `<div class="num">${calcTokits2(object.properties.NUMPOINTS)}</div>` +
              `<span class="label">in 2030?</span>` +
              `<div class="tower" style="height:${calcTokits2(object.properties.NUMPOINTS)}em"></div>` +
            `</div>`
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
