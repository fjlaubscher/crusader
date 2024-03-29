import Fetch from '../helpers/fetch';

export const createOrderOfBattleAsync = (body: Crusader.OrderOfBattle) =>
  Fetch<Crusader.OrderOfBattle>('/api/order-of-battle', { method: 'POST', body });

export const getCrusadeOrdersOfBattleAsync = (crusadeId: string | number) =>
  Fetch<Crusader.OrderOfBattle[]>(`/api/crusade/${crusadeId}/orders-of-battle`, { method: 'GET' });

export const getOrderOfBattleAsync = (orderOfBattleId: string | number) =>
  Fetch<Crusader.OrderOfBattle>(`/api/order-of-battle/${orderOfBattleId}`, { method: 'GET' });

export const getPlayerOrdersOfBattleAsync = (playerId: string | number) =>
  Fetch<Crusader.OrderOfBattle[]>(`/api/player/${playerId}/orders-of-battle`, { method: 'GET' });

export const getOrderOfBattleBattlesAsync = (orderOfBattleId: number | string) =>
  Fetch<Crusader.Battle[]>(`/api/order-of-battle/${orderOfBattleId}/battles`, { method: 'GET' });

export const updateOrderOfBattleAsync = (body: Crusader.OrderOfBattle) =>
  Fetch<Crusader.OrderOfBattle>('/api/order-of-battle', { method: 'PUT', body });

export const deleteOrderOfBattleAsync = (id: string | number) =>
  Fetch<boolean>(`/api/order-of-battle/${id}`, { method: 'DELETE' });
