import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { palette } from '@/components/variables';
import { Text } from '@/components/Text/Text';
import SearchBar from '@/components/SearchBar';

type Props = {
  searchString: string;
  onSearchStringChange: (value: string) => void;
};

const MobileSearch = ({ searchString, onSearchStringChange }: Props) => {
  const { t } = useTranslation('mentors');

  return (
    <MobileContainer>
      <MobileHeader variant="h1">{t('filters.title')}</MobileHeader>
      <Text>{t('filters.description')}</Text>
      <SearchBar
        variant="small"
        placeholder={t('filters.search')}
        value={searchString}
        onChange={onSearchStringChange}
      />
    </MobileContainer>
  );
};

const MobileContainer = styled.div`
  align-items: center;
  background-color: ${palette.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
`;

const MobileHeader = styled(Text)`
  align-self: flex-start;
`;

export default MobileSearch;
