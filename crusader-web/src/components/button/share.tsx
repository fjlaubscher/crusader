import React from 'react';
import { FaShareAlt } from 'react-icons/fa';

// components
import Button from '.';

import useToast from '../../hooks/use-toast';

interface Props {
  link: string;
  title: string;
}

const ShareButton: React.FC<Props> = ({ link, title }) => {
  const toast = useToast();

  return (
    <Button
      leftIcon={<FaShareAlt />}
      variant="info"
      onClick={async () => {
        try {
          const shareLink = `${window.location.origin}${link}`;
          if (!navigator.canShare()) {
            await navigator.clipboard.writeText(shareLink);
            toast({
              variant: 'success',
              text: 'Link copied to your clipboard'
            });
          } else {
            await navigator.share({
              title,
              url: shareLink
            });
            toast({
              variant: 'success',
              text: 'Shared'
            });
          }
        } catch (ex: any) {
          toast({
            variant: 'error',
            text: ex.message || 'Unable to share'
          });
        }
      }}
    >
      Share
    </Button>
  );
};

export default ShareButton;