import { useState, useEffect } from 'react';
import {
  TABLET_THRESHOLD,
  MOBILE_THRESHOLD,
  TABLET_NARROW_THRESHOLD,
} from '@/components/constants';

/**
 * Checks the width of screen and returns flags for size
 *
 * isTablet: if screen is smaller or equal than TABLET_THRESHOLD
 * isTabletWide: if screen is smaller or equal to TABLET_WIDE_THRESHOLD
 * isMobile: if screen is smaller or equal than MOBILE_THRESHOLD
 */
export const useGetLayoutMode = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isTabletNarrow = width <= TABLET_NARROW_THRESHOLD;
  const isTablet = width <= TABLET_THRESHOLD;
  const isMobile = width <= MOBILE_THRESHOLD;

  return { isTablet, isMobile, isTabletNarrow };
};
