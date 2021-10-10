import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack
} from '@chakra-ui/react';
import { MdHome, MdListAlt, MdLogout, MdSettings } from 'react-icons/md';
import { useRecoilValue } from 'recoil';

// state
import { PlayerAtom } from '../state/player';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: Props) => {
  const player = useRecoilValue(PlayerAtom);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Crusader</DrawerHeader>
        <DrawerBody>
          <VStack width="100%">
            <Button
              isFullWidth
              leftIcon={<MdHome />}
              justifyContent="flex-start"
              as={ReactRouterLink}
              to="/"
              size="lg"
              iconSpacing={4}
              onClick={onClose}
            >
              Your Crusades
            </Button>
            {player && (
              <Button
                isFullWidth
                leftIcon={<MdListAlt />}
                justifyContent="flex-start"
                as={ReactRouterLink}
                to={`/player/${player.id}`}
                size="lg"
                iconSpacing={4}
              >
                Your Profile
              </Button>
            )}
            <Button
              isFullWidth
              leftIcon={<MdSettings />}
              justifyContent="flex-start"
              as={ReactRouterLink}
              to="/settings"
              size="lg"
              iconSpacing={4}
            >
              Settings
            </Button>
            <Button
              isFullWidth
              leftIcon={<MdLogout />}
              justifyContent="flex-start"
              as={ReactRouterLink}
              to="/sign-out"
              size="lg"
              iconSpacing={4}
            >
              Sign Out
            </Button>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
