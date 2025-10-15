import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store';
import { selectAllSkillOptions } from '@/features/MentorPage/selectors';
import { useGetMentorsQuery } from '@/features/MentorPage/mentorPageApi';
import { MultiSelectWithChips } from '@/components/Chip';

type Props = {
  updateSkills: (skills: string[]) => void;
  skills: string[];
};

const SkillsEditor = ({ updateSkills, skills }: Props) => {
  const { t } = useTranslation('users');
  const { isLoading } = useGetMentorsQuery();
  const allSkills = useAppSelector(selectAllSkillOptions());

  return (
    <MultiSelectWithChips
      label={t('newUser.publicInfo.skills')}
      selected={skills}
      options={allSkills}
      placeholder={t('newUser.publicInfo.skills')}
      isDisabled={isLoading}
      onChange={updateSkills}
    />
  );
};

export default SkillsEditor;
