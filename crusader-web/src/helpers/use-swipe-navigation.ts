import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

// helpers
import { getPreviousAndNextIds } from './list';

const useSwipeNavigation = (path: string, items: Partial<{ id: number }>[], id?: string) => {
  const navigate = useNavigate();

  const { previousId, nextId } = useMemo(() => getPreviousAndNextIds(items, id), [items, id]);

  const handleSwipeRight = useCallback(() => {
    if (nextId) {
      navigate(`/${path}/${nextId}`);
    }
  }, [navigate, path, nextId]);

  const handleSwipeLeft = useCallback(() => {
    if (previousId) {
      navigate(`/${path}/${previousId}`);
    }
  }, [navigate, path, previousId]);

  return useSwipeable({ onSwipedLeft: handleSwipeLeft, onSwipedRight: handleSwipeRight });
};

export default useSwipeNavigation;
