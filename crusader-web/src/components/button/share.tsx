import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { Button, useToast } from '@fjlaubscher/matter'

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
          const shareData: ShareData = {
            title: 'Crusader',
            text: title,
            url: shareLink
          };

          if (!navigator.canShare || !navigator.canShare(shareData)) {
            await navigator.clipboard.writeText(shareLink);
            toast({
              variant: 'success',
              text: 'Link copied to your clipboard'
            });
          } else {
            await navigator.share(shareData);
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
