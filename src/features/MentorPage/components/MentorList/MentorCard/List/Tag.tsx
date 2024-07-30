import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import styled from 'styled-components';
import { Text } from '@/components/Text/Text';

export type Status = 'me' | 'new' | 'unavailable' | 'empty';

type Props = {
  status: Status;
};

export const Tag: React.FC<Props> = ({ status }) => {
  const { t } = useTranslation('mentors');

  const statusMap = {
    me: { text: t('card.me'), color: palette.blueWhite },
    new: { text: t('card.new'), color: palette.orange },
    unavailable: { text: t('card.unavailable'), color: palette.blueWhite },
    empty: { text: '', color: '' },
  };

  const tagMessage = statusMap[status].text;
  const backgroundColor = statusMap[status].color;
  const shouldTagShow = status !== 'empty';

  return (
    <MentorTag isShowing={shouldTagShow} backgroundColor={backgroundColor}>
      {tagMessage}
    </MentorTag>
  );
};

const MentorTag = styled(Text)<{ isShowing: boolean; backgroundColor: string }>`
  background-color: ${props => props.backgroundColor};
  border-radius: 0.25rem;
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  margin: 0;
  padding: 0.25rem 1rem;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(-1rem, -50%);
`;
