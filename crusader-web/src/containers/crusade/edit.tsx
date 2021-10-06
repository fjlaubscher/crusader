import React from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { IconButton, useToast } from '@chakra-ui/react';
import { MdSave } from 'react-icons/md';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';

// api
import { getCrusadeAsync, updateCrusadeAsync } from '../../api/crusade';

// components
import CrusadeForm from '../../components/crusade/form';
import Layout from '../../components/layout';

// helpers
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../helpers/messages';

// state
import { CrusadeAtom } from '../../state/crusade';
import { PlayerAtom } from '../../state/player';

const EditCrusade = () => {
  const { id } = useParams<IdParams>();
  const history = useHistory();
  const toast = useToast();

  const [currentCrusade, setCurrentCrusade] = useRecoilState(CrusadeAtom);
  const player = useRecoilValue(PlayerAtom);

  const form = useForm<Crusader.Crusade>({ mode: 'onChange' });
  const {
    reset,
    formState: { isSubmitting, isValid }
  } = form;

  const { loading } = useAsync(async () => {
    if (!currentCrusade || currentCrusade.id !== parseInt(id)) {
      const crusade = await getCrusadeAsync(id);

      if (crusade) {
        setCurrentCrusade(crusade);
        reset(crusade);
      }
    } else if (currentCrusade) {
      reset(currentCrusade);
    }
  }, [id, currentCrusade, reset]);

  const playerId = player ? player.id : 0;
  const createdById = currentCrusade ? currentCrusade.createdById : 0;
  const isOwner = playerId && createdById && playerId === createdById;

  if (!loading && !isOwner) {
    return <Redirect to={`/crusade/${id}`} />;
  }

  return (
    <FormProvider {...form}>
      <Layout
        title={currentCrusade ? currentCrusade.name : 'Loading'}
        actionComponent={
          <IconButton
            aria-label="Save"
            icon={<MdSave />}
            disabled={!isValid || isSubmitting}
            colorScheme="blue"
            isLoading={isSubmitting}
            type="submit"
            form="crusade-form"
          />
        }
        isFullHeight
        isLoading={loading}
      >
        <CrusadeForm
          onSubmit={async (values) => {
            try {
              if (currentCrusade && player) {
                const updatedCrusade = await updateCrusadeAsync({
                  ...currentCrusade,
                  ...values
                });

                if (updatedCrusade) {
                  toast({
                    status: 'success',
                    title: SUCCESS_MESSAGE,
                    description: 'Crusade updated'
                  });

                  setCurrentCrusade(updatedCrusade);
                  history.push(`/crusade/${updatedCrusade.id}`);
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

export default EditCrusade;
