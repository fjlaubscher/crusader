import React, { useCallback, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

export interface Props {
  title: string;
  onDelete: () => Promise<boolean | undefined>;
  onDeleteSuccess: () => void;
  onDeleteError: (errorMessage?: string) => void;
}

const DeleteModal: React.FC<Props> = ({ title, onDelete, onDeleteSuccess, onDeleteError }) => {
  const [busy, setBusy] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const handleDelete = useCallback(async () => {
    try {
      setBusy(true);
      const result = await onDelete();
      if (result) {
        onDeleteSuccess();
        onClose();
      } else {
        onDeleteError();
      }
    } catch (ex: any) {
      onDeleteError(ex.message);
    }
  }, [setBusy, onDelete, onDeleteSuccess, onDeleteError, onClose]);

  return (
    <>
      <Button
        leftIcon={<MdDelete />}
        width="100%"
        colorScheme="red"
        onClick={onOpen}
        data-testid="delete-button"
      >
        {title}
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent data-testid="delete-modal">
            <AlertDialogHeader fontSize="lg" fontWeight="bold" data-testid="delete-modal-title">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                isLoading={busy}
                disabled={busy}
                ml={3}
                data-testid="confirm-delete-button"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteModal;
