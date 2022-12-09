import React from 'react';
import classnames from 'classnames';
import styles from './avatar.module.scss';

interface Props {
  className?: string;
  alt: string;
  src: string;
}

const Avatar: React.FC<Props> = ({ className, alt, src }) => (
  <div className={classnames(styles.avatar, className)}>
    <img src={src} alt={alt} />
  </div>
);

export default Avatar;
