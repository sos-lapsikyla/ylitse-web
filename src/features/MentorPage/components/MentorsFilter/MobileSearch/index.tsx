import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { Button, IconButton } from '@/components/Buttons';
import { palette } from '@/components/constants';
import { Text } from '@/components/Text/Text';
import SearchBar from '@/components/SearchBar';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  resetSearch,
  selectSelectedSkills,
} from '@/features/MentorPage/mentorsFilterSlice';

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
  const dispatch = useAppDispatch();
  const { t } = useTranslation('mentors');
  const buttonText = isExpanded ? 'filters.close' : 'filters.show';
  const selectedSkills = useAppSelector(selectSelectedSkills);

  const shouldShowResetButton = searchString !== '';

  const shouldShowFilterBall = !isExpanded && selectedSkills.length > 0;

  const handleReset = () => {
    dispatch(resetSearch());
  };

  return (
    <MobileContainer>
      <MobileHeader variant="h1">{t('filters.title')}</MobileHeader>
      <Text>{t('filters.description')}</Text>
      <SearchBarContainer>
        <NarrowSearchBar
          variant="small"
          placeholder={t('filters.search')}
          value={searchString}
          onChange={onSearchStringChange}
        />
        {shouldShowResetButton && (
          <ResetSearch>
            <IconButton
              onClick={handleReset}
              variant="closeWithBackground"
              sizeInPx={32}
            />
          </ResetSearch>
        )}
      </SearchBarContainer>
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
  position: relative;
  display: flex;
  gap: 0.9rem;
  margin-top: 2rem;
`;

const Ball = styled.div`
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0.2rem;
  background: ${palette.blue2};
  border-radius: 50%;
`;

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background-color: ${palette.white};
`;

const MobileHeader = styled(Text)`
  align-self: flex-start;
`;

const NarrowSearchBar = styled(SearchBar)`
  z-index: 1;
  flex: 1;
  max-width: 100%;
  padding-top: 1rem;
`;

const SearchBarContainer = styled.div`
  position: relative;
  justify-content: center;
  width: 100%;
`;

const ResetSearch = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 5%;
  z-index: 2;
`;

export default MobileSearch;
