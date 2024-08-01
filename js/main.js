import { createMap } from "./map.js";
import { getCameraParameters, getPosition, generatePath } from "./values.js";

var building;
var map = createMap();
console.log(map);

// eslint-disable-next-line no-undef
const tb = (window.tb = new Threebox(map, map.getCanvas().getContext("webgl"), {
  defaultLights: true,
}));

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

document.getElementById("position_1").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_2").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_3").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_4").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_5").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_6").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_7").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_8").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_9").addEventListener("click", function (e) {
  move(e.target.id);
});

const move = (position) => {
  if (position !== actualPosition.location) {
    let values = getCameraParameters(position);
    let path = generatePath(
      getPosition(actualPosition.location),
      getPosition(position)
    );

    let duration = path.length * 2000;
    building.setCoords([actualPosition.lat, actualPosition.lng]);
    building.followPath({ path: path, duration: duration }, function () {
      // tb.remove(line);
    });
    var lineGeometry = path.map(function (coordinate) {
      return coordinate;
    });

    // // create and add line object
    // line = tb.line({
    //   geometry: lineGeometry,
    //   width: 10,
    //   color: "white",
    //   opacity: 0.5,
    // });

    // tb.add(line);
    map.flyTo({
      center: [values.lat, values.lng],
      duration: duration,
      essential: true,
      curve: 0.75,
      zoom: values.zoom,
      bearing: Math.random() * 20 - 10,
      pitch: values.pitch,
      easing: function (t) {
        return t;
      },
    });
    actualPosition = values;
  }
};
