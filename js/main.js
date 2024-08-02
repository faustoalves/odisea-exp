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
        // rotationOffset: 90,
      };

      tb.loadObj(options, (model) => {
        boat = model.setCoords([actualPosition.lat, actualPosition.lng]);
        // boat.addEventListener("ObjectChanged", onObjectChanged, false);
        tb.add(boat);
        globe = new Globe(map, boat, actualPosition);
      });
    },

    render: function () {
      tb.update();
    },
  });
});
const tb = (window.tb = new Threebox(map, map.getCanvas().getContext("webgl"), {
  defaultLights: true,
}));
// function onObjectChanged(e) {
//   console.log(e.detail.object, e.detail.action);
//   let model = e.detail.object; //here's the object already modified
//   let action = e.detail.action; //here's the action that changed the object
// }

document.getElementById("position_1").addEventListener("click", function (e) {
  globe.move(e.target.id);
});
document.getElementById("position_2").addEventListener("click", function (e) {
  globe.move(e.target.id);
});
document.getElementById("position_3").addEventListener("click", function (e) {
  globe.move(e.target.id);
});
document.getElementById("position_4").addEventListener("click", function (e) {
  globe.move(e.target.id);
});
document.getElementById("position_5").addEventListener("click", function (e) {
  globe.move(e.target.id);
});
document.getElementById("position_6").addEventListener("click", function (e) {
  globe.move(e.target.id);
});
document.getElementById("position_7").addEventListener("click", function (e) {
  globe.move(e.target.id);
});
document.getElementById("position_8").addEventListener("click", function (e) {
  globe.move(e.target.id);
});
document.getElementById("position_9").addEventListener("click", function (e) {
  globe.move(e.target.id);
});
