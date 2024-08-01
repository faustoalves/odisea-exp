import {mapOptions} from "./const.js";
import {getCameraParameters} from "./values.js";

export const createMap = () => {
  var actualPosition = getCameraParameters("position_1");
  var boat;
  mapboxgl.accessToken =
    "pk.eyJ1IjoiY2FybG9zdG9sZWRvIiwiYSI6ImNpbXZlMWRnMzAycHZ1cGtrZzQ4YW1yZ3IifQ.uG-dnwIGk10NK08Tn8fU-Q";
  var map = new mapboxgl.Map({
    ...mapOptions,
    center: [actualPosition.lat, actualPosition.lng],
    zoom: actualPosition.zoom,
    pitch: actualPosition.pitch,
    bearing: actualPosition.bearing,
  });

  return {
    map: map,
    actualPosition: actualPosition,
  };
};
