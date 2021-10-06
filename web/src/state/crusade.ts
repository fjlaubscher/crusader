import { atom } from 'recoil';

export const CrusadeAtom = atom<Crusader.Crusade | null>({
  key: 'crusade',
  default: null
});
