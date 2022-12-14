import { useParams, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { IconButton, useToast } from '@fjlaubscher/matter';

// api
import { createCrusadeCardAsync } from '../../api/crusade-card';

// components
import CrusadeCardForm from '../../components/crusade-card/form';
import Layout from '../../components/layout';
import LinkButton from '../../components/button/link';

import styles from './crusade-card.module.scss';

const CreateCrusadeCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const form = useForm<Crusader.CrusadeCard>({
    mode: 'onChange',
    defaultValues: {
      battles: 0,
      battlesSurvived: 0,
      crusadePoints: 0,
      experiencePoints: 0,
      powerRating: 0,
      unitsDestroyedMelee: 0,
      unitsDestroyedPsychic: 0,
      unitsDestroyedRanged: 0
    }
  });
  const { isSubmitting, isValid } = form.formState;

  return (
    <FormProvider {...form}>
      <Layout
        title="New Crusade Card"
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
      >
        <LinkButton
          className={styles.back}
          leftIcon={<FaArrowLeft />}
          to={`/order-of-battle/${id}`}
        >
          Back
        </LinkButton>
        <CrusadeCardForm
          onSubmit={async (values) => {
            try {
              if (id) {
                const newCrusadeCard = await createCrusadeCardAsync({
                  ...values,
                  orderOfBattleId: parseInt(id)
                });

                if (newCrusadeCard) {
                  toast({
                    variant: 'success',
                    text: `Added to ${newCrusadeCard.orderOfBattle}`
                  });
                  navigate(`/order-of-battle/${id}`);
                }
              }
            } catch (ex: any) {
              toast({
                variant: 'error',
                text: ex.message || 'Unable to add Crusade Card'
              });
            }
          }}
        />
      </Layout>
    </FormProvider>
  );
};

export default CreateCrusadeCard;
