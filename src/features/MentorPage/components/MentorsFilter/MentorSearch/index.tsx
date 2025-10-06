import { useAppDispatch, useAppSelector } from '@/store';
import {
  resetSearch,
  selectSelectedSkills,
} from '@/features/MentorPage/mentorsFilterSlice';

import { useTranslation, Trans } from 'react-i18next';

import styled from 'styled-components';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/Buttons';
import { palette } from '@/components/constants';
import Text from '@/components/Text';
import { IconButton } from '@/components/Buttons';

type Props = {
  isExpanded: boolean;
  toggleExpanded: (next: boolean) => void;
  searchString: string;
  onSearchStringChange: (value: string) => void;
};

const MentorSearch = ({
  isExpanded,
  toggleExpanded,
  searchString,
  onSearchStringChange,
}: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('mentors');
  const buttonText = isExpanded ? 'filters.close' : 'filters.show';

  const selectedSkills = useAppSelector(selectSelectedSkills);

  const shouldShowFilterBall = !isExpanded && selectedSkills.length > 0;

  const shouldShowResetButton = searchString !== '';

  const handleReset = () => {
    dispatch(resetSearch());
  };

  return (
    <>
      <SearchHeader variant="h1">{t('filters.title')}</SearchHeader>
      <Instructions>
        <Text variant="p">
          <Trans t={t} i18nKey="filters.instructions" />
        </Text>
      </Instructions>
      <Container>
        <SearchBarContainer>
          <NarrowSearchBar
            placeholder={t('filters.search')}
            value={searchString}
            onChange={onSearchStringChange}
            variant="normal"
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
      </Container>
    </>
  );
};

const SearchHeader = styled(Text)`
  text-align: center;
`;

const Instructions = styled.div`
  width: 58%;
  max-width: 58%;
  margin: auto;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  width: 90%;
  max-width: 90%;
  margin: auto;
`;

const Anchor = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const Ball = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0.2rem;
  margin-bottom: 5px;
  background: ${palette.blue2};
  border-radius: 50%;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 44%;
  padding-left: 12%;
`;

const NarrowSearchBar = styled(SearchBar)`
  z-index: 1;
  flex: 1;
`;

const ResetSearch = styled.div`
  z-index: 2;
  margin-left: -2.5rem;
`;

export default MentorSearch;
