import React from 'react';
import classnames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { FaHammer, FaHome, FaListAlt, FaPlus, FaUser } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { useRecoilValue } from 'recoil';
import { Layout } from '@fjlaubscher/matter';

// components
import LinkButton from '../button/link';

// state
import { PlayerAtom } from '../../state/player';

import styles from './layout.module.scss';

interface Props {
  children: React.ReactNode;
  title: string;
  description?: string;
  image?: string;
  action?: React.ReactNode;
  isLoading?: boolean;
}

const AppLayout = ({ children, title, description, image, action, isLoading }: Props) => {
  const { pathname } = useLocation();
  const player = useRecoilValue(PlayerAtom);

  return (
    <Layout
      action={action}
      title={title}
      home={
        <Link className={styles.home} to="/">
          <FaHammer />
        </Link>
      }
      menu={
        <>
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
            className={classnames(styles.action, pathname === '/lists' ? styles.active : undefined)}
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
        </>
      }
      isLoading={isLoading}
    >
      <Helmet>
        <title>{title} | Crusader</title>
        <meta property="og:title" content={`${title} | Crusader`} />
        {description && <meta name="description" content={description} />}
        {description && <meta property="og:description" content={description} />}
        {image && <meta property="og:image" content={image} />}
      </Helmet>
      {children}
    </Layout>
  );
};

export default AppLayout;
