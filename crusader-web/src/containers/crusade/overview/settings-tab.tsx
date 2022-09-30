import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

// api
import { deleteCrusadeAsync } from '../../../api/crusade';

// components
import Button from '../../../components/button';
import DeleteModal from '../../../components/delete-modal';
import ShareButton from '../../../components/button/share';

// hooks
import useToast from '../../../hooks/use-toast';

// state
import { PlayerAtom } from '../../../state/player';

import styles from './overview.module.scss';

interface Props {
  crusade: Crusader.Crusade;
}

const SettingsTab: React.FC<Props> = ({ crusade }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const player = useRecoilValue(PlayerAtom);
  const [showModal, setShowModal] = useState(false);

  const isOwner = crusade.createdById === player?.id;

  return (
    <div className={styles.settings}>
      <ShareButton link={`/crusade/${crusade.id}`} title={crusade.name} />
      {isOwner && (
        <Button variant="error" onClick={() => setShowModal(true)} leftIcon={<FaTrash />}>
          Delete
        </Button>
      )}
      <DeleteModal
        onCloseClick={() => setShowModal(false)}
        onDeleteClick={() => deleteCrusadeAsync(crusade.id)}
        onDeleteSuccess={() => {
          toast({ variant: 'success', text: `Deleted ${crusade.name}` });
          setShowModal(false);
          navigate('/');
        }}
        show={showModal}
      >
        Are you sure you want to delete this Crusade?
        <br />
        This action is not reversable.
      </DeleteModal>
    </div>
  );
};

export default SettingsTab;
