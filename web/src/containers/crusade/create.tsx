import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, useToast } from '@chakra-ui/react';
import { MdSave } from 'react-icons/md';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// api
import { createCrusadeAsync, getPlayerCrusadesAsync } from '../../api/crusade';

// components
import CrusadeForm from '../../components/crusade/form';
import Layout from '../../components/layout';

// helpers
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../helpers/messages';

// state
import { CrusadesAtom } from '../../state/crusade';
import { PlayerAtom } from '../../state/player';

const CreateCrusade = () => {
  const history = useHistory();

  const toast = useToast();
  const player = useRecoilValue(PlayerAtom);
  const setCrusades = useSetRecoilState(CrusadesAtom);

  const form = useForm<Crusader.Crusade>({ mode: 'onChange' });

  return (
    <FormProvider {...form}>
      <Layout
        title="New Crusade"
        actionComponent={
          <IconButton
            aria-label="Save"
            fontSize="1.5rem"
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
                  const crusades = await getPlayerCrusadesAsync(player.id);

                  if (crusades) {
                    setCrusades(crusades);
                    toast({
                      status: 'success',
                      title: SUCCESS_MESSAGE,
                      description: 'Crusade created'
                    });
                    history.push(`/crusade/${newCrusade.id}`);
                  }
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
