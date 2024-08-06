import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toastOff, toastOn } from '@/store/reducer/toastSlice';

const useToast = () => {
  const dispatch = useAppDispatch();
  const { isToastOn, toastMsg } = useAppSelector((state) => state.toast);

  const handler = {
    toastTrigger: (msg: string) => {
      dispatch(toastOn({ toastMsg: msg }));
    },
    onClose: () => {
      dispatch(toastOff());
    },
  };

  return { isToastOn, toastMsg, toastTrigger: handler.toastTrigger, onClose: handler.onClose };
};

export default useToast;
