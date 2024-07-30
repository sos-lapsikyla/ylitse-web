import { useTranslation } from 'react-i18next';

import { breakpoints, palette } from '@/components/variables';
import styled from 'styled-components';
import { Text } from '@/components/Text/Text';

export type Status = 'new' | 'me' | 'unavailable' | 'empty';

type Props = {
  status: Status;
};

export const Tag: React.FC<Props> = ({ status }) => {
  const { t } = useTranslation('mentors');

  const statusMap = {
    me: { text: t('card.me'), color: palette.blueWhite },
    unavailable: { text: t('card.unavailable'), color: palette.blueWhite },
    new: { text: t('card.new'), color: palette.orange },
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
  display: ${props => (props.isShowing ? `flex` : `none`)};
  background-color: ${props => props.backgroundColor};
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  width: fit-content;
          margin: -1rem auto;

  @media screen and (max-width: ${breakpoints.mobile}) {
    margin -1rem 1rem;
  }
`;
