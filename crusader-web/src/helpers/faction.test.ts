import { getCrusadeFactions } from './faction';
import { MOCK_ORDER_OF_BATTLE, MOCK_ORDER_OF_BATTLE_ALT } from '../mock/data';

describe('Faction', () => {
  describe('getCrusadeFactions', () => {
    it('groups orders of battle by faction', () => {
      const grouped = getCrusadeFactions([MOCK_ORDER_OF_BATTLE, MOCK_ORDER_OF_BATTLE_ALT]);
      expect(grouped).toMatchObject({
        totalAeldari: 0,
        totalChaos: 0,
        totalImperium: 1,
        totalNecrons: 0,
        totalOrks: 0,
        totalTau: 0,
        totalTyranids: 1
      });
    });
  });
});
