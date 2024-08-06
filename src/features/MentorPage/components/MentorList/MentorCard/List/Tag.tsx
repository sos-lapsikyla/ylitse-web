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
    me: { text: t('card.me'), tagColor: palette.blueWhite },
    new: { text: t('card.new'), tagColor: palette.orange },
    unavailable: { text: t('card.unavailable'), tagColor: palette.blueWhite },
    empty: { text: '', tagColor: '' },
  };

  const tagMessage = statusMap[status].text;
  const tagColor = statusMap[status].tagColor;
  const shouldTagShow = status !== 'empty';

  return (
    <MentorTag variant="bold" isShowing={shouldTagShow} tagColor={tagColor}>
      {tagMessage}
    </MentorTag>
  );
};

const MentorTag = styled(Text)<{ isShowing: boolean; tagColor: string }>`
  background-color: ${props => props.tagColor};
  border-radius: 0.25rem;
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  margin: 0;
  padding: 0.25rem 1rem;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(-1rem, -50%);
`;
