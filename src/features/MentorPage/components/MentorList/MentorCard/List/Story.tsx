import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { Text } from '@/components/Text/Text';

export const Story = ({ story }: { story: string }) => {
  const { t } = useTranslation('mentors');
  return (
    <div>
      <Text variant="h3">{t('card.bio')}</Text>
      <TruncatedMultiline>{story}</TruncatedMultiline>
    </div>
  );
};

const TruncatedMultiline = styled(Text)`
  position: relative;
  display: -webkit-box;
  width: 100%;
  height: 6rem;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  white-space: break-spaces;
  -webkit-box-orient: vertical;
`;

export default Story;
