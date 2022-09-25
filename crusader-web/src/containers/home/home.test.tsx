import React from 'react';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { useRecoilValue } from 'recoil';
import { MemoryRouter } from 'react-router-dom';
import { useMediaQuery } from '@chakra-ui/react';

import { getPlayerCrusadesAsync } from '../../api/crusade';

import { MOCK_PLAYER, MOCK_ORDER_OF_BATTLE, MOCK_CRUSADE } from '../../mock/data';

import Home from '.';

jest.mock('@chakra-ui/react', () => ({
  __esModule: true,
  ...jest.requireActual('@chakra-ui/react'),
  useMediaQuery: jest.fn()
}));

jest.mock('recoil', () => ({
  __esModule: true,
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn()
}));

jest.mock('../../api/crusade', () => ({
  __esModule: true,
  getPlayerCrusadesAsync: jest.fn()
}));

const getPlayerCrusadesAsyncMock = getPlayerCrusadesAsync as jest.Mock;
const useMediaQueryMock = useMediaQuery as jest.Mock;
const useRecoilValueMock = useRecoilValue as jest.Mock;

const arrangeTest = () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
};

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getPlayerCrusadesAsyncMock.mockResolvedValue([MOCK_CRUSADE]);
    useMediaQueryMock.mockReturnValue([true]);
    useRecoilValueMock.mockReturnValueOnce(MOCK_PLAYER).mockReturnValueOnce([MOCK_ORDER_OF_BATTLE]);
  });

  describe('when the orders of battle tab is active', () => {
    it.skip('displays an alert when the player has no orders of battle', async () => {
      useRecoilValueMock.mockClear();
      useRecoilValueMock.mockReturnValueOnce(MOCK_PLAYER).mockReturnValueOnce([]);
      arrangeTest();

      await waitFor(() => {
        expect(screen.getByTestId('orders-of-battle-alert')).toBeInTheDocument();
      });
    });

    it.skip('displays orders of battle', async () => {
      arrangeTest();

      await waitFor(() => {
        expect(screen.getByTestId('order-of-battle-card')).toHaveAttribute(
          'href',
          `/order-of-battle/${MOCK_ORDER_OF_BATTLE.id}`
        );
      });
    });
  });

  describe('when the crusades tab is active', () => {
    it('displays an alert when the player has not joined a crusade', async () => {
      getPlayerCrusadesAsyncMock.mockResolvedValue([]);
      arrangeTest();

      await waitFor(() => {
        expect(screen.getByTestId('crusades-alert')).toBeInTheDocument();
      });
    });

    it('displays joined crusades', async () => {
      arrangeTest();

      await waitFor(() => {
        expect(screen.getByTestId('crusade-link')).toHaveAttribute(
          'href',
          `/crusade/${MOCK_CRUSADE.id}`
        );
      });
    });
  });
});
