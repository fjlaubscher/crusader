import { atom } from 'recoil';

export const CrusadesAtom = atom<Crusader.Crusade[]>({ key: 'player-crusades', default: [] });
