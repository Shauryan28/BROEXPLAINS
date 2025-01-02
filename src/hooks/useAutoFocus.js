import { useEffect, useRef } from 'react';

export function useAutoFocus(dependencies = []) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.focus();
  }, dependencies);

  return ref;
}