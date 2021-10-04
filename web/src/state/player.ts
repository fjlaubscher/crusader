import { atom } from 'recoil';

export const PlayerAtom = atom<Crusader.ListItem | null>({
  key: 'player',
  default: null
});
