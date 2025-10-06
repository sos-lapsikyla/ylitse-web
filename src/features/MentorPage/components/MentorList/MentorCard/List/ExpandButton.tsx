import type { Mentor } from '@/features/MentorPage/models';

import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { TextButton } from '@/components/Buttons';

type Props = {
  setVisibleCard: (mentor: Mentor) => void;
  mentor: Mentor;
};

export const ExpandButton = ({ setVisibleCard, mentor }: Props) => {
  const { t } = useTranslation('mentors');
  return (
    <Container>
      <TextButton onClick={() => setVisibleCard(mentor)}>
        {t('card.open')}
      </TextButton>
    </Container>
  );
};

const Container = styled.div`
  z-index: 2;
  display: flex;
  justify-content: center;
`;
