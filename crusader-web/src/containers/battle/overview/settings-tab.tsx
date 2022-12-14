import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button, useToast } from '@fjlaubscher/matter';

// api
import { deleteBattleAsync } from '../../../api/battle';

// components
import DeleteModal from '../../../components/delete-modal';

import styles from './overview.module.scss';

interface Props {
  battle: Crusader.Battle;
  isOwner: boolean;
}

const SettingsTab: React.FC<Props> = ({ battle, isOwner }) => {
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
        onDeleteClick={() => deleteBattleAsync(battle.id)}
        onDeleteSuccess={() => {
          toast({ variant: 'success', text: `Deleted ${battle.name}` });
          setShowModal(false);
          navigate(`/crusade/${battle.crusadeId}`);
        }}
        show={showModal}
      >
        Are you sure you want to delete this Battle?
        <br />
        This action is not reversable.
      </DeleteModal>
    </div>
  );
};

export default SettingsTab;
