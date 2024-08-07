import {getCompletedPath} from "./lib/completedPath.js";
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
  passiveRendering: true,
}));

async function loadCompletedPositions() {
  let values = await getCompletedPath();
  var lineCompleted = tb.line({
    geometry: values,
    width: 2,
    color: "#ff0000",
  });

  tb.add(lineCompleted);
}

function animate() {
  requestAnimationFrame(animate);
}
map.on("style.load", () => {
  animate();
  map.addLayer({
    id: "boat-layer",
    type: "custom",
    renderingMode: "3d",
    onAdd: function () {
      threeBox.loadObj(boatOptions, (e) => {
        objects3d.boat = e.setCoords(actualPosition.coordinates);

        // objects3d.boat.play();
        threeBox.add(objects3d.boat);
      });
      animate();
      loadCompletedPositions();
    },
    render: function () {
      threeBox.update();
    },
  });
});

let stats, gui, guiStatsEl;

export function setActualPosition(newActualPosition) {
  console.log("setActualPosition", newActualPosition);
  actualPosition = newActualPosition;
  objects3d.boat.playAnimation({animation: 0, duration: 999999999999999});
}

var buttons = document.querySelectorAll(".btn-position");
buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    moveToPosition(e.target.id);
  });
});
