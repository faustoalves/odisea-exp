export const mapOptions = {
  container: "map",
  style: "mapbox://styles/carlostoledo/cly4imkcj00ib01qjga6t6bbw/draft",
  center: origin,
  projection: "globe",
  zoom: actualPosition.zoom,
  antialias: true,
  pitch: actualPosition.pitch,
  bearing: actualPosition.bearing,
  interactive: true,
  transitionZoomLevel: 5.9,
};
