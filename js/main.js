import {Globe} from "./globe.js";
import {createMap} from "./map.js";
var globe;
var {map, actualPosition} = createMap();
var boat;
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
        scale: {x: scale, y: scale, z: scale},
        units: "meters",
        rotation: {x: 95, y: 270, z: 0},
        anchor: "center",
      };

      tb.loadObj(options, (model) => {
        boat = model.setCoords([actualPosition.lat, actualPosition.lng]);
        tb.add(boat);
        globe = new Globe(map, boat, actualPosition);
        globe.initMove();
      });
    },
    render: function () {
      boat.rotation.z = boat.rotation.z + 0.01;
      tb.update();
    },
  });
});
const tb = (window.tb = new Threebox(map, map.getCanvas().getContext("webgl"), {
  defaultLights: true,
  passiveRendering: false,
}));

var buttons = document.querySelectorAll(".btn-position");
buttons.forEach((button) => {
  console.log("button");
  button.addEventListener("click", function (e) {
    globe.move(e.target.id);
  });
});
