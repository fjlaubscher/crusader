import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button, useToast } from '@fjlaubscher/matter';

// api
import { deleteListAsync } from '../../../api/list';

// components
import DeleteModal from '../../../components/delete-modal';

import styles from './overview.module.scss';

interface Props {
  list: Crusader.List;
  isOwner: boolean;
}

const SettingsTab: React.FC<Props> = ({ list, isOwner }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.settings}>
      {isOwner && (
        <Button variant="error" onClick={() => setShowModal(true)} leftIcon={<FaTrash />}>
          Delete
        </Button>
      )}
      <DeleteModal
        onCloseClick={() => setShowModal(false)}
        onDeleteClick={() => deleteListAsync(list.id)}
        onDeleteSuccess={() => {
          toast({ variant: 'success', text: `Deleted ${list.name}` });
          setShowModal(false);
          navigate('/lists');
        }}
        show={showModal}
      >
        Are you sure you want to delete this List?
        <br />
        This action is not reversable.
      </DeleteModal>
    </div>
  );
};

export default SettingsTab;
