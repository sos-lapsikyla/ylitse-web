import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  selectAccount,
  selectIsMentor,
} from '@/features/Authentication/selectors';
import { useAppSelector } from '@/store';
//import { useConfirm } from '@/features/Confirmation/useConfirm';
import { useDeleteAccountMutation } from '@/features/ProfilePage/profileApi';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';

import AdminIcon from '@/static/icons/admin.svg';
import DisplayNameEditor from './DisplayNameEditor';
import EmailEditor from './EmailEditor';
import MentorIcon from '@/static/icons/mentor.svg';
import { OUTER_VERTICAL_MARGIN, palette } from '@/components/constants';
import PasswordEditor from './PasswordEditor';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import { Section, Value } from '.';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';

type Props = {
  isMobile?: boolean;
};

const AccountInfo = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('profile');
  const { id, login_name: loginName, role } = useAppSelector(selectAccount);
  const isMentor = useAppSelector(selectIsMentor);
  const [deleteAccount] = useDeleteAccountMutation();
  const confirmDelete = useConfirmDelete();

  const userRoleIcons = {
    admin: <img src={AdminIcon} />,
    mentee: <ProfileIcon color="purpleDark" />,
    mentor: <img src={MentorIcon} />,
  };

  return (
    <Container $isMentor={isMentor} $isMobile={isMobile}>
      {!isMentor && (
        <MenteeHeader>
          <Text variant="h1">{t('title')}</Text>
        </MenteeHeader>
      )}

      <Text variant="h2">{t('account.title')}</Text>
      <Section>
        <Text variant="label">{t('account.role.title')}</Text>
        <Role>
          {userRoleIcons[role]}
          <Text>{t(`account.role.${role}`)}</Text>
        </Role>
      </Section>
      <Section>
        <Text variant="label">{t('account.loginName')}</Text>
        <Value>{loginName}</Value>
      </Section>
      <PasswordEditor />
      <EmailEditor />

      {!isMentor && (
        <>
          <Public>
            <Text variant="h2">{t('public.title')}</Text>
            <DisplayNameEditor />
          </Public>
          <DeleteButton
            variant="danger"
            onClick={() =>
              confirmDelete({
                id,
                onDelete: deleteAccount,
                title: t('account.delete.title'),
                description: t('account.delete.description'),
                confirmId: 'confirm-delete',
                borderColor: palette.redSalmon,
                closeText: t('account.delete.cancel'),
                confirmText: t('account.delete.confirm'),
              })
            }
          >
            {t('account.delete.title')}
          </DeleteButton>
        </>
      )}
    </Container>
  );
};

const Container = styled.div<{ $isMentor: boolean; $isMobile: boolean }>`
  background-color: ${palette.white};
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: fit-content;
  padding: 2rem 3rem 2.5rem 3rem;

  ${({ $isMentor, $isMobile }) =>
    !$isMobile &&
    css`
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
      ${!$isMentor &&
      `
      align-content: center;
      margin: ${OUTER_VERTICAL_MARGIN} auto;
      width: 670px;
      `}
    `}
`;

const MenteeHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Role = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Public = styled(Section)`
  margin-top: 1rem;
  padding: 1rem 0 0 0;
`;

const DeleteButton = styled(TextButton)`
  align-self: center;
  margin-top: 2.5rem;
`;

export default AccountInfo;
