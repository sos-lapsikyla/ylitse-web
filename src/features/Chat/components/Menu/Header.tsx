import { setShowFolders } from '@/features/Chat/chatSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import IconButton from '@/components/Buttons/IconButton';
import { palette } from '@/components/variables';
import Text from '@/components/Text';

type Props = {
  showSearch: boolean;
};

const Header = ({ showSearch }: Props) => {
  const { t } = useTranslation('chat');
  const { showFolders, activeFolder } = useAppSelector(state => state.chats);

  const dispatch = useAppDispatch();
  const toggleFolders = () => {
    dispatch(setShowFolders(!showFolders));
  };

  return (
    <Row>
      <Title variant="h1">{t(`menu.title.${activeFolder}`)}</Title>
      <Buttons>
        {showSearch && (
          <IconButton
            variant="searchWithBackground"
            sizeInPx={40}
            onClick={() => console.log('searching...')}
          />
        )}
        <IconButton
          id="open-folder-menu"
          variant="menuLines"
          sizeInPx={40}
          onClick={toggleFolders}
        />
      </Buttons>
    </Row>
  );
};

const Row = styled.div`
  align-items: center;
  border-bottom: 1px solid ${palette.greyLight};
  border-radius: 10px 10px 0 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 80px;
  padding-left: 40px;
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
