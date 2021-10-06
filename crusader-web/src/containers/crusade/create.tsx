import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, IconButton, useToast } from '@chakra-ui/react';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

// api
import { createCrusadeAsync } from '../../api/crusade';

// components
import CrusadeForm from '../../components/crusade/form';
import Layout from '../../components/layout';

// helpers
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../helpers/messages';

// state
import { PlayerAtom } from '../../state/player';

const CreateCrusade = () => {
  const history = useHistory();

  const toast = useToast();
  const player = useRecoilValue(PlayerAtom);

  const form = useForm<Crusader.Crusade>({ mode: 'onChange' });

  return (
    <FormProvider {...form}>
      <Layout
        title="New Crusade"
        actionComponent={
          <IconButton
            aria-label="Save"
            icon={<MdSave />}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            colorScheme="blue"
            isLoading={form.formState.isSubmitting}
            type="submit"
            form="crusade-form"
          />
        }
        isFullHeight
      >
        <Button leftIcon={<MdArrowBack />} as={Link} to="/">
          Back
        </Button>
        <CrusadeForm
          onSubmit={async (values) => {
            try {
              if (player) {
                const newCrusade = await createCrusadeAsync({
                  ...values,
                  createdById: player.id,
                  createdDate: new Date().toISOString()
                });

                if (newCrusade) {
                  toast({
                    status: 'success',
                    title: SUCCESS_MESSAGE,
                    description: 'Crusade created'
                  });
                  history.push(`/crusade/${newCrusade.id}`);
                }
              }
            } catch (ex: any) {
              toast({
                status: 'error',
                title: ERROR_MESSAGE,
                description: ex.message
              });
            }
          }}
        />
      </Layout>
    </FormProvider>
  );
};

export default CreateCrusade;
