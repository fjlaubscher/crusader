import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './button.module.scss';

interface Props {
  className?: string;
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: Variant;
}

const LinkButton: React.FC<Props> = ({
  className,
  to,
  children,
  onClick,
  leftIcon,
  rightIcon,
  variant
}) => (
  <Link
    className={classnames(styles.button, variant ? styles[variant] : undefined, className)}
    to={to}
    onClick={onClick}
  >
    <div>{leftIcon}</div>
    <div>{children}</div>
    <div>{rightIcon}</div>
  </Link>
);

export default LinkButton;
