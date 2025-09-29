import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/constants';
import { Text } from '@/components/Text/Text';
import styled, { css } from 'styled-components';

import { useEffect, useState } from 'react';

import licensesJson from '../../../licenses.json' with { type: 'json' };

type LicenseData = {
  name: string;
  licenses: string;
  repository?: string;
};

type LicensesJson = Record<string, { licenses: string; repository?: string }>;

export const LicenseModal = () => {
  const { isMobile } = useGetLayoutMode();
  const { t } = useTranslation('common');
  const [licenseMap, setLicenseMap] = useState<LicenseData[]>([]);

  useEffect(() => {
    const loadLicenses = () => {
      try {
        const licenses = licensesJson as unknown as LicensesJson;
        const licenseData = Object.entries(licenses).map<LicenseData>(
          ([libraryName, libraryData]) => ({
            name: libraryName,
            licenses: libraryData.licenses,
            repository: libraryData.repository,
          }),
        );
        setLicenseMap(licenseData);
      } catch (error) {
        setLicenseMap([]);
      }
    };

    loadLicenses();
  }, []);

  return (
    <Container $isMobile={isMobile}>
      {licenseMap.length > 0 ? (
        licenseMap.map(license => (
          <LicenseRow $isMobile={isMobile} key={license.name}>
            <LicenseInfo variant="p">{license.name}</LicenseInfo>
            {license.repository && (
              <LicenseInfo variant="p">
                <a href={license.repository}>{license.licenses}</a>
              </LicenseInfo>
            )}
          </LicenseRow>
        ))
      ) : (
        <LicenseInfo variant="p">{t('about.noFile')}</LicenseInfo>
      )}
    </Container>
  );
};

const LicenseRow = styled.div<{ $isMobile: boolean }>`
  align-items: left;
  display: flex;
  flex-direction: row;
  flexwrap: wrap;
  justify-content: space-between;
  margin: 0px;
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          padding: 0 0.5rem 0.5rem 0.5rem;
        `
      : css`
          padding: 0 1.5rem 0 1.5rem;
        `}
`;

const LicenseInfo = styled(Text)`
  display: flex;
  flexwrap: wrap;
  margin: 0px;
`;

const Container = styled.div<{ $isMobile: boolean }>`
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  left: 50%;
  margin: 1rem;
  opacity: 1;
  overflow: auto;
  overflow-x: hidden
  padding: 1rem 0 2rem 0;
  scroll-snap-type: x mandatory;

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          max-width: 80vw;
          min-height: 10rem;
        `
      : css`
          max-width: 35vw;
          min-height: 10rem;
        `}
`;

export default LicenseModal;
