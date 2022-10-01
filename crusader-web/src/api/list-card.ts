import Fetch from '../helpers/fetch';

export const createListCard = (body: Crusader.ListCard) =>
  Fetch<Crusader.ListCard>('/api/list-card', { method: 'POST', body });

export const getListCardAsync = (id: string | number) =>
  Fetch<Crusader.ListCard>(`/api/list-card/${id}`, { method: 'GET' });

export const deleteListCardAsync = (id: string | number) =>
  Fetch<boolean>(`/api/list-card/${id}`, { method: 'DELETE' });
