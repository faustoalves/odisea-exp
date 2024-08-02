import {mapOptions} from "./lib/map.js";
import {boatOptions} from "./lib/models.js";
import {moveToPosition} from "./lib/movements.js";
import {getCameraParameters} from "./lib/positions.js";

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
const threeBox = (window.tb = new Threebox(map, map.getCanvas().getContext("webgl"), {
  defaultLights: true,
  passiveRendering: false,
}));

map.on("style.load", () => {
  map.addLayer({
    id: "boat-layer",
    type: "custom",
    renderingMode: "3d",
    onAdd: function () {
      threeBox.loadObj(boatOptions, (e) => {
        objects3d.boat = e.setCoords(actualPosition.coordinates);
        threeBox.add(objects3d.boat);
      });
    },
    render: function () {
      threeBox.update();
    },
  });
});

var buttons = document.querySelectorAll(".btn-position");
buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    moveToPosition(e.target.id);
    actualPosition = getCameraParameters(e.target.id);
  });
});
