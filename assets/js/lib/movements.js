import {actualPosition, objects3d, setActualPath, setActualPosition} from "../app.js";
import {generatePath, getCameraParameters, getPosition} from "./positions.js";

export function moveToPosition(position) {
  console.log("Moving to position", position);
  if (position !== actualPosition.location) {
    let diff = getPosition(actualPosition.location) - getPosition(position);
    if (diff < 0) {
      diff = -diff;
    }

    let values = getCameraParameters(position);
    let path = generatePath(getPosition(actualPosition.location), getPosition(position));

    let cameraRouteDistance = turf.lineDistance(turf.lineString(path));

    let duration = (cameraRouteDistance + diff * 1500) * 1.2;
    console.log(duration);

    objects3d.boat.stop();
    setActualPath({path: path, duration: duration, bearing: values.bearing, pitch: values.pitch});

    objects3d.boat.setCoords([
      actualPosition.coordinates[0] + Math.random() * 0.1,
      actualPosition.coordinates[1] + Math.random() * 0.1,
    ]);

    objects3d.boat.followPath({path: path, duration: duration});
    setActualPosition(getCameraParameters(position));

    objects3d.boat.playAnimation({animation: 0, duration: duration});
  }
}
