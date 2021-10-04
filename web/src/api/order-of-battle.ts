import Fetch from '../helpers/fetch';

export const getPlayerOrdersOfBattleAsync = (playerId: number) =>
  Fetch<Crusader.OrderOfBattle[]>(`/api/player/${playerId}/orders-of-battle`, { method: 'GET' });
