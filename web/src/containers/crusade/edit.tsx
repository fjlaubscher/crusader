import React from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { IconButton, Progress, useToast } from '@chakra-ui/react';
import { MdSave } from 'react-icons/md';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useAsync } from 'react-use';

// api
import { getCrusadeAsync, getPlayerCrusadesAsync, updateCrusadeAsync } from '../../api/crusade';

// components
import CrusadeForm from '../../components/crusade/form';
import Layout from '../../components/layout';

// helpers
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../helpers/messages';

// state
import { CurrentCrusadeAtom, CrusadesAtom } from '../../state/crusade';
import { PlayerAtom } from '../../state/player';

const EditCrusade = () => {
  const { id } = useParams<IdParams>();
  const history = useHistory();
  const toast = useToast();

  const [currentCrusade, setCurrentCrusade] = useRecoilState(CurrentCrusadeAtom);
  const setCrusades = useSetRecoilState(CrusadesAtom);
  const player = useRecoilValue(PlayerAtom);

  const form = useForm<Crusader.Crusade>({ mode: 'onChange' });
  const {
    reset,
    formState: { isSubmitting, isValid }
  } = form;

  const { loading } = useAsync(async () => {
    const crusade = await getCrusadeAsync(id);
    if (crusade) {
      setCurrentCrusade(crusade);
      reset(crusade);
    }
  }, [id, reset]);

  const playerId = player ? player.id : 0;
  const createdById = currentCrusade ? currentCrusade.createdById : 0;

  if (!createdById || (!playerId && createdById !== playerId)) {
    return <Redirect to={`/crusade/${id}`} />;
  }

  return loading ? (
    <Progress isIndeterminate />
  ) : (
    <FormProvider {...form}>
      <Layout
        title={currentCrusade ? currentCrusade.name : 'Loading'}
        actionComponent={
          <IconButton
            aria-label="Save"
            fontSize="1.5rem"
            icon={<MdSave />}
            disabled={!isValid || isSubmitting}
            colorScheme="blue"
            isLoading={isSubmitting}
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
                const updatedCrusade = await updateCrusadeAsync({
                  ...currentCrusade,
                  ...values
                });

                if (updatedCrusade) {
                  setCurrentCrusade(updatedCrusade);
                  const crusades = await getPlayerCrusadesAsync(player.id);

                  if (crusades) {
                    setCrusades(crusades);
                    toast({
                      status: 'success',
                      title: SUCCESS_MESSAGE,
                      description: 'Crusade updated'
                    });
                    history.push(`/crusade/${updatedCrusade.id}`);
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

export default EditCrusade;
