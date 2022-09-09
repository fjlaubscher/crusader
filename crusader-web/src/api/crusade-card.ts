import Fetch from '../helpers/fetch';

export const createCrusadeCardAsync = (body: Crusader.CrusadeCard) =>
  Fetch<Crusader.CrusadeCard>('/api/crusade-card', { method: 'POST', body });

export const getCrusadeCardAsync = (id: string | number) =>
  Fetch<Crusader.CrusadeCard>(`/api/crusade-card/${id}`, { method: 'GET' });

export const getOrderOfBattleCrusadeCardsAsync = (orderOfBattleId: string | number) =>
  Fetch<Crusader.CrusadeCard[]>(`/api/order-of-battle/${orderOfBattleId}/crusade-cards`, {
    method: 'GET'
  });

export const updateCrusadeCardAsync = (body: Crusader.CrusadeCard) =>
  Fetch<Crusader.CrusadeCard>('/api/crusade-card', { method: 'PUT', body });

export const deleteCrusadeCardAsync = (id: string | number) =>
  Fetch<boolean>(`/api/crusade-card/${id}`, { method: 'DELETE' });
