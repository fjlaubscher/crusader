import { atom } from 'recoil';

export const PlayerAtom = atom<Crusader.Player | null>({
  key: 'player',
  default: null
});
