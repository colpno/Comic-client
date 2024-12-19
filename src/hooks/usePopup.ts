import { useState } from 'react';

export const usePopup = () => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const open = Boolean(ref);

  const openPopup = (e: React.MouseEvent<HTMLElement>) => {
    setRef(e.currentTarget);
  };

  const closePopup = () => {
    setRef(null);
  };

  return { popupRef: ref, openPopup, closePopup, open };
};
