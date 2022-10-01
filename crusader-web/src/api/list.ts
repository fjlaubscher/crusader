import Fetch from '../helpers/fetch';

export const createListAsync = (body: Crusader.List) =>
  Fetch<Crusader.List>('/api/list', { method: 'POST', body });

export const getListAsync = (id: string | number) =>
  Fetch<Crusader.List>(`/api/list/${id}`, { method: 'GET' });

export const getPlayerListsAsync = (id: string | number) =>
  Fetch<Crusader.List[]>(`/api/player/${id}/lists`, { method: 'GET' });

export const getListCardsAsync = (id: string | number) =>
  Fetch<Crusader.ListCard[]>(`/api/list/${id}/cards`, { method: 'GET' });

export const getListCrusadeCardsAsync = (id: string | number) =>
  Fetch<Crusader.CrusadeCard[]>(`/api/list/${id}/crusade-cards`, { method: 'GET' });

export const updateListAsync = (body: Crusader.List) =>
  Fetch<Crusader.List>('/api/list', { method: 'PUT', body });

export const deleteListAsync = (id: string | number) =>
  Fetch<boolean>(`/api/list/${id}`, { method: 'DELETE' });
