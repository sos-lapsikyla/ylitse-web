import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  selectAccount,
  selectIsMentor,
} from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';
import { useDeleteAccountMutation } from '@/features/Authentication/authenticationApi';
import { useConfirm } from '@/hooks/useConfirm';

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
  const { getConfirmation } = useConfirm();
  const { id, login_name: loginName, role } = useAppSelector(selectAccount);
  const isMentor = useAppSelector(selectIsMentor);
  const [deleteAccount] = useDeleteAccountMutation();

  const confirmDelete = async () => {
    const isConfirmed = await getConfirmation({
      borderColor: palette.redSalmon,
      closeText: t('account.delete.cancel'),
      confirmId: 'confirm-delete',
      confirmText: t('account.delete.confirm'),
      description: t('account.delete.description'),
      title: t('account.delete.title'),
    });
    if (isConfirmed) {
      deleteAccount(id);
    }
  };

  const userRoleIcons = {
    admin: <img src={AdminIcon} />,
    mentee: <ProfileIcon color="purpleDark" />,
    mentor: <img src={MentorIcon} />,
  };

  return (
    <Container isMentor={isMentor} isMobile={isMobile}>
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
          <DeleteButton variant="danger" onClick={confirmDelete}>
            {t('account.delete.title')}
          </DeleteButton>
        </>
      )}
    </Container>
  );
};

const Container = styled.div<{ isMentor: boolean; isMobile: boolean }>`
  background-color: ${palette.white};
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: fit-content;
  padding: 2rem 3rem;

  ${({ isMentor, isMobile }) =>
    !isMobile &&
    css`
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
      ${!isMentor &&
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

const Public = styled.div`
  margin-top: 2rem;
`;

const DeleteButton = styled(TextButton)`
  align-self: center;
  margin-top: 2rem;
`;

export default AccountInfo;
