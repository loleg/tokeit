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
  // require('../data/swiss_style.json');
  'https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/style.json?key=7r2P9F2eOXwOW6g3HfCo';
  // 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';
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
    // style: MAP_STYLE,
    // Note: deck.gl will be in charge of interaction and event handling
    interactive: false,
    center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
    zoom: INITIAL_VIEW_STATE.zoom,
    bearing: INITIAL_VIEW_STATE.bearing,
    pitch: INITIAL_VIEW_STATE.pitch,
    hash: true
  });

  const POP_TOTAL = 83215;

  function calcTokits(num) {
    return Math.round(num / 150);
  }
  function calcTokits2(num) {
    return Math.round(calcTokits(num) * 1.2);
  }
  function calcTokits2plus(num) {
    let c = calcTokits(num);
    return Math.round(c * 1.2) - c;
  }
  function calcTokitsPercent(num) {
    let pct = 100*num / POP_TOTAL;
    if (pct == 0) return "0";
    if (pct < 1) return "< 1";
    return Math.round(pct);
  }

  const deck = new Deck({
    canvas: "deck-canvas",
    width: "100%",
    height: "100%",
    initialViewState: INITIAL_VIEW_STATE,
    controller: {doubleClickZoom: false, inertia: true},
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
          (calcTokits(object.properties.NUMPOINTS) > 0 ?
            `<div class="num">${calcTokits(object.properties.NUMPOINTS)}</div>` +
            `<span class="label">in 2020</span>` +
            `<div class="tower" style="height:${calcTokits(object.properties.NUMPOINTS)}em"></div>` +
            (calcTokits2plus(object.properties.NUMPOINTS) > 0 ?
              `<div class="future">` +
                `<div class="tower" style="height:${calcTokits2plus(object.properties.NUMPOINTS)}em"></div>` +
                `<div class="num">+${calcTokits2plus(object.properties.NUMPOINTS)}</div>` +
                `<span class="label">in 2030</span>` +
              `</div>` : ``) : ``) +
          `<span class="label actual">🧍 ${object.properties.NUMPOINTS}</span>` +
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
