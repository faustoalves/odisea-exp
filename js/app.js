mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FybG9zdG9sZWRvIiwiYSI6ImNpbXZlMWRnMzAycHZ1cGtrZzQ4YW1yZ3IifQ.uG-dnwIGk10NK08Tn8fU-Q";
var origin = [-122.434, 37.7353];
const P2 = (x, y) => ({x, y});

var building;
const map = new mapboxgl.Map({
  container: "map",
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/carlostoledo/cly4imkcj00ib01qjga6t6bbw/draft",
  center: origin,
  projection: "globe",
  zoom: 11,
  antialias: true,
  pitch: 65,
  interactive: true,
  transitionZoomLevel: 5.9, // create the gl context with MSAA antialiasing, so custom layers are antialiased
});

// eslint-disable-next-line no-undef
const tb = (window.tb = new Threebox(map, map.getCanvas().getContext("webgl"), {
  defaultLights: true,
}));

map
  .on("style.load", () => {
    map.addLayer({
      id: "custom-threebox-model",
      type: "custom",
      renderingMode: "3d",
      onAdd: function () {
        const scale = 400;
        const options = {
          obj: "/assets/odisea.gltf",
          type: "gltf",
          scale: {x: scale, y: scale, z: scale},
          units: "meters",
          rotation: {x: 95, y: 270, z: 0},
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
  })
  .on("click", function (e) {
    var pt = [e.lngLat.lng, e.lngLat.lat];
    gotoSpecificPosition(pt);
  });

function onObjectChanged(e) {
  let model = e.detail.object; //here's the object already modified
  let action = e.detail.action; //here's the action that changed the object
}
function travelPath1(destination) {
  console.log(destination);
  // request directions. See https://docs.mapbox.com/api/navigation/#directions for details

  var url =
    "https://api.mapbox.com/directions/v5/mapbox/walking/" +
    [origin, destination].join(";") +
    "?geometries=geojson&access_token=" +
    "pk.eyJ1IjoiY2FybG9zdG9sZWRvIiwiYSI6ImNpbXZlMWRnMzAycHZ1cGtrZzQ4YW1yZ3IifQ.uG-dnwIGk10NK08Tn8fU-Q";

  fetchFunction(url, function (data) {
    // extract path geometry from callback geojson, and set duration of travel
    var options = {
      path: data.routes[0].geometry.coordinates,
      duration: 4000,
    };

    console.log("options: " + options.path);

    // start the truck animation with above options, and remove the line when animation ends
    building.followPath(options, function () {
      // tb.remove(line);
    });
    origin = destination;
  });
}
async function travelPath(destination) {
  let points = [P2(origin[0], origin[1]), P2(destination[0], destination[1])];
  let interpolatedPoints = interpolatePath(points, 0.1);

  console.log("interpolatedPoints", interpolatedPoints);
  let values = interpolatedPoints.map((item) => {
    return [item.x, item.y];
  });

  if (values.length <= 2) {
    values = [
      [(origin[0] + destination[0]) / 2, origin[1] / destination[1] / 2],
      [destination[0], destination[1]],
    ];
  } else {
    values.push([destination[0], destination[1]]);
  }
  console.log();
  console.log("values", values);
  origin = destination;
  building.followPath({path: values, duration: 1000}, function (err, result) {
    building.setCoords(destination);
  });

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
}

//convenience function for fetch

var btn1 = document.getElementById("position-1");
var btn2 = document.getElementById("position-2");
var btn3 = document.getElementById("position-3");

btn1.addEventListener("click", function () {
  gotoSpecificPosition([-122.43383497872645, 37.7371135006192], 18);
});

btn2.addEventListener("click", function () {
  gotoSpecificPosition([-122.42409931012423, 37.744159131288384], 17);
});

btn3.addEventListener("click", function () {
  gotoSpecificPosition([-122.41986100784132, 37.699307492595025], 18);
});

function gotoSpecificPosition(destination) {
  travelPath(destination);
  map.flyTo({
    center: destination,
    speed: 0.35,
    curve: 1.3,
    zoom: 11,
    bearing: Math.random() * 360,
    pitch: Math.random() * 50 + 30,
  });
}

function fetchFunction(url, cb) {
  fetch(url).then(function (response) {
    if (response.status === 200) {
      response.json().then(function (data) {
        cb(data);
      });
    }
  });
}

function interpolatePath(path, pixelStep) {
  const res = [];
  var p2,
    i = 1,
    overflow = 0;
  while (i < path.length) {
    const p1 = path[i - 1];
    p2 = path[i];
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy) / pixelStep;
    let j = overflow;
    while (j < len) {
      const u = j / len;
      res.push(P2(p1.x + dx * u, p1.y + dy * u));
      j++;
    }
    overflow = j - len;
    i++;
  }

  // add last point if close to correct distance
  if (Math.abs(overflow) < 0.01) {
    res.push(P2(p2.x, p2.y));
  }
  return res;
}
