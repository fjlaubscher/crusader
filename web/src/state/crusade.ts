import { atom } from 'recoil';

export const CrusadesAtom = atom<Crusader.Crusade[]>({ key: 'player-crusades', default: [] });

export const CurrentCrusadeAtom = atom<Crusader.Crusade | null>({
  key: 'current-crusades',
  default: null
});
