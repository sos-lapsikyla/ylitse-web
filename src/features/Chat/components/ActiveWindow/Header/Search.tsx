import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ICON_SIZES, palette } from '@/components/constants';
import TextInput from '@/components/TextInput';

const closeInputIconSize = 34;

type Props = {
  hideSearch: () => void;
};

// TODO: Not yet in use
const Search = ({ hideSearch }: Props) => {
  const { t } = useTranslation('chat');
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchBar>
      <SearchInput
        variant="iconInput"
        color={searchValue ? 'blueDark' : 'greyFaded'}
        leftIcon={{
          sizeInPx: ICON_SIZES.SMALL,
          variant: 'search',
        }}
        rightButton={{
          onClick: hideSearch,
          sizeInPx: closeInputIconSize,
          variant: 'closeWithBackground',
        }}
        onChange={setSearchValue}
        placeholder={t('header.search')}
        value={searchValue}
      />
    </SearchBar>
  );
};

const SearchBar = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-right: -${closeInputIconSize}px;
  margin-left: -${ICON_SIZES.SMALL}px;
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  max-width: 400px;

  &:focus {
    outline: 1px solid ${palette.purple};
  }
`;

export default Search;
