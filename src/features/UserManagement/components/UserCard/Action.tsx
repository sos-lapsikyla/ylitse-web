import styled from 'styled-components';
import Text from '@/components/Text';
import { palette } from '@/components/constants';
import { Chevron } from '@/components/Icons/Chevron';
import { useState } from 'react';
import { Button } from '@/components/Buttons';
import { useAppDispatch } from '@/store';
import { useNavigate } from 'react-router';
import { setConversation } from '@/features/Chat/chatSlice';
import { ManagedUser } from '../../models';

type Props = {
  managedUser: ManagedUser;
};

export const Action = ({ managedUser }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <ActionButton onClick={() => setIsOpen(!isOpen)}>
        <Text variant="bold" color="purple">
          Toiminnot
        </Text>
        <Chevron variant={isOpen ? 'up' : 'down'} color={'purple'} isLarge />
      </ActionButton>
      {isOpen && <ActionMenu managedUser={managedUser} />}
    </Container>
  );
};

const ActionMenu = ({ managedUser }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const name = managedUser.nickname;
  const buddyId = managedUser.account_id;

  const handleClick = () => {
    dispatch(setConversation({ name, buddyId }));
    navigate('/chat');
  };
  return (
    <Menu>
      <Button
        onClick={handleClick}
        sizeInPx={46}
        leftIcon="chatWithBackground"
        text={{
          variant: 'bold',
          color: 'purple',
          text: 'Aloita keskustelu',
        }}
      />
    </Menu>
  );
};

const ActionButton = styled.button`
  align-items: center;
  background-color: white;
  border: 2px solid ${palette.purple};
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  gap: 0.5rem;
  height: 2rem;
  justify-content: space-between;
  padding: 0 0.7rem;
  width: fit-content;

  &:focus {
    outline: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Menu = styled.div`
  background-color: white;
  border: 1px solid ${palette.purple};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 16px;
  width: 300;
`;
