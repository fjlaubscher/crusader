import { atom } from 'recoil';

export const CrusadeCardsAtom = atom<Crusader.CrusadeCard[]>({
  key: 'crusade-cards',
  default: []
});
