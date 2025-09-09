import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import styled from 'styled-components';
import { ManagedUser } from '../../models';
import Text from '@/components/Text';

type Props = {
  managedUser: ManagedUser;
};

export const CardContent: React.FC<Props> = ({ managedUser }) => {
  const { isMobile } = useGetLayoutMode();

  return (
    <Card isMobile={isMobile}>
      <Text variant="h3">{'Julkinen käyttäjänimi'}</Text>
      <Text variant="p">{managedUser.nickname}</Text>
      <Text variant="h3">{'Luotu '}</Text>
      <Text variant="p">
        {new Date(managedUser.created).toLocaleString('fi-EU', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
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

export default CardContent;
