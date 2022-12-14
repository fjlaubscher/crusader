import { atom } from 'recoil';

export const OrdersOfBattleAtom = atom<Crusader.OrderOfBattle[]>({
  key: 'orders-of-battle',
  default: []
});

export const PlayerOrdersOfBattleAtom = atom<Crusader.OrderOfBattle[] | null>({
  key: 'player-orders-of-battle',
  default: null
});
