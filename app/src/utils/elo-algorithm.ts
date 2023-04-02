export const calcEloRating = (
  ratingLeft: number,
  ratingRight: number,
  winner: string
) => {
  const kFactorLeft = ratingLeft > 2400 ? 16 : ratingLeft < 2100 ? 32 : 24;
  const kFactorRight = ratingRight > 2400 ? 16 : ratingRight < 2100 ? 32 : 24;

  const expLeft = 1 / (1 + 10 ** ((ratingRight - ratingLeft) / 400));
  const expRight = 1 / (1 + 10 ** ((ratingLeft - ratingRight) / 400));

  const newRatingLeft =
    winner === "left"
      ? ratingLeft + kFactorLeft * (1 - expLeft)
      : ratingLeft + kFactorLeft * (0 - expLeft);
  const newRatingRight =
    winner === "right"
      ? ratingRight + kFactorRight * (1 - expRight)
      : ratingRight + kFactorRight * (0 - expRight);

  return [Math.round(newRatingLeft), Math.round(newRatingRight)];
};
