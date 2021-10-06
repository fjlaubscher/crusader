import Fetch from '../helpers/fetch';

export const createCrusadeCardAsync = (body: Crusader.CrusadeCard) =>
  Fetch<Crusader.CrusadeCard>('/api/crusade-card', { method: 'POST', body });

export const getOrderOfBattleCrusadeCardsAsync = (orderOfBattleId: string | number) =>
  Fetch<Crusader.CrusadeCard[]>(`/api/order-of-battle/${orderOfBattleId}/crusade-cards`, {
    method: 'GET'
  });
