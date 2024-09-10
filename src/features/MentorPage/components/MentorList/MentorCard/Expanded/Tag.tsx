import { useTranslation } from 'react-i18next';

import { breakpoints, palette } from '@/components/variables';
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
  display: ${props => (props.isShowing ? `flex` : `none`)};
  padding: 0.25rem 1rem;  
  margin: -1rem auto;
  position: absolute;
  left: 19.5%;
  top: 0;
  transform: translate(-50%, -30%);
  width: fit-content;
  
  @media screen and (max-width: ${breakpoints.mobile}) {
    margin: -1rem 1rem;
    transform: translateX(-50%);
    position: absolute;
    top: 3.25rem;
    left: 50%;
    

`;
