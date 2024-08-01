import { targetMaps } from "./mapValues.js";

export const generatePath = (initialPosition, finalPosition) => {
  let points = [];
  if (initialPosition < finalPosition) {
    for (let index = initialPosition; index <= finalPosition; index++) {
      points.push({ lat: targetMaps[index].lat, lng: targetMaps[index].lng });
      if (index !== finalPosition) {
        targetMaps[index].intervalToNext.map((item) => {
          points.push(item);
        });
      }
    }
  } else {
    for (let index = initialPosition; index >= finalPosition; index--) {
      if (index !== initialPosition) {
        targetMaps[index].intervalToNext.reverse().map((item) => {
          points.push(item);
        });
      }
      points.push({ lat: targetMaps[index].lat, lng: targetMaps[index].lng });
    }
  }
  return points.map((item) => [item.lat, item.lng]);
};

export const getCameraParameters = (location) => {
  let parameters;
  for (let index = 0; index < targetMaps.length; index++) {
    if (targetMaps[index].location === location) {
      parameters = targetMaps[index];
    }
  }
  return parameters;
};

export const getPosition = (location) => {
  let position;
  for (let index = 0; index < targetMaps.length; index++) {
    if (targetMaps[index].location === location) {
      position = index;
    }
  }
  return position;
};
