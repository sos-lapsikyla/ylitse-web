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
  display: flex;
  gap: 0.9rem;
  margin-top: 2rem;
  position: relative;
`;

const Ball = styled.div`
  align-items: center;
  background: ${palette.blue2};
  border-radius: 50%;
  display: flex;
  height: 20px;
  justify-content: center;
  padding: 0.2rem;
  width: 20px;
  z-index: 20;
`;

const MobileContainer = styled.div`
  align-items: center;
  background-color: ${palette.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
  padding: 1.5rem;
`;

const MobileHeader = styled(Text)`
  align-self: flex-start;
`;

const NarrowSearchBar = styled(SearchBar)`
  flex: 1;
  max-width: 100%;
  padding-top: 1rem;
  z-index: 1;
`;

const SearchBarContainer = styled.div`
  justify-content: center;
  position: relative;
  width: 100%;
`;

const ResetSearch = styled.div`
  position: absolute;
  right: 5%;
  top: 1.5rem;
  z-index: 2;
`;

export default MobileSearch;
