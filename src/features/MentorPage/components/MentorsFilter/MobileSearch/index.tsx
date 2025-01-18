import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { Button } from '@/components/Buttons';
import { palette } from '@/components/constants';
import { Text } from '@/components/Text/Text';
import SearchBar from '@/components/SearchBar';
import { useAppSelector } from '@/store';
import { selectSelectedSkills } from '@/features/MentorPage/mentorsFilterSlice';

type Props = {
  isExpanded: boolean;
  toggleExpanded: (next: boolean) => void;
  searchString: string;
  onSearchStringChange: (value: string) => void;
};

const MobileSearch = ({
  isExpanded,
  toggleExpanded,
  searchString,
  onSearchStringChange,
}: Props) => {
  const { t } = useTranslation('mentors');
  const buttonText = isExpanded ? 'filters.close' : 'filters.show';
  const selectedSkills = useAppSelector(selectSelectedSkills);
  const shouldShowFilterBall = !isExpanded && selectedSkills.length > 0;

  return (
    <MobileContainer>
      <MobileHeader variant="h1">{t('filters.title')}</MobileHeader>
      <Text>{t('filters.description')}</Text>
      <NarrowSearchBar
        variant="small"
        placeholder={t('filters.search')}
        value={searchString}
        onChange={onSearchStringChange}
      />
      <Anchor>
        <Button
          onClick={() => toggleExpanded(!isExpanded)}
          leftIcon={isExpanded ? 'close' : 'filter'}
          sizeInPx={isExpanded ? 16 : 20}
          text={{
            color: 'purple',
            text: t(buttonText),
            variant: 'boldBaloo',
          }}
        />
        {shouldShowFilterBall && (
          <Ball>
            <Text variant="bold">{selectedSkills.length}</Text>
          </Ball>
        )}
      </Anchor>
    </MobileContainer>
  );
};

const Anchor = styled.div`
  display: flex;
  margin-top: 2rem;
  position: relative;
`;

const Ball = styled.div`
  align-items: center;
  background: ${palette.blue2};
  border-radius: 50%;
  box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
  display: flex;
  height: 20px;
  justify-content: center;
  left: -0.75rem;
  padding: 0.1rem;
  position: absolute;
  top: 0.25rem;
  width: 20px;
  z-index: 20;
`;

const MobileContainer = styled.div`
  align-items: center;
  background-color: ${palette.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
`;

const MobileHeader = styled(Text)`
  align-self: flex-start;
`;

const NarrowSearchBar = styled(SearchBar)`
  flex: 1;
  width: 100%;
  z-index: 1;
`;

export default MobileSearch;
