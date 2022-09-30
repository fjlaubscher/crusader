import React from 'react';

// components
import Alert from './alert';

interface Props {
  playerName: string;
}

const CrusaderAlert: React.FC<Props> = ({ playerName }) => (
  <Alert variant="info" title={`👋 Hey ${playerName}!`}>
    Crusader is a free and open-source Warhammer 40,000 Crusade assistant.
    <br />
    <br />
    <a href="https://github.com/fjlaubscher/crusader" target="_blank" rel="noopener">
      https://github.com/fjlaubscher/crusader
    </a>
  </Alert>
);

export default CrusaderAlert;
