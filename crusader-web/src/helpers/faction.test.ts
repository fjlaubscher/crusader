import { describe, expect, it } from '@jest/globals';
import { FactionTypes, getCrusadeFactions } from './faction';

const ORDERS_OF_BATTLE: Crusader.OrderOfBattle[] = [
  {
    id: 1,
    battles: 0,
    battlesWon: 0,
    crusadeId: 1,
    crusade: 'Test Crusade',
    crusadePoints: 0,
    factionId: FactionTypes.Aeldari,
    faction: 'Aeldari',
    name: 'Order of Battle A',
    notes: '',
    player: 'Player A',
    playerId: 1,
    requisition: 0,
    supplyLimit: 0,
    supplyUsed: 0
  },
  {
    id: 2,
    battles: 0,
    battlesWon: 0,
    crusadeId: 1,
    crusade: 'Test Crusade',
    crusadePoints: 0,
    factionId: FactionTypes.Aeldari,
    faction: 'Aeldari',
    name: 'Order of Battle B',
    notes: '',
    player: 'Player B',
    playerId: 2,
    requisition: 0,
    supplyLimit: 0,
    supplyUsed: 0
  },
  {
    id: 2,
    battles: 0,
    battlesWon: 0,
    crusadeId: 1,
    crusade: 'Test Crusade',
    crusadePoints: 0,
    factionId: FactionTypes.Chaos,
    faction: 'Chaos',
    name: 'Order of Battle B',
    notes: '',
    player: 'Player C',
    playerId: 3,
    requisition: 0,
    supplyLimit: 0,
    supplyUsed: 0
  }
];

describe('Faction', () => {
  describe('getCrusadeFactions', () => {
    it('groups orders of battle by faction', () => {
      const grouped = getCrusadeFactions(ORDERS_OF_BATTLE);
      expect(grouped).toMatchObject({
        totalAeldari: 2,
        totalChaos: 1,
        totalImperium: 0,
        totalNecrons: 0,
        totalOrks: 0,
        totalTau: 0,
        totalTyranids: 0
      });
    });
  });
});
