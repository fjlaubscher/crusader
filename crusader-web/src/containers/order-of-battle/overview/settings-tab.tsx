import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Button, useToast } from '@fjlaubscher/matter';

// api
import { deleteOrderOfBattleAsync } from '../../../api/order-of-battle';

// components
import DeleteModal from '../../../components/delete-modal';

// state
import { PlayerAtom } from '../../../state/player';

import styles from './overview.module.scss';

interface Props {
  orderOfBattle: Crusader.OrderOfBattle;
}

const SettingsTab = ({ orderOfBattle }: Props) => {
  const navigate = useNavigate();
  const toast = useToast();
  const player = useRecoilValue(PlayerAtom);
  const [showModal, setShowModal] = useState(false);

  const isOwner = orderOfBattle.playerId === player?.id;

  return (
    <div className={styles.settings}>
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
