import Fetch from '../helpers/fetch';

export const getBattlefieldRolesAsync = () =>
  Fetch<Crusader.ListItem[]>('/api/battlefield-role', { method: 'GET' });

export const getFactionsAsync = () => Fetch<Crusader.ListItem[]>('/api/faction', { method: 'GET' });
