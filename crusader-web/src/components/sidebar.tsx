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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: Props) => (
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
          <Button
            isFullWidth
            leftIcon={<MdListAlt />}
            justifyContent="flex-start"
            as={ReactRouterLink}
            to="/orders-of-battle"
            size="lg"
            iconSpacing={4}
          >
            Orders of Battle
          </Button>
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

export default Sidebar;
