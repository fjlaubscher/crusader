import { screen, render } from '@testing-library/react';
import { useRecoilValue } from 'recoil';

import ProtectedRoute from '.';

jest.mock('recoil', () => ({
  __esModule: true,
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn()
}));

jest.mock('../../containers/sign-in', () => ({
  __esModule: true,
  default: () => <div data-testid="sign-in">sign in</div>
}));
jest.mock('../../state/player');

const useRecoilValueMock = useRecoilValue as jest.Mock;

const arrangeTest = () => {
  render(
    <ProtectedRoute>
      <div data-testid="page">page</div>
    </ProtectedRoute>
  );
};

describe('ProtectedRoute', () => {
  describe('when the user is not signed in', () => {
    it('renders the sign-in page', () => {
      useRecoilValueMock.mockReturnValue(null);
      arrangeTest();

      expect(screen.getByTestId('sign-in')).toBeInTheDocument();
    });
  });

  describe('when the user is signed in', () => {
    it('renders the protected component', () => {
      useRecoilValueMock.mockReturnValue({ id: 1, name: 'User' });
      arrangeTest();

      expect(screen.getByTestId('page')).toBeInTheDocument();
    });
  });
});
