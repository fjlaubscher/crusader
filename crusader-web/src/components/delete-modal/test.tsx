import React from 'react';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';

import DeleteModal, { Props } from '.';

const onDeleteMock = jest.fn().mockResolvedValue({});
const onDeleteSuccessMock = jest.fn();
const onDeleteErrorMock = jest.fn();

const arrangeTest = () => {
  render(
    <DeleteModal
      title="Delete Something"
      onDelete={onDeleteMock}
      onDeleteSuccess={onDeleteSuccessMock}
      onDeleteError={onDeleteErrorMock}
    />
  );
};

const arrangeTestAndOpenModal = () => {
  arrangeTest();
  fireEvent.click(screen.getByTestId('delete-button'));
}

const arrangeTestAndDelete = async () => {
  arrangeTestAndOpenModal()

  await waitFor(() => {
    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
  })

  fireEvent.click(screen.getByTestId('confirm-delete-button'));
}

describe('DeleteModal', () => {
  it('displays a delete button with the title', () => {
    arrangeTest();

    expect(screen.getByTestId('delete-button')).toHaveTextContent('Delete Something');
  });

  it('opens the delete modal when the button is clicked', async () => {
    arrangeTestAndOpenModal();

    await waitFor(() => {
      expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
      expect(screen.getByTestId('delete-modal-title')).toHaveTextContent('Delete Something');
    });
  });

  it('closes the modal when the Cancel button is clicked', async () => {
    arrangeTestAndOpenModal()

    await waitFor(() => {
      expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    await waitFor(() => {
      expect(screen.queryByTestId('delete-modal')).toBe(null);
    });
  });

  it('calls onDelete when the Delete button is clicked', async () => {
    await arrangeTestAndDelete()

    await waitFor(() => {
      expect(screen.getByTestId('confirm-delete-button')).toBeDisabled();
      expect(onDeleteMock).toBeCalled();
    });
  });

  it('closes the modal and calls onDeleteSuccess when onDelete is resolved', async () => {
    onDeleteMock.mockResolvedValue(true)
    await arrangeTestAndDelete()

    await waitFor(() => {
      expect(screen.queryByTestId('delete-modal')).toBe(null);
      expect(onDeleteSuccessMock).toBeCalled();
    });
  });

  it('closes the modal and calls onDeleteError when onDelete has failed', async () => {
    onDeleteMock.mockResolvedValue(false)
    await arrangeTestAndDelete()

    await waitFor(() => {
      expect(screen.queryByTestId('delete-modal')).toBe(null);
      expect(onDeleteSuccessMock).toBeCalled();
    })
  });

  it('calls onDeleteError with an error message if onDelete has raised an exception', async () => {
    onDeleteMock.mockRejectedValue({ message: 'Error' })
    await arrangeTestAndDelete()

    await waitFor(() => {
      expect(onDeleteErrorMock).toBeCalledWith('Error');
    })
  });
});
