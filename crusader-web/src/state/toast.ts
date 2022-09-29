import { atom } from 'recoil';

export const ToastAtom = atom<Crusader.Toast[]>({
  key: 'toasts',
  default: []
});
