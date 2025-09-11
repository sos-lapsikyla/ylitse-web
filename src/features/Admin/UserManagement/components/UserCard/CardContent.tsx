import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import styled from 'styled-components';
import { ManagedUser } from '../../models';
import Text from '@/components/Text';
import { useTranslation } from 'react-i18next';

type Props = {
  managedUser: ManagedUser;
};

export const CardContent: React.FC<Props> = ({ managedUser }) => {
  const { isMobile } = useGetLayoutMode();
  const { t } = useTranslation('users');

  return (
    <Card isMobile={isMobile}>
      <TextGroup>
        <Text variant="boldBaloo">{t('card.userName')}</Text>
        <UserInfoText variant="p">{managedUser.username}</UserInfoText>
      </TextGroup>
      <TextGroup>
        <Text variant="boldBaloo">{t('card.publicName')}</Text>
        <UserInfoText variant="p">{managedUser.nickname}</UserInfoText>
      </TextGroup>
      <TextGroup>
        <Text variant="boldBaloo">{t('card.email')}</Text>
        <UserInfoText variant="p">{managedUser.email}</UserInfoText>
      </TextGroup>
      <TextGroup>
        <Text variant="boldBaloo">{t('card.created')}</Text>
        <UserInfoText variant="p">
          {new Date(managedUser.created).toLocaleString('fi-EU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </UserInfoText>
      </TextGroup>
    </Card>
  );
};

const Card = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: space-between;
  padding: ${({ isMobile }) => (isMobile ? '1.5rem' : '2.5rem')};
`;

const UserInfoText = styled(Text)`
  margin: 0;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export default CardContent;
