export const randomizeSongs = (length: number) => {
	let indexLeft: number, indexRight: number
  indexLeft =
      Math.floor(Math.random() * length) + 1;
    do {
      indexRight =
        Math.floor(Math.random() * length) + 1;
    } while (indexLeft === indexRight);

	if (indexLeft > indexRight) return [indexRight, indexLeft]
	return [indexLeft, indexRight]
};
