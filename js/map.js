import { mapOptions } from "./const.js";
import { getCameraParameters } from "./values.js";

export const createMap = () => {
  let actualPosition = getCameraParameters("position_1");
  console.log(actualPosition);
  mapboxgl.accessToken =
    "pk.eyJ1IjoiY2FybG9zdG9sZWRvIiwiYSI6ImNpbXZlMWRnMzAycHZ1cGtrZzQ4YW1yZ3IifQ.uG-dnwIGk10NK08Tn8fU-Q";
  var map = new mapboxgl.Map({
    ...mapOptions,
    center: [actualPosition.lat, actualPosition.lng],
    zoom: actualPosition.zoom,
    pitch: actualPosition.pitch,
    bearing: actualPosition.bearing,
  });
  return map;
};

// eslint-disable-next-line no-undef

map.on("style.load", () => {
  map.addLayer({
    id: "custom-threebox-model",
    type: "custom",
    renderingMode: "3d",
    onAdd: function () {
      const scale = 800;
      const options = {
        obj: "/assets/odisea.gltf",
        type: "gltf",
        scale: { x: scale, y: scale, z: scale },
        units: "meters",
        rotation: { x: 95, y: 270, z: 0 },
        anchor: "center",
        // rotationOffset: 90,
      };

      tb.loadObj(options, (model) => {
        building = model.setCoords(origin);
        building.addEventListener("ObjectChanged", onObjectChanged, false);
        tb.add(building);
      });
    },

    render: function () {
      tb.update();
    },
  });
});

function onObjectChanged(e) {
  console.log(e.detail);
  let model = e.detail.object; //here's the object already modified
  let action = e.detail.action; //here's the action that changed the object
}
