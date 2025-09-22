import { useAppDispatch } from '@/store';
import { setActiveFolder, setShowFolders } from '@/features/Chat/chatSlice';
import { useTranslation } from 'react-i18next';

import type { ChatFolder } from '@/features/Chat/models';

import styled, { css } from 'styled-components';
import BackArrowIcon from '@/static/icons/back-arrow.svg';
import { palette } from '@/components/constants';
import { Row } from './Row';
import Text from '@/components/Text';

type Props = {
  targetFolder: ChatFolder;
};

const FolderLink = ({ targetFolder }: Props) => {
  const { t } = useTranslation('chat');

  const dispatch = useAppDispatch();

  const changeActiveFolder = (folder: ChatFolder) => {
    dispatch(setActiveFolder(folder));
  };

  const hideFolders = () => {
    dispatch(setShowFolders(false));
  };

  const isTargetActiveFolder = targetFolder === 'ok';

  return (
    <LinkRow
      onClick={() => {
        changeActiveFolder(targetFolder);
        hideFolders();
      }}
    >
      <Link $isTargetActiveFolder>
        {isTargetActiveFolder && <BackToActiveIcon src={BackArrowIcon} />}
        <Text variant="bold" color="purple">
          {isTargetActiveFolder ? t('menu.back') : t(`menu.${targetFolder}`)}
        </Text>
      </Link>
    </LinkRow>
  );
};

const LinkRow = styled(Row)`
  cursor: pointer;

  &:hover {
    background-color: ${palette.blueWhite};
  }
`;

const Link = styled.a<{ $isTargetActiveFolder: boolean }>`
  ${({ $isTargetActiveFolder }) =>
    $isTargetActiveFolder &&
    css`
      align-items: center;
      display: flex;
      padding-right: 40px;
    `}
`;

const BackToActiveIcon = styled.img`
  padding-right: 20px;
`;

export default FolderLink;
