import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { Text } from '@/components/Text/Text';
import { palette } from '@/components/constants';

export type RoleStatus =
  | 'admin'
  | 'mentor'
  | 'mentee'
  | 'vacationingMentor'
  | 'default';

type Props = {
  role: RoleStatus;
};

const RoleTag: React.FC<Props> = ({ role }) => {
  const { t } = useTranslation('users');

  const roleMap = {
    mentor: { text: t('role.mentor'), tagColor: palette.purpleHover },
    mentee: { text: t('role.mentee'), tagColor: palette.blueLight },
    admin: { text: t('role.admin'), tagColor: palette.orangeLight },
    vacationingMentor: { text: t('role.mentor'), tagColor: palette.blueWhite },
    default: { text: '', tagColor: palette.purple },
  };

  const roleTagText = roleMap[role].text;
  const roleTagColor = roleMap[role].tagColor;

  return <Tag roleTagColor={roleTagColor}>{roleTagText}</Tag>;
};

const Tag = styled(Text)<{ roleTagColor: string }>`
  background-color: ${props => props.roleTagColor};
  border-radius: 0.25rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
  display: flex};
  margin: 0;
  padding: 0.25rem 1rem;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(-1rem, -50%);
`;

export default RoleTag;
