const baseOption = {
  type: "glb",
  units: "meters",
  rotation: {x: 95, y: 1800, z: 0},
  anchor: "center",
};

export const boatDefaultScale = 3800;
export const boatOptions = {
  ...baseOption,
  obj: "/assets/models/odisea.glb",
  scale: {x: boatDefaultScale, y: boatDefaultScale, z: boatDefaultScale},
};
