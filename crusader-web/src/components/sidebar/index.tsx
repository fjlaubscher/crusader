import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { useRecoilValue } from 'recoil';
import { FaPlus, FaPowerOff, FaUser } from 'react-icons/fa';
import { useClickAway } from 'react-use';

// components
import CrusaderAlert from '../crusader-alert';
import LinkButton from '../button/link';

// state
import { PlayerAtom } from '../../state/player';

import styles from './sidebar.module.scss';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const Sidebar = ({ visible, onClose }: Props) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const ref = useRef(null);
  const player = useRecoilValue(PlayerAtom);

  useEffect(() => {
    const timer = setTimeout(() => setSidebarVisible(visible), 0);
    return () => clearTimeout(timer);
  }, [visible, setSidebarVisible]);

  useClickAway(ref, onClose);

  return (
    <div className={classnames(styles.overlay, visible && styles.visible)}>
      <div ref={ref} className={classnames(styles.content, sidebarVisible && styles.visible)}>
        <CrusaderAlert playerName={player ? player.name : 'Crusader'} />
        <LinkButton leftIcon={<FaPlus />} to="/crusade">
          New Crusade
        </LinkButton>
        {player && (
          <LinkButton leftIcon={<FaUser />} to={`/player/${player.id}`}>
            Your Profile
          </LinkButton>
        )}
        <LinkButton leftIcon={<FaPowerOff />} to="/sign-out">
          Sign Out
        </LinkButton>
      </div>
    </div>
  );
};

export default Sidebar;
