import {actualPosition, map, objects3d} from "../app.js";
import {generatePath, getCameraParameters, getPosition} from "./positions.js";

export function moveToPosition(position) {
  if (position !== actualPosition.location) {
    let values = getCameraParameters(position);
    let path = generatePath(getPosition(actualPosition.location), getPosition(position));
    let initialPath = path.slice(0, 4);
    let middlePath = path.slice(4, path.length - 4);
    let finalPath = path.slice(path.length - 4, path.length);

    let duration = path.length * 800 > 7000 ? 7000 : path.length * 800;

    objects3d.boat.setCoords(actualPosition.coordinates);
    objects3d.boat.followPath({path: initialPath, duration: 3000}, function () {
      objects3d.boat.followPath({path: middlePath, duration: duration - 5000}, function () {
        objects3d.boat.followPath({path: finalPath, duration: 3000}, function () {});
      });
    });

    map.flyTo({
      center: values.coordinates,
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
  }
}
