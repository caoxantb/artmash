export const randomizeFilm = (length: number) => {
  let indexRight: number;
  const indexLeft = Math.floor(Math.random() * length);
  do {
    indexRight = Math.floor(Math.random() * length);
  } while (indexLeft === indexRight);

  if (indexLeft > indexRight) return [indexRight, indexLeft];
  return [indexLeft, indexRight];
};
