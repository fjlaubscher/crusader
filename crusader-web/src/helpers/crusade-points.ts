export const getCrusadePointIncrement = (powerRating: number) => powerRating >= 11 ? 2 : 1;

export const getCrusadePointsFromXP = (experiencePoints: number, powerRating: number) => {
  let crusadePointIncrement = getCrusadePointIncrement(powerRating);

  if (experiencePoints >= 6) {
    return crusadePointIncrement
  } else if (experiencePoints >= 16) {
    return crusadePointIncrement * 2;
  } else if (experiencePoints >= 31) {
    return crusadePointIncrement * 3;
  } else if (experiencePoints >= 51) {
    return crusadePointIncrement * 4;
  }

  return 0;
}