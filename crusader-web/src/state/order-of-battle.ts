import { atom } from 'recoil';

export const OrderOfBattleAtom = atom<Crusader.OrderOfBattle | null>({
  key: 'order-of-battle',
  default: null
});
