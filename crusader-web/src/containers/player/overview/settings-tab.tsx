import React from 'react';

// components
import ShareButton from '../../../components/button/share';

import styles from './overview.module.scss';

interface Props {
  player: Crusader.Player;
}

const SettingsTab: React.FC<Props> = ({ player }) => (
  <div className={styles.settings}>
    <ShareButton link={`/player/${player.id}`} title={player.name} />
  </div>
);

export default SettingsTab;
