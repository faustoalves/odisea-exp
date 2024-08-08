import {actualPosition, map, objects3d, setActualPosition} from "../app.js";
import {generatePath, getCameraParameters, getPosition} from "./positions.js";

export function moveToPosition(position) {
  if (position !== actualPosition.location) {
    let values = getCameraParameters(position);
    let path = generatePath(getPosition(actualPosition.location), getPosition(position));
    let initialPath = path.slice(0, 10);
    let middlePath = path.slice(10, path.length - 10);
    let finalPath = path.slice(path.length - 10, path.length);
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
      width: 8,
      color: "#224455",
    });

    tb.add(line);
    var line2 = tb.line({
      geometry: path,
      width: 2,
      color: "#339988",
    });

    tb.add(line);
    tb.add(line2);

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
          tb.remove(line2);
          setActualPosition(getCameraParameters(position));
        });
      });
    });
    objects3d.boat.playAnimation({animation: 0, duration: duration + 5000});

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
