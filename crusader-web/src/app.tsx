import { Suspense } from 'react';
import { Loader } from '@fjlaubscher/matter';

// helpers
import useAppMount from './helpers/use-app-mount';

import Routes from './routes';

const Router = () => {
  const { loading } = useAppMount();

  return loading ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Routes />
    </Suspense>
  );
};

export default Router;
