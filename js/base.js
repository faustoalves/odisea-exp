import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FybG9zdG9sZWRvIiwiYSI6ImNpbXZlMWRnMzAycHZ1cGtrZzQ4YW1yZ3IifQ.uG-dnwIGk10NK08Tn8fU-Q";

const map = new mapboxgl.Map({
  container: "map", // container ID
  center: [-74.5, 40], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});
