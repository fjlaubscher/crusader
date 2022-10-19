export const getBattleStatusColor = (statusId: number) => {
  switch (statusId) {
    case 2:
      return 'info';
    case 3:
      return 'success';
    default:
      return undefined;
  }
};
