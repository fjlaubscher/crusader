import { atom } from 'recoil';

export const BattlesAtom = atom<Crusader.Battle[]>({
  key: 'battles',
  default: []
});
