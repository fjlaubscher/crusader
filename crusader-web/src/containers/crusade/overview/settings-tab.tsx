import React, { useState } from 'react';
import { FaShareAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

// api
import { deleteCrusadeAsync } from '../../../api/crusade';

// components
import Button from '../../../components/button';
import DeleteModal from '../../../components/delete-modal';

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
      <Button
        leftIcon={<FaShareAlt />}
        variant="info"
        onClick={async () => {
          try {
            const shareLink = `${window.location.origin}/crusade/${crusade.id}`;
            if (!navigator.canShare()) {
              await navigator.clipboard.writeText(shareLink);
              toast({
                variant: 'success',
                text: 'Link copied to your clipboard.'
              });
            } else {
              await navigator.share({
                title: crusade.name,
                url: shareLink
              });
              toast({
                variant: 'success',
                text: 'Crusade shared.'
              });
            }
          } catch (ex: any) {
            toast({
              variant: 'error',
              text: ex.message || 'Unable to share.'
            });
          }
        }}
      >
        Share
      </Button>
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
