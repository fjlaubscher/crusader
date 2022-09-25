import React from 'react';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { useToast } from '@chakra-ui/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { createPlayerAsync, getPlayersAsync } from '../../api/player';
import { SUCCESS_MESSAGE } from '../../helpers/messages';

import SignIn from '.';

jest.mock('@chakra-ui/react', () => ({
  __esModule: true,
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('recoil', () => ({
  __esModule: true,
  ...jest.requireActual('recoil'),
  useRecoilState: jest.fn()
}));

jest.mock('../../api/player', () => ({
  __esModule: true,
  createPlayerAsync: jest.fn(),
  getPlayersAsync: jest.fn()
}));

const useToastMock = useToast as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;
const useRecoilStateMock = useRecoilState as jest.Mock;
const createPlayerAsyncMock = createPlayerAsync as jest.Mock;
const getPlayersAsyncMock = getPlayersAsync as jest.Mock;

const arrangeTest = () => {
  render(
    <MemoryRouter>
      <SignIn />
    </MemoryRouter>
  );
};

const arrangeTestAndSubmit = async (value: string) => {
  arrangeTest();

  const inputElement = screen
    .getByTestId('sign-in-form')
    .querySelector('input[name="name"]') as Element;

  fireEvent.change(inputElement, { target: { value } });
  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Sign In' })).not.toBeDisabled();
  });

  fireEvent.submit(screen.getByTestId('sign-in-form'));
};

describe('Sign In', () => {
  beforeEach(() => {
    useRecoilStateMock.mockReturnValue([null, jest.fn()]);
  });

  it('redirects to the home page when the user signed in', () => {
    const navigateMock = jest.fn();
    useNavigateMock.mockReturnValue(navigateMock);
    useRecoilStateMock.mockReturnValue([{ id: 1, name: 'Crusader' }, jest.fn()]);
    arrangeTest();

    expect(navigateMock).toBeCalledWith('/');
  });

  it('displays the sign in form when the user is not signed in', () => {
    arrangeTest();

    expect(screen.getByTestId('sign-in-form')).toBeInTheDocument();
  });

  it('displays a loader when signing in', async () => {
    getPlayersAsyncMock.mockReturnValue(new Promise(() => {}));
    await arrangeTestAndSubmit('Crusader');

    await waitFor(() => {
      expect(getPlayersAsyncMock).toBeCalledWith('Crusader');
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

  it('creates a new user if the user does not exist', async () => {
    const setStateMock = jest.fn();
    useRecoilStateMock.mockReturnValue([null, setStateMock]);

    const toastMock = jest.fn();
    useToastMock.mockReturnValue(toastMock);

    getPlayersAsyncMock.mockResolvedValue([]);
    createPlayerAsyncMock.mockResolvedValue({ id: 1, name: 'Crusader' });

    arrangeTestAndSubmit('Crusader');

    await waitFor(() => {
      expect(createPlayerAsyncMock).toBeCalledWith('Crusader');
      expect(setStateMock).toBeCalledWith(expect.objectContaining({ id: 1, name: 'Crusader' }));
      expect(toastMock).toBeCalledWith(
        expect.objectContaining({
          status: 'success',
          title: SUCCESS_MESSAGE,
          description: 'Signed in'
        })
      );
    });
  });

  it('signs in if the user exists', async () => {
    const setStateMock = jest.fn();
    useRecoilStateMock.mockReturnValue([null, setStateMock]);

    const toastMock = jest.fn();
    useToastMock.mockReturnValue(toastMock);

    getPlayersAsyncMock.mockResolvedValue([{ id: 1, name: 'Crusader' }]);

    arrangeTestAndSubmit('Crusader');

    await waitFor(() => {
      expect(getPlayersAsyncMock).toBeCalledWith('Crusader');
      expect(setStateMock).toBeCalledWith(expect.objectContaining({ id: 1, name: 'Crusader' }));
      expect(toastMock).toBeCalledWith(
        expect.objectContaining({
          status: 'success',
          title: SUCCESS_MESSAGE,
          description: 'Signed in'
        })
      );
    });
  });
});
