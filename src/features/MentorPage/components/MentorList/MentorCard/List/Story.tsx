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
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  display: -webkit-box;
  height: 6rem;
  margin: 0;
  overflow: hidden;
  position: relative;
  text-overflow: ellipsis;
  white-space: break-spaces;
  width: 100%;
`;

export default Story;
