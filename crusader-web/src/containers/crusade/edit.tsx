import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';

// api
import { getCrusadeAsync, updateCrusadeAsync } from '../../api/crusade';

// components
import CrusadeForm from '../../components/crusade/form';
import Layout from '../../components/layout';
import IconButton from '../../components/button/icon';
import LinkButton from '../../components/button/link';

// hooks
import useToast from '../../hooks/use-toast';

// state
import { CrusadeAtom } from '../../state/crusade';
import { PlayerAtom } from '../../state/player';

import styles from './crusade.module.scss';

const EditCrusade = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [currentCrusade, setCurrentCrusade] = useRecoilState(CrusadeAtom);
  const player = useRecoilValue(PlayerAtom);

  const form = useForm<Crusader.Crusade>({ mode: 'onChange' });
  const {
    reset,
    formState: { isSubmitting, isValid }
  } = form;

  const { loading } = useAsync(async () => {
    if (id) {
      if (!currentCrusade || currentCrusade.id !== parseInt(id)) {
        const crusade = await getCrusadeAsync(id);

        if (crusade) {
          setCurrentCrusade(crusade);
          reset(crusade);
        }
      } else if (currentCrusade) {
        reset(currentCrusade);
      }
    }
  }, [id, currentCrusade, reset]);

  const playerId = player ? player.id : 0;
  const createdById = currentCrusade ? currentCrusade.createdById : 0;
  const isOwner = playerId && createdById && playerId === createdById;

  if (!loading && !isOwner) {
    return <Navigate to={`/crusade/${id}`} />;
  }

  return (
    <FormProvider {...form}>
      <Layout
        title="Edit Crusade"
        action={
          <IconButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            form="crusade-form"
            variant="info"
          >
            <FaSave />
          </IconButton>
        }
        isLoading={loading}
      >
        <LinkButton className={styles.back} leftIcon={<FaArrowLeft />} to={`/crusade/${id}`}>
          Back
        </LinkButton>
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
                    variant: 'success',
                    text: 'Crusade updated'
                  });

                  setCurrentCrusade(updatedCrusade);
                  navigate(`/crusade/${updatedCrusade.id}`);
                }
              }
            } catch (ex: any) {
              toast({
                variant: 'error',
                text: ex.message || 'Unable to update Crusade'
              });
            }
          }}
        />
      </Layout>
    </FormProvider>
  );
};

export default EditCrusade;
