import { getCompletedPath } from "./lib/completedPath.js";
import { mapOptions } from "./lib/map.js";
import { boatOptions } from "./lib/models.js";
import { moveToPosition } from "./lib/movements.js";
import { getCameraParameters } from "./lib/positions.js";
// Transitional properties
export var actualPosition = getCameraParameters("position_1");
export var isMoving = false;

export var actualPath = {};
var enableMove = false;
var start;

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
    passiveRendering: true,
  }
));

function animate() {
  requestAnimationFrame(animate);
}
map.on("style.load", () => {
  animate();
  function frame(time) {
    if (enableMove) {
      if (!start) start = time;
      const phase = (time - start) / actualPath.duration;
      // phase is normalized between 0 and 1
      // when the animation is finished, reset start to loop the animation
      if (phase > 1) {
        // wait 1.5 seconds before looping
        enableMove = false;
      }

      let cameraRouteDistance = turf.lineDistance(
        turf.lineString(actualPath.path)
      );

      let zoomFactor = phase < 0.5 ? phase : (phase - 1) * -1;
      zoomFactor = zoomFactor > 0.25 ? 0.25 : zoomFactor;
      let zoom = 10 - zoomFactor * 5 * (cameraRouteDistance / 1000);
      zoom = zoom < 6 ? 6 : zoom;

      console.log((zoom - 12) * -1);

      let alongCamera = turf.along(
        turf.lineString(actualPath.path),
        cameraRouteDistance * phase
      ).geometry.coordinates;
      map.setCenter(alongCamera);
      map.setZoom(zoom);
    }

    window.requestAnimationFrame(frame);
  }

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
    },

    render: function () {
      threeBox.update();
    },
  });
  window.requestAnimationFrame(frame);
});

export function setActualPath(newValues) {
  console.log("setActualPath");
  actualPath = newValues;
  start = null;
  enableMove = true;
}

export function setActualPosition(newActualPosition) {
  console.log("setActualPosition");
  actualPosition = newActualPosition;
  objects3d.boat.playAnimation({ animation: 0, duration: 999999999999999 });
}

var buttons = document.querySelectorAll(".btn-position");
buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    moveToPosition(e.target.id);
  });
});
