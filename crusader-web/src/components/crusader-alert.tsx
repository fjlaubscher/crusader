import { Alert } from '@fjlaubscher/matter';

interface Props {
  playerName: string;
}

const CrusaderAlert = ({ playerName }: Props) => (
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
