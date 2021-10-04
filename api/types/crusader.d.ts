declare namespace Crusader {
  interface APIResponse {
    status: "ok" | "error";
    data: any;
  }

  interface Crusade {
    id: number;
    createdDate: string;
    name: string;
    notes: string;
  }

  interface CrusadeCard {
    id: number;
    abilities: string;
    battlefieldRoleId: number;
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

  interface ListItem {
    id: number;
    name: string;
  }

  interface OrderOfBattle {
    id: number;
    battles: number;
    battlesWon: number;
    crusadeId: number;
    crusadePoints: number;
    factionId: number;
    name: string;
    notes: string;
    playerId: number;
    requisition: number;
    supplyLimit: number;
    supplyUsed: number;
  }
}
