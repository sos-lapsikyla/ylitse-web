import type { Mentor } from '@/features/MentorPage/models';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { Text } from '@/components/Text/Text';
import { Languages } from './Languages';
import { breakpoints, palette } from '@/components/constants';

type Props = {
  mentor: Mentor;
  isMe: boolean;
};

export const BasicInfo = ({
  mentor: { name, age, region, statusMessage, languages },
  isMe,
}: Props) => {
  const { isTabletNarrow } = useGetLayoutMode();
  const { t } = useTranslation('mentors');
  const areLanguagesDisplayed = !isTabletNarrow && languages.length > 0;
  const isDividerDisplayed = Boolean(age) && Boolean(region);

  return (
    <Container isTabletNarrow={isTabletNarrow}>
      <NameText
        variant={isTabletNarrow ? 'h2' : 'h3'}
        color={isMe ? 'blueDark' : 'white'}
      >
        {name}
      </NameText>
      {!isTabletNarrow && <NameDivider isMe={isMe} />}
      <WrappedText color={isMe ? 'blueDark' : 'white'}>
        {age}
        {t('card.age')}
        {isDividerDisplayed && <Divider>|</Divider>}
        {region}
      </WrappedText>
      <TruncateText
        isTabletNarrow={isTabletNarrow}
        color={isMe ? 'blueDark' : 'white'}
      >
        {statusMessage}
      </TruncateText>
      {areLanguagesDisplayed && (
        <Languages
          languages={languages}
          isMe={isMe}
          isTabletNarrow={isTabletNarrow}
        />
      )}
    </Container>
  );
};

const Container = styled.div<{ isTabletNarrow: boolean }>`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: ${({ isTabletNarrow }) =>
    isTabletNarrow ? '1.5rem auto 0.5rem auto' : ' 0 auto'};
  max-width: 70%;
  padding-bottom: ${({ isTabletNarrow }) => (isTabletNarrow ? '0' : '5rem')};

  @media screen and (max-width: ${breakpoints.tabletNarrow}) {
    align-items: flex-start;
    justify-content: center;
    margin-left: -2rem;
  }
`;

const NameText = styled(Text)`
  overflow-wrap: anywhere;
`;

const NameDivider = styled.div<{ isMe: boolean }>`
  border-bottom: 1px solid ${({ isMe }) => (isMe ? palette.blueDark : 'white')};
  height: 2px;
  margin-bottom: 0.5rem;
  margin-top: 0.25rem;
  width: 16vw;
`;

const Divider = styled.span`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export const WrappedText = styled(Text)`
  display: flex;
  flexwrap: wrap;
  margin: 0px;
`;

export const TruncateText = styled(Text)<{ isTabletNarrow: boolean }>`
  ${({ isTabletNarrow }) => `
    margin: ${isTabletNarrow ? '0.25rem 0 0.5rem 0' : '1rem 0 3rem 0'};
    max-width: ${isTabletNarrow ? '100%' : '25vw'};
    text-align: ${isTabletNarrow ? 'left' : 'center'};
  `}
  overflow: hidden;
`;
