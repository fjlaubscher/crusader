import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button, useToast } from '@fjlaubscher/matter';

// api
import { deleteCrusadeCardAsync } from '../../../api/crusade-card';

// components
import DeleteModal from '../../../components/delete-modal';
import ShareButton from '../../../components/button/share';

import styles from './overview.module.scss';

interface Props {
  crusadeCard: Crusader.CrusadeCard;
  isOwner: boolean;
}

const SettingsTab: React.FC<Props> = ({ crusadeCard, isOwner }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.settings}>
      <ShareButton link={`/crusade-card/${crusadeCard.id}`} title={crusadeCard.name} />
      {isOwner && (
        <Button variant="error" onClick={() => setShowModal(true)} leftIcon={<FaTrash />}>
          Delete
        </Button>
      )}
      <DeleteModal
        onCloseClick={() => setShowModal(false)}
        onDeleteClick={() => deleteCrusadeCardAsync(crusadeCard.id)}
        onDeleteSuccess={() => {
          toast({ variant: 'success', text: `Deleted ${crusadeCard.name}` });
          setShowModal(false);
          navigate(`/order-of-battle/${crusadeCard.orderOfBattleId}`);
        }}
        show={showModal}
      >
        Are you sure you want to delete this Crusade Card?
        <br />
        This action is not reversable.
      </DeleteModal>
    </div>
  );
};

export default SettingsTab;
