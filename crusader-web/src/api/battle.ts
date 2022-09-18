import Fetch from '../helpers/fetch';

export const createBattleAsync = (body: Crusader.Battle) =>
  Fetch<Crusader.Battle>('/api/battle', { method: 'POST', body });

export const getBattleAsync = (id: string | number) =>
  Fetch<Crusader.Battle>(`/api/battle/${id}`, { method: 'GET' });

export const updateBattleAsync = (body: Crusader.Battle) =>
  Fetch<Crusader.Battle>('/api/battle', { method: 'PUT', body });

export const deleteBattleAsync = (id: string | number) =>
  Fetch<boolean>(`/api/battle/${id}`, { method: 'DELETE' });