import type { ApiMentor } from '@/features/MentorPage/models';

import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Column } from '@/components/common';
import LabeledInput from '@/components/LabeledInput';
import Slider from '@/components/Slider';
import Text from '@/components/Text';

type Props = {
  birthYearError: string | null;
  displayNameError: string | null;
  isMobile: boolean;
  mentor: ApiMentor;
  regionError: string | null;
  statusMessageError: string | null;
  updateMentor: <K extends keyof ApiMentor>(
    key: K,
    value: ApiMentor[K],
  ) => void;
};

const Columns = ({
  birthYearError,
  displayNameError,
  isMobile,
  mentor,
  regionError,
  statusMessageError,
  updateMentor,
}: Props) => {
  const { t } = useTranslation('profile');

  return (
    <Container $isMobile={isMobile}>
      <Column>
        <LabeledInput
          error={displayNameError}
          label={t('public.mentor.displayName.label')}
          onChange={value => updateMentor('display_name', value)}
          value={mentor.display_name}
        />
        <LabeledInput
          error={birthYearError}
          label={t('public.mentor.birthYear.label')}
          onChange={value => updateMentor('birth_year', Number(value))}
          value={String(mentor.birth_year)}
          type="number"
        />
        <LabeledInput
          error={regionError}
          label={t('public.mentor.region.label')}
          onChange={value => updateMentor('region', value)}
          value={mentor.region}
        />
      </Column>
      <Column>
        <LabeledInput
          error={statusMessageError}
          label={t('public.mentor.statusMessage.label')}
          onChange={value => updateMentor('status_message', value)}
          value={mentor.status_message}
        />
        <Slider
          id="is-vacationing-slider"
          label={t('public.mentor.vacation.title')}
          onChange={() =>
            updateMentor('is_vacationing', !mentor.is_vacationing)
          }
          text={t(
            `public.mentor.vacation.switch.${
              mentor.is_vacationing ? 'on' : 'off'
            }`,
          )}
          value={mentor.is_vacationing}
        />
        <Text variant="blueBox">{t('public.mentor.vacation.info')}</Text>
      </Column>
    </Container>
  );
};

const Container = styled.div<{ $isMobile: boolean }>`
  display: flex;
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          flex-direction: column;
        `
      : css`
          gap: 3rem;
        `}
`;

export default Columns;
