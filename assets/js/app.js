import Stats from "https://threejs.org/examples/jsm/libs/stats.module.js";
import { mapOptions } from "./lib/map.js";
import { boatOptions } from "./lib/models.js";
import { moveToPosition } from "./lib/movements.js";
import { getCameraParameters } from "./lib/positions.js";
// Transitional properties
export var actualPosition = getCameraParameters("position_1");
export var isMoving = false;

// Objects
export var objects3d = {
  boat: null,
};

// MapBox Token
mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FybG9zdG9sZWRvIiwiYSI6ImNpbXZlMWRnMzAycHZ1cGtrZzQ4YW1yZ3IifQ.uG-dnwIGk10NK08Tn8fU-Q";

// Create map
export var map = new mapboxgl.Map({
  ...mapOptions,
  center: actualPosition.coordinates,
  zoom: actualPosition.zoom,
  pitch: actualPosition.pitch,
  bearing: actualPosition.bearing,
});

// Create Three Box
const threeBox = (window.tb = new Threebox(
  map,
  map.getCanvas().getContext("webgl"),
  {
    defaultLights: true,
    passiveRendering: false,
  }
));

map.on("style.load", () => {
  // stats
  stats = new Stats();
  map.getContainer().appendChild(stats.dom);

  map.addLayer({
    id: "boat-layer",
    type: "custom",
    renderingMode: "3d",
    onAdd: function () {
      threeBox.loadObj(boatOptions, (e) => {
        objects3d.boat = e.setCoords(actualPosition.coordinates);
        threeBox.add(objects3d.boat);
      });
      gui = new GUI();
      gui.add(api, "method", Method).onChange(initMesh);
      gui.add(api, "count", 0, 10000).step(10).onChange(initMesh);
      gui.add(api, "animation").name("animation");

      var perfFolder = gui.addFolder("Performance");

      guiStatsEl = document.createElement("li");
      guiStatsEl.classList.add("gui-stats");

      perfFolder.$children.appendChild(guiStatsEl);
      perfFolder.open();
    },
    render: function () {
      threeBox.update();
      stats.update();
    },
  });
});

let stats, gui, guiStatsEl;

export function setActualPosition(newActualPosition) {
  console.log("setActualPosition", newActualPosition);
  actualPosition = newActualPosition;
}

var buttons = document.querySelectorAll(".btn-position");
buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    moveToPosition(e.target.id);
  });
});
