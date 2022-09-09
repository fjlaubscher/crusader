import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Accordion, Button, IconButton, SimpleGrid, Tag, useMediaQuery } from '@chakra-ui/react';
import { MdEdit, MdPersonAddAlt1 } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';
import { parseISO, format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

// api
import { getCrusadeAsync } from '../../api/crusade';
import { getCrusadeOrdersOfBattleAsync } from '../../api/order-of-battle';

// components
import AccordionItem from '../../components/accordion-item';
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
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCrusade, setCurrentCrusade] = useRecoilState(CrusadeAtom);
  const [ordersOfBattle, setOrdersOfBattle] = useState<Crusader.OrderOfBattle[]>([]);
  const [filteredOrdersOfBattle, setFilteredOrdersOfBattle] = useState<Crusader.OrderOfBattle[]>(
    []
  );
  const player = useRecoilValue(PlayerAtom);

  const { loading } = useAsync(async () => {
    const crusade = id ? await getCrusadeAsync(id) : undefined;
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
  const hasJoined = playerId
    ? ordersOfBattle.filter((o) => o.playerId === playerId).length > 0
    : false;

  const [isTabletOrLarger] = useMediaQuery('(min-width: 767px)');

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
        <>
          <PageHeading name={currentCrusade.name}>
            <Tag>{format(parseISO(currentCrusade.createdDate), 'yyyy-MM-dd')}</Tag>
            <Tag as={Link} to={`/player/${currentCrusade.createdById}`} colorScheme="blue">
              @{currentCrusade.createdBy}
            </Tag>
          </PageHeading>
          {!hasJoined && (
            <Button
              leftIcon={<MdPersonAddAlt1 />}
              as={Link}
              to={`/crusade/${id}/join`}
              colorScheme="blue"
              size="lg"
              width="100%"
              mb="0.5rem !important"
            >
              Join Crusade
            </Button>
          )}
          <Accordion defaultIndex={hasJoined ? [1] : [0]} width="100%" allowMultiple allowToggle>
            <AccordionItem title="About this Crusade">
              <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
                {currentCrusade.notes}
              </ReactMarkdown>
            </AccordionItem>
            <AccordionItem title="Crusaders">
              <Search
                value={searchTerm}
                onChange={(term) => {
                  setSearchTerm(term);
                  setFilteredOrdersOfBattle(
                    ordersOfBattle.filter((c) => c.name.toLowerCase().includes(term.toLowerCase()))
                  );
                }}
              />
              <SimpleGrid columns={isTabletOrLarger ? 3 : 1} width="100%" mt="0 !important" gap={4}>
                {filteredOrdersOfBattle.map((oob) => (
                  <OrderOfBattleCard key={oob.id} orderOfBattle={oob} showPlayerName />
                ))}
              </SimpleGrid>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </Layout>
  );
};

export default Crusade;
