import React from 'react';
import classnames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { FaHammer, FaHome, FaListAlt, FaPlus, FaUser } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { useRecoilValue } from 'recoil';

// components
import Container from '../container';
import LinkButton from '../button/link';
import Loader from '../loader';

// state
import { PlayerAtom } from '../../state/player';

import styles from './layout.module.scss';

interface Props {
  children: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  isLoading?: boolean;
}

const Layout = ({ children, title, action, isLoading }: Props) => {
  const { pathname } = useLocation();
  const player = useRecoilValue(PlayerAtom);

  return (
    <div className={styles.container}>
      <Helmet title={`${title} | Crusader`} />
      <div className={styles.navbar}>
        <nav>
          <Link className={styles.home} to="/">
            <FaHammer />
          </Link>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.action}>{action}</div>
        </nav>
      </div>
      <div className={styles.content}>
        <Container className={styles.children}>{isLoading ? <Loader /> : children}</Container>
        {player && (
          <div className={classnames(styles.actionBar, styles.visible)}>
            <LinkButton
              leftIcon={<FaHome />}
              className={classnames(styles.action, pathname === '/' ? styles.active : undefined)}
              to="/"
            >
              Home
            </LinkButton>
            <LinkButton
              leftIcon={<FaPlus />}
              className={classnames(
                styles.action,
                pathname === '/crusade' ? styles.active : undefined
              )}
              to="/crusade"
            >
              New Crusade
            </LinkButton>
            <LinkButton
              leftIcon={<FaListAlt />}
              className={classnames(
                styles.action,
                pathname === '/lists' ? styles.active : undefined
              )}
              to="/lists"
            >
              Lists
            </LinkButton>
            <LinkButton
              leftIcon={<FaUser />}
              className={classnames(
                styles.action,
                pathname === `/player/${player?.id}` ? styles.active : undefined
              )}
              to={`/player/${player?.id}`}
            >
              Profile
            </LinkButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
