import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

// api
import { deleteOrderOfBattleAsync } from '../../../api/order-of-battle';

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
  orderOfBattle: Crusader.OrderOfBattle;
}

const SettingsTab: React.FC<Props> = ({ orderOfBattle }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const player = useRecoilValue(PlayerAtom);
  const [showModal, setShowModal] = useState(false);

  const isOwner = orderOfBattle.playerId === player?.id;

  return (
    <div className={styles.settings}>
      <ShareButton link={`/order-of-battle/${orderOfBattle.id}`} title={orderOfBattle.name} />
      {isOwner && (
        <Button variant="error" onClick={() => setShowModal(true)} leftIcon={<FaTrash />}>
          Delete
        </Button>
      )}
      <DeleteModal
        onCloseClick={() => setShowModal(false)}
        onDeleteClick={() => deleteOrderOfBattleAsync(orderOfBattle.id)}
        onDeleteSuccess={() => {
          toast({ variant: 'success', text: `Deleted ${orderOfBattle.name}` });
          setShowModal(false);
          navigate('/');
        }}
        show={showModal}
      >
        Are you sure you want to delete this Order of Battle?
        <br />
        This action is not reversable.
      </DeleteModal>
    </div>
  );
};

export default SettingsTab;
