export const MOCK_PLAYER: Crusader.ListItem = {
  id: 1,
  name: 'Marneus Calgar'
};
export const MOCK_PLAYER_ALT: Crusader.ListItem = {
  id: 1,
  name: 'Hive Mind'
};

export const MOCK_CRUSADE: Crusader.Crusade = {
  id: 1,
  createdById: 1,
  createdBy: 'Marneus Calgar',
  createdDate: '2022-09-07T00:00:00.000Z',
  name: 'Battle of Macragge',
  notes:
    'The blasphemy of the Tyranids is such that only one solution is acceptable. Extermination. There can only be two sides in a fight - choose carefully, lest you and I find ourselves on different sides.'
};

export const MOCK_ORDER_OF_BATTLE: Crusader.OrderOfBattle = {
  id: 1,
  battles: 1,
  battlesWon: 0,
  crusadeId: 1,
  factionId: 3,
  name: 'Ultramarines',
  notes:
    'We are the Ultramarines, the sons of Guilliman. Whilst we draw breath, we stand. Whilst we stand, we fight. Whilst we fight, we prevail. Nothing shall stay our wrath.',
  playerId: 1,
  requisition: 5,
  supplyLimit: 50,
  crusadePoints: 0,
  supplyUsed: 49,
  crusade: 'Battle of Macragge',
  faction: 'Imperium',
  player: 'Marneus Calgar'
};
export const MOCK_ORDER_OF_BATTLE_ALT: Crusader.OrderOfBattle = {
  id: 1,
  battles: 1,
  battlesWon: 0,
  crusadeId: 1,
  factionId: 7,
  name: 'Hive Fleet Behemoth',
  notes:
    'An alien threat has risen from beyond the abyss, a swarm so vast that it blots out the stars. This horror fights neither for power nor territory, but rather to feed a hunger so insatiable that it will eventually devour the entire galaxy.',
  playerId: 1,
  requisition: 5,
  supplyLimit: 50,
  crusadePoints: 0,
  supplyUsed: 50,
  crusade: 'Battle of Macragge',
  faction: 'Tyranids',
  player: 'Hive Mind'
};

export const MOCK_BATTLE: Crusader.Battle = {
  id: 1,
  crusadeId: 1,
  attackerOrderOfBattleId: 1,
  attackerScore: 10,
  defenderOrderOfBattleId: 2,
  defenderScore: 10,
  mission: 'Sweep and Clear',
  size: 25,
  name: 'The Siege of Macragge',
  notes: 'The survivors of the Ultramarines 1st Company were still believed to be fighting amongst the defence laser silos of the northern citadel, but all contact with them had been lost after the Tyranids overran the surface outposts.',
  statusId: 3,
  createdDate: '2022-09-18T00:00:00.000Z',
  crusade: 'Battle of Macragge',
  status: 'Complete',
  attackerOrderOfBattle: 'Ultramarines',
  defenderOrderOfBattle: 'Hive Fleet Behemoth'
};
