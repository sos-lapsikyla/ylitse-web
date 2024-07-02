import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { SimpleChip } from '@/components/Chip';
import { Text } from '@/components/Text/Text';
import { breakpoints } from '@/components/variables';

export const Languages = ({
  languages,
  isMobile,
}: {
  languages: Array<string>;
  isMobile: boolean;
}) => {
  const { t } = useTranslation('mentors');
  return (
    <>
      <Header variant="h3" color={isMobile ? 'purpleDark' : 'white'}>
        {t('card.languages')}
      </Header>
      <Chips>
        {languages.map(item => (
          <SimpleChip key={item} text={item} />
        ))}
      </Chips>
    </>
  );
};

const Header = styled(Text)`
  margin-top: 3rem;
`;

const Chips = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 0.5rem;
  height: fit-content;
  justify-content: center;
  margin-top: 0.5rem;
  max-height: 7rem;
  overflow: hidden;
  position: relative;
  width: 100%;

  @media screen and (max-width: ${breakpoints.mobile}) {
    justify-content: flex-start;
  }
`;
