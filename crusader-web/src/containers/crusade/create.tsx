import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { FaSave } from 'react-icons/fa';
import { IconButton, useToast } from '@fjlaubscher/matter';

// api
import { createCrusadeAsync } from '../../api/crusade';

// components
import CrusadeForm from '../../components/crusade/form';
import Layout from '../../components/layout';

// state
import { PlayerAtom } from '../../state/player';

const CreateCrusade = () => {
  const navigate = useNavigate();

  const toast = useToast();
  const player = useRecoilValue(PlayerAtom);

  const form = useForm<Crusader.Crusade>({ mode: 'onChange' });
  const { isValid, isSubmitting } = form.formState;

  return (
    <FormProvider {...form}>
      <Layout
        title="New Crusade"
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
                  toast({
                    variant: 'success',
                    text: 'Crusade created'
                  });
                  navigate(`/crusade/${newCrusade.id}`);
                }
              }
            } catch (ex: any) {
              toast({
                variant: 'error',
                text: ex.message || 'Unable to create Crusade'
              });
            }
          }}
        />
      </Layout>
    </FormProvider>
  );
};

export default CreateCrusade;
