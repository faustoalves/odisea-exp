import {actualPosition, map, objects3d, setActualPosition} from "../app.js";
import {generatePath, getCameraParameters, getPosition} from "./positions.js";

export function moveToPosition(position) {
  if (position !== actualPosition.location) {
    let values = getCameraParameters(position);
    let path = generatePath(getPosition(actualPosition.location), getPosition(position));
    let initialPath = path.slice(0, 4);
    let middlePath = path.slice(4, path.length - 4);
    let finalPath = path.slice(path.length - 4, path.length);
    objects3d.boat.stop();
    // console.log(path);
    // console.log(path.length);
    // console.log(actualPosition.coordinates, initialPath, finalPath);

    // var lineGeometry = options.path.map(function (coordinate) {
    //   return coordinate.concat([15]);
    // });

    // create and add line object
    var line = tb.line({
      geometry: path,
      width: 5,
      color: "steelblue",
    });

    tb.add(line);

    let duration = path.length * 800 > 8000 ? 8000 : path.length * 800;
    objects3d.boat.setCoords([
      actualPosition.coordinates[0] + Math.random() * 0.1,
      actualPosition.coordinates[1] + Math.random() * 0.1,
    ]);
    objects3d.boat.followPath({path: initialPath, duration: 3000}, function () {
      objects3d.boat.followPath({path: middlePath, duration: duration - 5000}, function () {
        objects3d.boat.followPath({path: finalPath, duration: 3000}, function () {
          objects3d.boat.stop();
          tb.remove(line);
          setActualPosition(getCameraParameters(position));
        });
      });
    });

    map.flyTo({
      center: values.coordinates,
      duration: duration,
      essential: true,
      curve: 0.75,
      zoom: values.zoom,
      bearing: values.bearing,
      pitch: values.pitch,
      easing: function (t) {
        return t;
      },
    });
  }
}
