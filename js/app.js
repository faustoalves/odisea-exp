let targetMaps = new Array(
  // Year 1
  {
    location: "position_1",
    zoom: 12,
    bearing: 20,
    pitch: 75,
    lat: 26.963978769399944,
    lng: 37.231386883979994,
    intervalToNext: [
      {
        lat: 27.934529791017354,
        lng: 33.19523193924837,
      },
      {
        lat: 32.41524413682362,
        lng: 31.201714860652473,
      },
      {
        lat: 33.889085768934024,
        lng: 27.291128987015185,
      },
      {
        lat: 37.33406404419836,
        lng: 24.453515671169555,
      },
    ],
  },
  {
    location: "position_2",
    zoom: 13,
    bearing: 120,
    pitch: 80,
    lat: 37.26146507942079,
    lng: 23.717636220859177,
    intervalToNext: [
      {
        lat: 37.33594829578132,
        lng: 22.030962467904487,
      },
      {
        lat: 38.506893307421905,
        lng: 20.46265973851682,
      },
      {
        lat: 39.31163552174604,
        lng: 17.978613814378022,
      },
      {
        lat: 39.31201302718907,
        lng: 16.23448166515857,
      },
    ],
  },
  {
    location: "position_3",
    zoom: 12.5,
    bearing: 270,
    pitch: 60,
    lat: 44.418596118918856,
    lng: 11.709731125836711,
    intervalToNext: [
      {
        lat: 53.68470231670233,
        lng: 12.5638536878852,
      },
      {
        lat: 54.463493286382516,
        lng: 6.255595877034452,
      },
      {
        lat: 54.47284137184383,
        lng: 1.2222588171333229,
      },
      {
        lat: 55.31957944978018,
        lng: -6.594694210893408,
      },
    ],
  },
  {
    location: "position_4",
    zoom: 11.8,
    bearing: 50,
    pitch: 75,
    lat: 52.610975277905254,
    lng: -7.674663367317734,
    intervalToNext: [
      {
        lat: 48.51092992954051,
        lng: -9.169737884101991,
      },
      {
        lat: 44.813589495567584,
        lng: -11.270269759550075,
      },
      {
        lat: 42.28564153813937,
        lng: -13.531209285908048,
      },
      {
        lat: 40.87474672335222,
        lng: -15.008761590700217,
      },
    ],
  },
  {
    location: "position_5",
    zoom: 11,
    bearing: 50,
    pitch: 75,
    lat: 41.47171823467963,
    lng: -16.330914564358494,
    intervalToNext: [
      {
        lat: 42.64375993357885,
        lng: -16.330914564358494,
      },
      {
        lat: 44.959028745892084,
        lng: -14.942124332696721,
      },
      {
        lat: 47.011050262586764,
        lng: -13.056050027981286,
      },
      {
        lat: 49.51410571600951,
        lng: -11.96097661330758,
      },
    ],
  },
  {
    location: "position_6",
    zoom: 11,
    bearing: 50,
    pitch: 75,
    lat: 53.88765486558336,
    lng: -11.897884844543242,
    intervalToNext: [
      {
        lat: 58.019528484709866,
        lng: -9.7437904796205,
      },
      {
        lat: 61.31936491940522,
        lng: -10.250415175988422,
      },
      {
        lat: 65.95641428694722,
        lng: -8.283167417008215,
      },
      {
        lat: 71.14082375880847,
        lng: -7.54569933813535,
      },
      {
        lat: 74.17765023898369,
        lng: -5.414446321750546,
      },
    ],
  },
  {
    location: "position_7",
    zoom: 11,
    bearing: 50,
    pitch: 75,
    lat: 75.89361957301202,
    lng: -2.808577264408868,
    intervalToNext: [
      {
        lat: 76.92001494047196,
        lng: -0.22805706001804538,
      },
      {
        lat: 79.33461766209791,
        lng: 2.9996650073082805,
      },
      {
        lat: 92.6246532503962,
        lng: 10.078372420614997,
      },
      {
        lat: 94.22345999656511,
        lng: 9.144146040717388,
      },
      {
        lat: 94.94854500288568,
        lng: 8.755710734068984,
      },
    ],
  },
  {
    location: "position_8",
    zoom: 11,
    bearing: 50,
    pitch: 75,
    lat: 96.38041626510397,
    lng: 7.67086360346741,
    intervalToNext: [
      {
        lat: 97.76190998897209,
        lng: 7.2844591588173415,
      },
      {
        lat: 99.3725868512978,
        lng: 7.13005728529086,
      },
      {
        lat: 99.2080408602323,
        lng: 5.598903607525756,
      },
      {
        lat: 99.5975414833618,
        lng: 4.320390794725327,
      },
      {
        lat: 100.80156780758284,
        lng: 2.9702707367689385,
      },
      {
        lat: 102.95699446772596,
        lng: 1.7079635037819685,
      },
    ],
  },
  {
    location: "position_9",
    zoom: 11,
    bearing: 50,
    pitch: 75,
    lat: 104.507803915262,
    lng: 0.8451313452648321,
    intervalToNext: [
      { lat: 92, lng: 92 },
      { lat: 94, lng: 94 },
      { lat: 96, lng: 96 },
      { lat: 98, lng: 98 },
    ],
  }
);

const getPosition = (location) => {
  let position;
  for (let index = 0; index < targetMaps.length; index++) {
    if (targetMaps[index].location === location) {
      position = index;
    }
  }
  return position;
};

const getCameraParameters = (location) => {
  let parameters;
  for (let index = 0; index < targetMaps.length; index++) {
    if (targetMaps[index].location === location) {
      parameters = targetMaps[index];
    }
  }
  return parameters;
};

