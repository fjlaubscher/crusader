import { atom } from 'recoil';

export const OrdersOfBattleAtom = atom<Crusader.OrderOfBattle[]>({
  key: 'player-orders-of-battle',
  default: []
});
