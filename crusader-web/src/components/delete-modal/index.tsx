import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import { FaTrash, FaUndo } from 'react-icons/fa';

// components
import Button from '../button';

// hooks
import useToast from '../../hooks/use-toast';

import styles from './delete-modal.module.scss';

interface Props {
  show: boolean;
  children: React.ReactNode;
  onDeleteClick: () => Promise<boolean | undefined>;
  onDeleteSuccess: () => void;
  onCloseClick: () => void;
}

const DeleteModal: React.FC<Props> = ({
  show,
  children,
  onDeleteClick,
  onDeleteSuccess,
  onCloseClick
}) => {
  const toast = useToast();
  const [isBusy, setIsBusy] = useState(false);

  const handleDelete = useCallback(async () => {
    try {
      const result = await onDeleteClick();
      if (result) {
        onDeleteSuccess();
      } else {
        toast({ variant: 'error', text: 'Unable to delete.' });
      }
    } catch (ex: any) {
      toast({ variant: 'error', text: ex.message || 'Unable to delete.' });
    }
  }, [setIsBusy, onDeleteClick, onDeleteSuccess]);

  return (
    <div className={classnames(styles.modal, show && styles.show)}>
      <div className={styles.content}>
        {children}
        <div className={styles.buttons}>
          <Button
            className={styles.cancel}
            type="button"
            onClick={onCloseClick}
            leftIcon={<FaUndo />}
          >
            Cancel
          </Button>
          <Button variant="error" loading={isBusy} onClick={handleDelete} leftIcon={<FaTrash />}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
