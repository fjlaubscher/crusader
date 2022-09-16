import { atom } from 'recoil';

export const OrderOfBattleAtom = atom<Crusader.OrderOfBattle | null>({
  key: 'order-of-battle',
  default: null
});

export const PlayerOrdersOfBattleAtom = atom<Crusader.OrderOfBattle[] | null>({
  key: 'player-orders-of-battle',
  default: null
});
