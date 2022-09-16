import { atom } from 'recoil';

export const BattleStatusAtom = atom<Crusader.ListItem[]>({
  key: 'battle-status',
  default: []
});

export const BattlefieldRoleAtom = atom<Crusader.ListItem[]>({
  key: 'battlefield-role',
  default: []
});

export const FactionAtom = atom<Crusader.ListItem[]>({
  key: 'faction',
  default: []
});
