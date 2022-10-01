declare namespace Crusader {
  interface APIResponse {
    status: 'ok' | 'error';
    data: any;
  }

  interface Battle {
    id: number;
    crusadeId: number;
    crusade: string;
    attackerOrderOfBattle: string;
    attackerOrderOfBattleId: number;
    attackerScore: number;
    defenderOrderOfBattle: string;
    defenderOrderOfBattleId: number;
    defenderScore: number;
    mission: string;
    size: number;
    name: string;
    notes: string;
    statusId: number;
    status: string;
    createdDate: string;
  }

  interface Crusade {
    id: number;
    createdDate: string;
    createdById: number;
    createdBy: string;
    name: string;
    notes: string;
  }

  interface CrusadeCard {
    id: number;
    abilities: string;
    battlefieldRoleId: number;
    battlefieldRole: string;
    battleHonours: string;
    battleScars: string;
    battles: number;
    battlesSurvived: number;
    crusadePoints: number;
    experiencePoints: number;
    equipment: string;
    name: string;
    notes: string;
    orderOfBattleId: number;
    orderOfBattle: string;
    powerRating: number;
    psychicPowers: string;
    relics: string;
    unitType: string;
    unitsDestroyed: number;
    unitsDestroyedMelee: number;
    unitsDestroyedPsychic: number;
    unitsDestroyedRanged: number;
    warlordTraits: string;
  }

  interface List {
    id: number;
    orderOfBattleId: number;
    orderOfBattle: string;
    playerId: number;
    player: string;
    size: number;
    name: string;
    notes: string;
  }

  interface ListCard {
    id: number;
    listId: number;
    list: string;
    crusadeCardId: number;
    crusadeCard: string;
  }

  interface ListItem {
    id: number;
    name: string;
  }

  interface OrderOfBattle {
    id: number;
    battles: number;
    battlesWon: number;
    crusadeId: number;
    crusade: string;
    crusadePoints: number;
    factionId: number;
    faction: string;
    name: string;
    notes: string;
    playerId: number;
    player: string;
    requisition: number;
    supplyLimit: number;
    supplyUsed: number;
  }

  interface Player {
    id: number;
    name: string;
    notes: string;
  }
}