const generatePath = (initialPosition, finalPosition) => {
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

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FybG9zdG9sZWRvIiwiYSI6ImNpbXZlMWRnMzAycHZ1cGtrZzQ4YW1yZ3IifQ.uG-dnwIGk10NK08Tn8fU-Q";

var actualPosition = getCameraParameters("position_1");

var origin = [actualPosition.lat, actualPosition.lng];

var building;
const map = new mapboxgl.Map({
  container: "map",
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/carlostoledo/cly4imkcj00ib01qjga6t6bbw/draft",
  center: origin,
  projection: "globe",
  zoom: actualPosition.zoom,
  antialias: true,
  pitch: actualPosition.pitch,
  bearing: actualPosition.bearing,
  interactive: true,
  transitionZoomLevel: 5.9, // create the gl context with MSAA antialiasing, so custom layers are antialiased
});

// eslint-disable-next-line no-undef
const tb = (window.tb = new Threebox(map, map.getCanvas().getContext("webgl"), {
  defaultLight: true,
  realSunlight: true,
  terrain: true,
  sky: false,
}));

map.on("style.load", () => {
  map.addLayer({
    id: "custom-threebox-model",
    type: "custom",
    renderingMode: "3d",
    onAdd: function () {
      const scale = 400;
      const options = {
        obj: "/assets/odisea.gltf",
        type: "gltf",
        scale: { x: scale, y: scale, z: scale },
        units: "meters",
        rotation: { x: 95, y: 270, z: 0 },
        anchor: "center",
      };

      tb.loadObj(options, (model) => {
        building = model.setCoords(origin);
        building.addEventListener("ObjectChanged", onObjectChanged, false);
        tb.add(building);
      });
    },

    render: function () {
      tb.update();
    },
  });
});
// .on("click", function (e) {
//   var pt = [e.lngLat.lng, e.lngLat.lat];
//   gotoSpecificPosition(pt);
// });

function onObjectChanged(e) {
  let model = e.detail.object; //here's the object already modified
  let action = e.detail.action; //here's the action that changed the object
}
// function travelPath1(destination) {
//   console.log(destination);
//   // request directions. See https://docs.mapbox.com/api/navigation/#directions for details

//   var url =
//     "https://api.mapbox.com/directions/v5/mapbox/walking/" +
//     [origin, destination].join(";") +
//     "?geometries=geojson&access_token=" +
//     "pk.eyJ1IjoiY2FybG9zdG9sZWRvIiwiYSI6ImNpbXZlMWRnMzAycHZ1cGtrZzQ4YW1yZ3IifQ.uG-dnwIGk10NK08Tn8fU-Q";

//   fetchFunction(url, function (data) {
//     // extract path geometry from callback geojson, and set duration of travel
//     var options = {
//       path: data.routes[0].geometry.coordinates,
//       duration: 4000,
//     };

//     console.log("options: " + options.path);

//     // start the truck animation with above options, and remove the line when animation ends
//     building.followPath(options, function () {
//       // tb.remove(line);
//     });
//     origin = destination;
//   });
// }
// async function travelPath(destination) {
//   let points = [P2(origin[0], origin[1]), P2(destination[0], destination[1])];
//   let interpolatedPoints = interpolatePath(points, 0.1);

//   console.log("interpolatedPoints", interpolatedPoints);
//   let values = interpolatedPoints.map((item) => {
//     return [item.x, item.y];
//   });

//   if (values.length <= 2) {
//     values = [
//       [(origin[0] + destination[0]) / 2, origin[1] / destination[1] / 2],
//       [destination[0], destination[1]],
//     ];
//   } else {
//     values.push([destination[0], destination[1]]);
//   }
//   console.log();
//   console.log("values", values);
//   origin = destination;
//   building.followPath({ path: values, duration: 1000 }, function (err, result) {
//     building.setCoords(destination);
//   });

// var url =
//   "https://api.mapbox.com/directions/v5/mapbox/walking/" +
//   [origin, destination].join(";") +
//   "?geometries=geojson&access_token=" +
//   "pk.eyJ1IjoiY2FybG9zdG9sZWRvIiwiYSI6ImNpbXZlMWRnMzAycHZ1cGtrZzQ4YW1yZ3IifQ.uG-dnwIGk10NK08Tn8fU-Q";

// fetchFunction(url, function (data) {
//   // extract path geometry from callback geojson, and set duration of travel
//   var options = {
//     path: data.routes[0].geometry.coordinates,
//     duration: 4000,
//   };

//   // start the truck animation with above options, and remove the line when animation ends
//   building.followPath(options, function () {
//     // tb.remove(line);
//   });
//   origin = destination;
// });
// }

//convenience function for fetch

document.getElementById("position_1").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_2").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_3").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_4").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_5").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_6").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_7").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_8").addEventListener("click", function (e) {
  move(e.target.id);
});
document.getElementById("position_9").addEventListener("click", function (e) {
  move(e.target.id);
});

const move = (position) => {
  if (position !== actualPosition.location) {
    let values = getCameraParameters(position);
    let path = generatePath(
      getPosition(actualPosition.location),
      getPosition(position)
    );

    let duration = path.length * 1000 > 10000 ? 10000 : path.length * 1000;
    building.setCoords([actualPosition.lat, actualPosition.lng]);
    building.followPath({ path: path, duration: duration });
    map.flyTo({
      center: [values.lat, values.lng],
      duration: duration + 2000,
      zoom: values.zoom,
      bearing: values.bearing,
      pitch: values.pitch,
    });
    actualPosition = values;
  }
};
