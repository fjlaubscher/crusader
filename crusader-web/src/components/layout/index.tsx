import React from 'react';
import { Link } from 'react-router-dom';
import { FaHammer } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

// components
import Container from '../container';
import Progress from '../progress';

import styles from './layout.module.scss';

interface Props {
  children: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  isLoading?: boolean;
}

const Layout = ({ children, title, action, isLoading }: Props) => (
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
    {isLoading ? <Progress /> : <Container className={styles.content}>{children}</Container>}
  </div>
);

export default Layout;
