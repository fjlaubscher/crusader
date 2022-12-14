import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useAsync } from 'react-use';
import { IconButton, useToast } from '@fjlaubscher/matter';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';

// api
import { getCrusadeCardAsync, updateCrusadeCardAsync } from '../../api/crusade-card';

// state
import { CrusadeCardsAtom } from '../../state/crusade-card';

// components
import CrusadeCardForm from '../../components/crusade-card/form';
import Layout from '../../components/layout';
import LinkButton from '../../components/button/link';

import styles from './crusade-card.module.scss';

const EditCrusadeCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const setCrusadeCards = useSetRecoilState(CrusadeCardsAtom);

  const form = useForm<Crusader.CrusadeCard>({ mode: 'onChange' });
  const {
    reset,
    formState: { isSubmitting, isValid }
  } = form;

  const { loading, value: crusadeCard } = useAsync(async () => {
    const crusadeCard = id ? await getCrusadeCardAsync(id) : undefined;

    if (crusadeCard) {
      reset(crusadeCard);
    }

    return crusadeCard;
  }, [id, reset]);

  return (
    <FormProvider {...form}>
      <Layout
        title="Edit Crusade Card"
        action={
          <IconButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            form="crusade-card-form"
            variant="info"
          >
            <FaSave />
          </IconButton>
        }
        isLoading={loading}
      >
        <LinkButton className={styles.back} leftIcon={<FaArrowLeft />} to={`/crusade-card/${id}`}>
          Back
        </LinkButton>
        <CrusadeCardForm
          onSubmit={async (values) => {
            try {
              if (crusadeCard) {
                const updatedCrusadeCard = await updateCrusadeCardAsync({
                  ...crusadeCard,
                  ...values
                });

                if (updatedCrusadeCard) {
                  toast({
                    variant: 'success',
                    text: 'Crusade Card updated'
                  });

                  // force a refresh of recoil state
                  setCrusadeCards([]);
                  navigate(`/crusade-card/${updatedCrusadeCard.id}`);
                }
              }
            } catch (ex: any) {
              toast({
                variant: 'error',
                text: ex.message || 'Unable to update Crusade Card'
              });
            }
          }}
        />
      </Layout>
    </FormProvider>
  );
};

export default EditCrusadeCard;
