import Fetch from '../helpers/fetch';

export const createPlayerAsync = (name: string) =>
  Fetch<Crusader.ListItem>('/api/player', { method: 'POST', body: { name } });

export const getPlayersAsync = (name: string) =>
  Fetch<Crusader.ListItem[]>(`/api/player?name=${name}`, { method: 'GET' });

export const updatePlayerAsync = (body: Crusader.ListItem) =>
  Fetch<Crusader.ListItem>('/api/player', { method: 'PUT', body });
