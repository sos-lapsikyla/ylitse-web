import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { setShowFolders } from '@/features/Chat/chatSlice';
import { useAppDispatch, useAppSelector } from '@/store';

import { DEFAULT_ICON_SIZE } from '@/components/constants';
import IconButton from '@/components/Buttons/IconButton';
import { Row } from './Row';
import Text from '@/components/Text';

const Header = () => {
  const { t } = useTranslation('chat');
  const { showFolders, activeFolder } = useAppSelector(state => state.chats);

  const dispatch = useAppDispatch();
  const toggleFolders = () => {
    dispatch(setShowFolders(!showFolders));
  };

  return (
    <HeaderRow>
      <Title variant="h1">{t(`menu.title.${activeFolder}`)}</Title>
      <Buttons>
        <IconButton
          variant="menuLines"
          sizeInPx={DEFAULT_ICON_SIZE.MEDIUM}
          onClick={toggleFolders}
        />
      </Buttons>
    </HeaderRow>
  );
};

const HeaderRow = styled(Row)`
  border-radius: 10px 10px 0 0;
`;

const Title = styled(Text)`
  flex: 1;
`;

const Buttons = styled.div`
  display: flex;
  gap: 25px;
  padding-right: 30px;
`;

export default Header;
