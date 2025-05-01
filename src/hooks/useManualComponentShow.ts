import { useState, useRef } from 'react';

export function useManualComponentShow<T extends HTMLElement>(
  initialIsVisible: boolean,
) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<T>(null);

  return { ref, isComponentVisible, setIsComponentVisible };
}
