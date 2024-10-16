import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { palette } from '@/components/constants';
import { Text } from '@/components/Text/Text';
import styled, { css } from 'styled-components';

import licenses from '../../../licenses.json';

export const LicenseModal = () => {
  const { isMobile } = useGetLayoutMode();
  const licenseMap = Object.entries(licenses).map(
    ([libraryName, libraryData]) => ({
      name: libraryName,
      ...libraryData,
    }),
  );

  return (
    <Modal isMobile={isMobile}>
      {licenseMap.map(license => (
        <LicenseRow key={license.name} variant="p">
          {license.name} {license.licenses}
        </LicenseRow>
      ))}
    </Modal>
  );
};

const LicenseRow = styled(Text)`
  display: flex;
  flexwrap: wrap;
  margin: 0px;
`;

const Modal = styled.div<{ isMobile: boolean }>`
  align-items: center;
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  left: 50%;
  margin: 1rem;
  opacity: 1;
  overflow: auto;
  padding: 1rem 1rem 2rem 1rem;
  scroll-snap-type: x mandatory;

  ${({ isMobile }) =>
    isMobile
      ? css`
          height: 10rem;
        `
      : css`
          height: 10rem;
        `}
`;

export default LicenseModal;
