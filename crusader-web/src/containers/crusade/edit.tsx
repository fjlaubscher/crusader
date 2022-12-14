import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';
import { IconButton, useToast } from '@fjlaubscher/matter';

// api
import { getCrusadeAsync, updateCrusadeAsync } from '../../api/crusade';

// components
import CrusadeForm from '../../components/crusade/form';
import Layout from '../../components/layout';
import LinkButton from '../../components/button/link';

// state
import { PlayerAtom } from '../../state/player';

import styles from './crusade.module.scss';

const EditCrusade = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const player = useRecoilValue(PlayerAtom);

  const form = useForm<Crusader.Crusade>({ mode: 'onChange' });
  const {
    reset,
    formState: { isSubmitting, isValid }
  } = form;

  const { loading, value: crusade } = useAsync(async () => {
    if (id) {
      const crusade = await getCrusadeAsync(id);

      if (crusade) {
        reset(crusade);
      }

      return crusade;
    }

    return undefined;
  }, []);

  const playerId = player ? player.id : 0;
  const createdById = crusade ? crusade.createdById : 0;
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
              if (crusade && player) {
                const updatedCrusade = await updateCrusadeAsync({
                  ...crusade,
                  ...values
                });

                if (updatedCrusade) {
                  toast({
                    variant: 'success',
                    text: 'Crusade updated'
                  });

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
