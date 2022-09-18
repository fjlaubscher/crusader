import React from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import {
  Button,
  Divider,
  IconButton,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Tag,
  useMediaQuery
} from '@chakra-ui/react';
import { MdArrowBack, MdEdit } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';

// api
import { getCrusadeCardAsync } from '../../api/crusade-card';
import { getOrderOfBattleAsync } from '../../api/order-of-battle';

// components
import Layout from '../../components/layout';
import PageHeading from '../../components/page-heading';

// state
import { OrderOfBattleAtom } from '../../state/order-of-battle';
import { PlayerAtom } from '../../state/player';
import CrusadeCardTabs from '../../components/crusade-card/tabs';

const CrusadeCard = () => {
  const { id } = useParams();

  const [currentOrderOfBattle, setCurrentOrderOfBattle] = useRecoilState(OrderOfBattleAtom);
  const player = useRecoilValue(PlayerAtom);

  const { loading, value: crusadeCard } = useAsync(async () => {
    const crusadeCard = id ? await getCrusadeCardAsync(id) : undefined;
    const currentOrderOfBattleId = currentOrderOfBattle ? currentOrderOfBattle.id : 0;

    if (crusadeCard && crusadeCard.orderOfBattleId !== currentOrderOfBattleId) {
      const orderOfBattle = await getOrderOfBattleAsync(crusadeCard.orderOfBattleId);
      if (orderOfBattle) {
        setCurrentOrderOfBattle(orderOfBattle);
      }
    }

    return crusadeCard;
  }, [id]);

  const playerId = player ? player.id : 0;
  const isOwner = currentOrderOfBattle ? currentOrderOfBattle.playerId === playerId : false;

  const [isTabletOrLarger] = useMediaQuery('(min-width: 767px)');

  return (
    <Layout
      title="Crusade Card"
      actionComponent={
        isOwner ? (
          <IconButton
            as={ReactRouterLink}
            to={`/crusade-card/${id}/edit`}
            aria-label="Edit"
            icon={<MdEdit />}
            colorScheme="blue"
          />
        ) : undefined
      }
      isLoading={loading}
    >
      {crusadeCard && currentOrderOfBattle && (
        <>
          <Button
            leftIcon={<MdArrowBack />}
            as={ReactRouterLink}
            to={`/order-of-battle/${crusadeCard.orderOfBattleId}`}
          >
            {crusadeCard.orderOfBattle}
          </Button>
          <PageHeading name={crusadeCard.name} description={crusadeCard.unitType}>
            <Tag colorScheme="blue">{crusadeCard.battlefieldRole}</Tag>
            <Tag colorScheme="green">{crusadeCard.powerRating}PR</Tag>
          </PageHeading>
          <SimpleGrid width="100%" columns={isTabletOrLarger ? 6 : 2} rowGap={4}>
            <Stat>
              <StatLabel>Crusade Points</StatLabel>
              <StatNumber>{crusadeCard.crusadePoints}CP</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Experience Points</StatLabel>
              <StatNumber>{crusadeCard.experiencePoints}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Battles Survived</StatLabel>
              <StatNumber>
                {crusadeCard.battlesSurvived}/{crusadeCard.battles}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Total Units Destroyed</StatLabel>
              <StatNumber>{crusadeCard.unitsDestroyed}</StatNumber>
            </Stat>
          </SimpleGrid>
          <Divider mt="1rem !important" mb="0 !important" />
          <CrusadeCardTabs crusadeCard={crusadeCard} isOwner={isOwner} />
        </>
      )}
    </Layout>
  );
};

export default CrusadeCard;
