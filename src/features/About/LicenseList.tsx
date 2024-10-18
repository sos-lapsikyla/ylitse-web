import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { palette } from '@/components/constants';
import { Text } from '@/components/Text/Text';
import styled, { css } from 'styled-components';

import licenses from '../../../licenses.json';

type LicenseData = {
  name: string;
  licenses: string;
  repository?: string;
};

export const LicenseModal = () => {
  const { isMobile } = useGetLayoutMode();
  const licenseMap = Object.entries(licenses).map<LicenseData>(
    ([libraryName, libraryData]) => ({
      name: libraryName,
      ...libraryData,
    }),
  );

  return (
    <Container isMobile={isMobile}>
      {licenseMap.map(license => (
        <LicenseRow key={license.name}>
          <LicenseInfo variant="p">
            {license.name} {license.licenses}
          </LicenseInfo>
          <LicenseInfo variant="p">
            <a href={license.repository}>{license.repository}</a>
          </LicenseInfo>
        </LicenseRow>
      ))}
    </Container>
  );
};

const LicenseRow = styled.div`
  align-items: left;
  display: flex;
  flex-direction: row;
  flexwrap: wrap;
  justify-content: space-between;
  margin: 0px;
`;

const LicenseInfo = styled(Text)`
  display: flex;
  flexwrap: wrap;
  margin: 0px;
`;

const Container = styled.div<{ isMobile: boolean }>`
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
          width: 80vw;
        `
      : css`
          height: 10rem;
          width: 35vw;
        `}
`;

export default LicenseModal;
