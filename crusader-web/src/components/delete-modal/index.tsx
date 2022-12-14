import { ReactNode, useCallback, useState } from 'react';
import { FaTrash, FaUndo } from 'react-icons/fa';
import { Button, Modal, useToast } from '@fjlaubscher/matter';

import styles from './delete-modal.module.scss';

interface Props {
  show: boolean;
  children: ReactNode;
  onDeleteClick: () => Promise<boolean | undefined>;
  onDeleteSuccess: () => void;
  onCloseClick: () => void;
}

const DeleteModal = ({ show, children, onDeleteClick, onDeleteSuccess, onCloseClick }: Props) => {
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
    <Modal visible={show}>
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
    </Modal>
  );
};

export default DeleteModal;
