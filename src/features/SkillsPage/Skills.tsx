import styled from 'styled-components';
import { Skill } from './models';
import { Chip } from '@/components/Chip';
import CloseIcon from '@/static/icons/close-with-background.svg';
import { palette } from '@/components/constants';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { useDeleteSkillMutation } from './skillsApi';
import { useTranslation } from 'react-i18next';

type Props = {
  skills: Array<Skill>;
};

const Skills: React.FC<Props> = ({ skills }: Props) => {
  const { t } = useTranslation('skills');
  const [deleteSkill] = useDeleteSkillMutation();
  const confirmDelete = useConfirmDelete();
  return (
    <Container>
      {Object.values(skills).map(skill => (
        <Chip
          key={skill.id}
          text={skill.name}
          isSelected={false}
          onToggle={() => {
            void confirmDelete({
              id: skill.id,
              onDelete: deleteSkill,
              title: t('notification.delete.title'),
              description: t('notification.delete.description'),
              confirmId: 'confirm-delete',
              borderColor: palette.redSalmon,
              closeText: t('notification.delete.cancel'),
              confirmText: t('notification.delete.confirm'),
            });
          }}
        >
          <Close />
        </Chip>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding: 0 2rem 6rem 2rem;
`;

const Close = styled.span`
  background-color: transparent;
  background-image: url(${CloseIcon});
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  height: 24px;
  width: 24px;
`;

export default Skills;
