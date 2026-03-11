import { useTranslation } from 'react-i18next';

import Text from '@/components/Text';
import Widget from '@/components/Widget';

const Announcements = () => {
  const { t } = useTranslation('home');

  return (
    <Widget title={t('announcements.title')}>
      <Text variant="blueBox">{t('announcements.notice1')}</Text>
    </Widget>
  );
};

export default Announcements;
