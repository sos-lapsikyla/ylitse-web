import { useAppSelector } from '@/store';
import { selectSelectedSkills } from '@/features/MentorPage/mentorsFilterSlice';

import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/Buttons';
import { palette } from '@/components/variables';
import Text from '@/components/Text';

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
  const { t } = useTranslation('mentors');
  const buttonText = isExpanded ? 'filters.close' : 'filters.show';

  const selectedSkills = useAppSelector(selectSelectedSkills);

  const shouldShowFilterBall = !isExpanded && selectedSkills.length > 0;

  return (
    <>
      <SearchHeader variant="h1">{t('filters.title')}</SearchHeader>
      <Container>
        <NarrowSearchBar
          placeholder={t('filters.search')}
          value={searchString}
          onChange={onSearchStringChange}
          variant="normal"
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
      </Container>
    </>
  );
};

const SearchHeader = styled(Text)`
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 2.5rem;
  justify-content: center;
  margin: auto;
  max-width: 90%;
  width: 90%;
`;

const Anchor = styled.div`
  display: flex;
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

const NarrowSearchBar = styled(SearchBar)`
  width: 50%;
`;

export default MentorSearch;
