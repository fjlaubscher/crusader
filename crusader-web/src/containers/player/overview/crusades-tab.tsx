import React from 'react';

// components
import Alert from '../../../components/alert';
import CrusadeCard from '../../../components/crusade/card';
import Grid from '../../../components/grid';

interface Props {
  crusades: Crusader.Crusade[];
  player: Crusader.Player;
}

const CrusadesTab: React.FC<Props> = ({ crusades, player }) => {
  const hasCrusades = crusades.length > 0;

  return hasCrusades ? (
    <Grid>
      {crusades.map((c) => (
        <CrusadeCard key={`crusade-${c.id}`} crusade={c} />
      ))}
    </Grid>
  ) : (
    <Alert variant="warning">
      {player.name} hasn&apos;t joined any Crusades yet.
      <br />
      Share your Crusade link if you&apos;d like to invite them!
    </Alert>
  );
};

export default CrusadesTab;
