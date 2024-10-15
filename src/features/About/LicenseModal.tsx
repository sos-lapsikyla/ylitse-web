import { useTranslation } from 'react-i18next';

import { useEscape } from '@/hooks/useEscape';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { breakpoints, palette } from '@/components/constants';
import { Text } from '@/components/Text/Text';
import { IconButton } from '@/components/Buttons';
import styled, { css } from 'styled-components';

import licenses from '../../../licenses.json';

type Props = {
  onDismiss: () => void;
};

export const LicenseModal = ({ onDismiss }: Props) => {
  const { isMobile } = useGetLayoutMode();
  const { t } = useTranslation('common');
  const licenseMap = Object.entries(licenses).map(
    ([libraryName, libraryData]) => ({
      name: libraryName,
      ...libraryData,
    }),
  );

  useEscape(() => onDismiss());

  return (
    <Container>
      <Modal isMobile={isMobile}>
        <CloseContainer>
          <IconButton
            onClick={onDismiss}
            variant="closeWithBackground"
            sizeInPx={38}
          />
        </CloseContainer>
        <Text variant="h1">{t('about.licenses')} </Text>
        {licenseMap.map(license => (
          <Text key={license.name} variant="p">
            {license.name}
          </Text>
        ))}
      </Modal>
    </Container>
  );
};

const Modal = styled.div<{ isMobile: boolean }>`
  align-items: center;
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  left: 50%;
  margin: auto;
  opacity: 1;
  overflow: auto;
  padding: 1rem 1rem 2rem 1rem;
  position: fixed;
  scroll-snap-type: x mandatory;
  top: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;

  ${({ isMobile }) =>
    isMobile
      ? css`
          height: 80vw;
          width: 80vw;
        `
      : css`
          height: 40rem;
          width: 35vw;
        `}
`;

const Container = styled.div`
  background-color: ${palette.greyOverlay};
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 10;

  @media screen and (max-width: ${breakpoints.mobile}) {
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const CloseContainer = styled.div`
  align-self: flex-end;
`;

export default LicenseModal;
