import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Divider, IconButton, Tag, VStack } from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';
import { parseISO, format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

// api
import { getCrusadeAsync } from '../../api/crusade';
import { getCrusadeOrdersOfBattleAsync } from '../../api/order-of-battle';

// components
import Layout from '../../components/layout';
import OrderOfBattleCard from '../../components/order-of-battle/card';
import PageHeading from '../../components/page-heading';
import Search from '../../components/search';

// state
import { CrusadeAtom } from '../../state/crusade';
import { PlayerAtom } from '../../state/player';

// styles
import styles from '../../styles/markdown.module.css';

const Crusade = () => {
  const { id } = useParams<IdParams>();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCrusade, setCurrentCrusade] = useRecoilState(CrusadeAtom);
  const [ordersOfBattle, setOrdersOfBattle] = useState<Crusader.OrderOfBattle[]>([]);
  const [filteredOrdersOfBattle, setFilteredOrdersOfBattle] = useState<Crusader.OrderOfBattle[]>(
    []
  );
  const player = useRecoilValue(PlayerAtom);

  const { loading } = useAsync(async () => {
    const crusade = await getCrusadeAsync(id);
    if (crusade) {
      setCurrentCrusade(crusade);

      const orders = await getCrusadeOrdersOfBattleAsync(crusade.id);
      if (orders) {
        setOrdersOfBattle(orders);
        setFilteredOrdersOfBattle(orders);
      }
    }
  }, [id]);

  const playerId = player ? player.id : 0;

  return (
    <Layout
      title="Crusade"
      actionComponent={
        currentCrusade && currentCrusade.createdById === playerId ? (
          <IconButton
            as={Link}
            to={`/crusade/${currentCrusade.id}/edit`}
            aria-label="Edit"
            icon={<MdEdit />}
            colorScheme="blue"
          />
        ) : undefined
      }
      isLoading={loading}
    >
      {currentCrusade && (
        <PageHeading name={currentCrusade.name}>
          <Tag>{format(parseISO(currentCrusade.createdDate), 'yyyy-MM-dd')}</Tag>
          <Tag colorScheme="blue">@{currentCrusade.createdBy}</Tag>
        </PageHeading>
      )}
      {currentCrusade && currentCrusade.notes && (
        <>
          <Divider mt="1rem !important" mb="0 !important" />
          <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
            {currentCrusade.notes}
          </ReactMarkdown>
          <Divider mt="0 !important" mb="1rem !important" />
        </>
      )}
      <Search
        value={searchTerm}
        onChange={(term) => {
          setSearchTerm(term);
          setFilteredOrdersOfBattle(
            ordersOfBattle.filter((c) => c.name.toLowerCase().includes(term.toLowerCase()))
          );
        }}
      />
      <VStack width="100%">
        {filteredOrdersOfBattle.map((oob) => (
          <OrderOfBattleCard key={oob.id} orderOfBattle={oob} showPlayerName />
        ))}
      </VStack>
    </Layout>
  );
};

export default Crusade;
