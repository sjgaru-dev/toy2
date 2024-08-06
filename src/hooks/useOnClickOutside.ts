import { useEffect, RefObject } from 'react';

const useOnClickOutside = (ref: RefObject<HTMLElement>, onClickOutside: () => void) => {
  useEffect(() => {
    const onMousedown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', onMousedown);
    return () => {
      document.removeEventListener('mousedown', onMousedown);
    };
  }, [ref, onClickOutside]);
};

export default useOnClickOutside;
