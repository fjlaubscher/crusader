import { atom } from 'recoil';

export const BattlefieldRoleAtom = atom<Crusader.ListItem[]>({
  key: 'battlefield-role',
  default: []
});

export const FactionAtom = atom<Crusader.ListItem[]>({
  key: 'faction',
  default: []
});
