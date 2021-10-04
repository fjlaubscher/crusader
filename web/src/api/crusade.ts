import Fetch from '../helpers/fetch';

export const getPlayerCrusadesAsync = (playerId: number) =>
  Fetch<Crusader.Crusade[]>(`/api/player/${playerId}/crusades`, { method: 'GET' });
