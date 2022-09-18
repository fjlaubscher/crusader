export const getBattleStatusColor = (statusId: number) => {
  switch (statusId) {
    case 2:
      return 'blue';
    case 3:
      return 'green';
    default:
      return undefined;
  }
};
