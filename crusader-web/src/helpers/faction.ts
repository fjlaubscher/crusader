export const FactionTypes = Object.freeze({
  Aeldari: 1,
  Chaos: 2,
  Imperium: 3,
  Necrons: 4,
  Orks: 5,
  Tau: 6,
  Tyranids: 7,
  Votann: 8
});

export const getCrusadeFactions = (ordersOfBattle: Crusader.OrderOfBattle[]) => {
  const stats: CrusadeFactions = {
    totalAeldari: 0,
    totalChaos: 0,
    totalImperium: 0,
    totalNecrons: 0,
    totalOrks: 0,
    totalTau: 0,
    totalTyranids: 0,
    totalVotann: 0
  };

  for (let i = 0; i < ordersOfBattle.length; i++) {
    switch (ordersOfBattle[i].factionId) {
      case FactionTypes.Aeldari:
        stats.totalAeldari++;
        break;
      case FactionTypes.Chaos:
        stats.totalChaos++;
        break;
      case FactionTypes.Imperium:
        stats.totalImperium++;
        break;
      case FactionTypes.Necrons:
        stats.totalNecrons++;
        break;
      case FactionTypes.Orks:
        stats.totalOrks++;
        break;
      case FactionTypes.Tau:
        stats.totalTau++;
        break;
      case FactionTypes.Tyranids:
        stats.totalTyranids++;
        break;
      case FactionTypes.Votann:
        stats.totalVotann++;
    }
  }

  return stats;
};
