const baseOption = {
  obj: "/assets/odisea.gltf",
  type: "gltf",
  units: "meters",
  rotation: {x: 95, y: 270, z: 0},
  anchor: "center",
};

export const boatDefaultScale = 800;
export const boatOptions = {
  ...baseOption,
  obj: "/assets/odisea.gltf",
  scale: {x: boatDefaultScale, y: boatDefaultScale, z: boatDefaultScale},
};
