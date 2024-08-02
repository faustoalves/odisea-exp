import {generatePath, getCameraParameters, getPosition} from "./values.js";

export class Globe {
  constructor(map, boat, actualPosition) {
    this.map = map;
    this.boat = boat;
    this.actualPosition = actualPosition;
  }

  move = (position) => {
    if (position !== this.actualPosition.location) {
      let values = getCameraParameters(position);
      let path = generatePath(getPosition(this.actualPosition.location), getPosition(position));

      let duration = path.length * 2000;
      this.boat.setCoords([this.actualPosition.lat, this.actualPosition.lng]);
      this.boat.followPath({path: path, duration: duration}, function () {});

      this.map.flyTo({
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
      this.actualPosition = values;
    }
  };

  // get boat() {
  //   return this.boat;
  // }
  // set actualPosition(param) {
  //   this.actualPosition = param;
  // }
  // get actualPosition() {
  //   return this.actualPosition;
  // }
}
