import { initMap } from "./map";
import { populationLayer, referenceLayer } from "./layers";

//import { ToolBar } from "./ToolSet";
//import { SliderTool } from "./SliderTool";

const map = initMap(document.getElementById("container"));
map.addLayers([populationLayer, referenceLayer]);

/*
const toolbar = new ToolBar({
  toolsContainer: document.getElementById("tools")
});

const arcWidthSlider = new SliderTool({
  id: "slider",
  min: 1,
  max: 5,
  handler: (value) => {
    map.mapState.arcWidth = value;
    map.redraw();
  }
});
toolbar.addTool(arcWidthSlider);
*/

// Possible goals:
// Create a toolbar.removeTool function and ensure everything is cleaned up
// Track tools in the Tool class
// Create a toggle tool
// Create a color picker
// Create a layer that updates in realtime
// Vector to raster to map?
// Deliberate start test with broken function due to arrow function
// Show values of sliders next to slider

// Refactoring exercises
// (original) refactorings? decouple toolbar state and map state
// (original) Refactor intitial layers so they're injected at startup rather than being inbuilt in the map setup

// UI random ideas
// Free draw (annotate) shit on map -> get canvas -> handle mouse events -> store state -> render on map (with fixed zoom level) -> extension = handle zoom
