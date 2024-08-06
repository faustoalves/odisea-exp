const baseOption = {
  type: "glb",
  units: "meters",
  rotation: { x: 90, y: 0, z: 0 },
  anchor: "center",
};

export const boatDefaultScale = 100;
export const boatOptions = {
  ...baseOption,
  obj: "/assets/models/odisea.glb",
  scale: { x: boatDefaultScale, y: boatDefaultScale, z: boatDefaultScale },
  defaultAnimation: 0,
};
