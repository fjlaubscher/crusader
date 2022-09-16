import Fetch from '../helpers/fetch';

export const createCrusadeAsync = (body: Crusader.Crusade) =>
  Fetch<Crusader.Crusade>('/api/crusade', { method: 'POST', body });

export const getPlayerCrusadesAsync = (playerId: number | string) =>
  Fetch<Crusader.Crusade[]>(`/api/player/${playerId}/crusades`, { method: 'GET' });

export const getCrusadeAsync = (crusadeId: number | string) =>
  Fetch<Crusader.Crusade>(`/api/crusade/${crusadeId}`, { method: 'GET' });

export const getCrusadeBattlesAsync = (crusadeId: number | string) =>
  Fetch<Crusader.Battle[]>(`/api/crusade/${crusadeId}/battles`, { method: 'GET' });

export const updateCrusadeAsync = (body: Crusader.Crusade) =>
  Fetch<Crusader.Crusade>('/api/crusade', { method: 'PUT', body });
