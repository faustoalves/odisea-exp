export const getCompletedPath = async () => {
  let ret = await fetch("https://odisea-vercel.vercel.app/api/positions").then((resp) => {
    return resp.json();
  });
  let coordinates = [];
  ret.items.map((item) => {
    coordinates.push(...item.coordinates);
  });
  return coordinates;
};
