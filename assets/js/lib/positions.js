import { travelValues } from "./travelValues.js";

export const generatePath = (
  initialPosition,
  finalPosition,
  duration = 8000
) => {
  let points = [];
  if (initialPosition < finalPosition) {
    for (let index = initialPosition; index <= finalPosition; index++) {
      points.push(travelValues[index].coordinates);
      if (index !== finalPosition) {
        travelValues[index].intervalToNext.map((item) => {
          points.push([item[0], item[1]]);
        });
      }
    }
  } else {
    for (let index = initialPosition; index >= finalPosition; index--) {
      if (index !== initialPosition) {
        let values = [...travelValues[index].intervalToNext];
        values.reverse().map((item) => {
          points.push(item);
        });
      }
      points.push(travelValues[index].coordinates);
    }
  }
  let cameraRouteDistance = turf.lineDistance(turf.lineString(points));
  let newPoints = [];
  for (let index = 0; index < duration / 100; index++) {
    newPoints.push(
      turf.along(turf.lineString(points), (cameraRouteDistance * index) / 100)
        .geometry.coordinates
    );
  }
  return points;
};

export const getCameraParameters = (location) => {
  let parameters;
  for (let index = 0; index < travelValues.length; index++) {
    if (travelValues[index].location === location) {
      parameters = travelValues[index];
    }
  }
  return parameters;
};

export const getPosition = (location) => {
  let position;
  for (let index = 0; index < travelValues.length; index++) {
    if (travelValues[index].location === location) {
      position = index;
    }
  }
  return position;
};
