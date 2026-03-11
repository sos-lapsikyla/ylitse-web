import { Trans, useTranslation } from 'react-i18next';
import links from '@/static/links.json';
import Text from '@/components/Text';
import Widget from '@/components/Widget';

const MentorFeedback = () => {
  const { t } = useTranslation('home');
  return (
    <Widget title={t('feedback.mentor.title')} variant="centered">
      <Text>{t('feedback.mentor.description')}</Text>
      <Trans
        t={t}
        i18nKey="feedback.mentor.link"
        components={{
          a: (
            <Text
              color="purple"
              variant="link"
              url={links.ylitseMentorFeedbackUrl}
              isExternalUrl
            />
          ),
        }}
      ></Trans>
      <Text>{t('feedback.mentor.description2')}</Text>
    </Widget>
  );
};

export default MentorFeedback;
