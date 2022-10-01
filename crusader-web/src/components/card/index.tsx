import React from 'react';
import classnames from 'classnames';
import { FaTrash } from 'react-icons/fa';

import styles from './card.module.scss';

interface Props {
  className?: string;
  children: React.ReactNode;
  title?: string;
  onClick?: () => void;
  onDeleteClick?: () => void;
}

const Card: React.FC<Props> = ({ className, children, title, onClick, onDeleteClick }) => (
  <div className={classnames(styles.card, className)} onClick={onClick}>
    {title ? <p className={styles.title}>{title}</p> : undefined}
    {children}
    {onDeleteClick && (
      <button type="button" className={styles.delete} onClick={onDeleteClick}>
        <FaTrash />
      </button>
    )}
  </div>
);

export default Card;
