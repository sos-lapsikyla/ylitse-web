import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { SimpleChip } from '@/components/Chip';
import { Text } from '@/components/Text/Text';
import { breakpoints } from '@/components/constants';

export const Languages = ({
  languages,
  isTabletNarrow,
  isMe,
}: {
  languages: Array<string>;
  isTabletNarrow: boolean;
  isMe: boolean;
}) => {
  const { t } = useTranslation('mentors');
  return (
    <div>
      <Header
        variant="h3"
        color={isTabletNarrow || isMe ? 'blueDark' : 'white'}
      >
        {t('card.languages')}
      </Header>
      <Chips>
        {languages.map(item => (
          <SimpleChip key={item} text={item} />
        ))}
      </Chips>
    </div>
  );
};

const Header = styled(Text)`
  margin-top: 3rem;
`;

const Chips = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  width: 100%;
  height: fit-content;
  max-height: 7rem;
  margin-top: 0.5rem;
  overflow: hidden;

  @media screen and (max-width: ${breakpoints.mobile}) {
    justify-content: flex-start;
  }
`;
