import { initMap } from "./map";
import { populationLayer, referenceLayer } from "./layers";

const map = initMap(document.getElementById("container"));

map.addLayers([populationLayer, referenceLayer]);

document.getElementById("info").onclick = () => {
  document.getElementById("info").style.display = 'none';
};
