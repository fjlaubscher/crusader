import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// api
import { deleteCrusadeCardAsync } from '../../api/crusade-card';

// components
import DeleteModal from '../delete-modal';

// helpers
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../helpers/messages';

// styles
import styles from '../../styles/markdown.module.css';

interface Props {
  crusadeCard: Crusader.CrusadeCard;
  isOwner: boolean;
}

const CrusadeCardTabs: React.FC<Props> = ({ crusadeCard, isOwner }) => {
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <Tabs my="0 !important" width="100%">
      <TabList whiteSpace="nowrap" maxWidth="100%" overflowX="scroll" overflowY="hidden">
        {crusadeCard.notes && <Tab>About</Tab>}
        {crusadeCard.abilities && <Tab>Abilities</Tab>}
        {crusadeCard.battleHonours && <Tab>Battle Honours</Tab>}
        {crusadeCard.battleScars && <Tab>Battle Scars</Tab>}
        {crusadeCard.equipment && <Tab>Equipment</Tab>}
        {crusadeCard.relics && <Tab>Relics</Tab>}
        {crusadeCard.warlordTraits && <Tab>Warlord Traits</Tab>}
        {isOwner && <Tab>Settings</Tab>}
      </TabList>
      <TabPanels>
        {crusadeCard.notes && (
          <TabPanel width="100%" p={0}>
            <ReactMarkdown className={`${styles.markdown} ${styles.preLineWrap}`}>
              {crusadeCard.notes}
            </ReactMarkdown>
          </TabPanel>
        )}
        {crusadeCard.abilities && (
          <TabPanel width="100%" p={0}>
            <ReactMarkdown className={`${styles.markdown} ${styles.preLineWrap}`}>
              {crusadeCard.abilities}
            </ReactMarkdown>
          </TabPanel>
        )}
        {crusadeCard.battleHonours && (
          <TabPanel width="100%" p={0}>
            <ReactMarkdown className={`${styles.markdown} ${styles.preLineWrap}`}>
              {crusadeCard.battleHonours}
            </ReactMarkdown>
          </TabPanel>
        )}
        {crusadeCard.battleScars && (
          <TabPanel width="100%" p={0}>
            <ReactMarkdown className={`${styles.markdown} ${styles.preLineWrap}`}>
              {crusadeCard.battleScars}
            </ReactMarkdown>
          </TabPanel>
        )}
        {crusadeCard.equipment && (
          <TabPanel width="100%" p={0}>
            <ReactMarkdown className={`${styles.markdown} ${styles.preLineWrap}`}>
              {crusadeCard.equipment}
            </ReactMarkdown>
          </TabPanel>
        )}
        {crusadeCard.relics && (
          <TabPanel width="100%" p={0}>
            <ReactMarkdown className={`${styles.markdown} ${styles.preLineWrap}`}>
              {crusadeCard.relics}
            </ReactMarkdown>
          </TabPanel>
        )}
        {crusadeCard.warlordTraits && (
          <TabPanel width="100%" p={0}>
            <ReactMarkdown className={`${styles.markdown} ${styles.preLineWrap}`}>
              {crusadeCard.warlordTraits}
            </ReactMarkdown>
          </TabPanel>
        )}
        {isOwner && (
          <TabPanel width="100%" px={0}>
            <DeleteModal
              title={`Delete ${crusadeCard.name}`}
              onDelete={() => deleteCrusadeCardAsync(crusadeCard.id)}
              onDeleteSuccess={() => {
                toast({
                  status: 'success',
                  title: SUCCESS_MESSAGE,
                  description: `${crusadeCard.name} deleted.`
                });

                navigate(`/order-of-battle/${crusadeCard.orderOfBattleId}`);
              }}
              onDeleteError={(errorMessage) => {
                toast({
                  status: 'error',
                  title: ERROR_MESSAGE,
                  description: errorMessage || `Unable to delete ${crusadeCard.name}.`
                });
              }}
            />
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  );
};

export default CrusadeCardTabs;
