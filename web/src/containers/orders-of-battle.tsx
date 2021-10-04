import React from 'react';
import { useRecoilValue } from 'recoil';
import { Alert, AlertIcon, IconButton, List, ListItem, useDisclosure } from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';

// components
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';

// state
import { OrdersOfBattleAtom } from '../state/order-of-battle';

const OrdersOfBattle = () => {
  const ordersOfBattle = useRecoilValue(OrdersOfBattleAtom);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <Layout
        title="Orders of Battle"
        actionComponent={
          <IconButton aria-label="Settings" fontSize="1.5rem" icon={<MdMenu />} onClick={onOpen} />
        }
      >
        <Alert mb={4} status="info" variant="left-accent">
          <AlertIcon />
          These are your Orders of Battle.
        </Alert>
        <List>
          {ordersOfBattle.map((o) => (
            <ListItem key={o.id}>
              {o.name} ({o.crusadeId})
            </ListItem>
          ))}
        </List>
      </Layout>
    </>
  );
};

export default OrdersOfBattle;
