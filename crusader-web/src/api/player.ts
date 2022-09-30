import Fetch from '../helpers/fetch';

export const createPlayerAsync = (name: string) =>
  Fetch<Crusader.Player>('/api/player', { method: 'POST', body: { name } });

export const getPlayerByIdAsync = (id: string | number) =>
  Fetch<Crusader.Player>(`/api/player/${id}`, { method: 'GET' });

export const getPlayersAsync = (name: string) =>
  Fetch<Crusader.Player[]>(`/api/player?name=${name}`, { method: 'GET' });

export const updatePlayerAsync = (body: Crusader.Player) =>
  Fetch<Crusader.Player>('/api/player', { method: 'PUT', body });
