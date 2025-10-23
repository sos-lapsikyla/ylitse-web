import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Chip } from '@/components/Chip';
import { Column } from '@/components/common';
import DropdownSearch from '@/components/DropdownSearch/DropdownSearch';
import Text from '@/components/Text';
import { Languages } from '@/components/constants';

type Props = {
  updateLanguages: (languages: string[]) => void;
  languages: string[];
};

const LanguageEditor = ({
  updateLanguages: updateLanguages,
  languages: languages,
}: Props) => {
  const { t } = useTranslation('users');

  const allLanguages = Languages.map(lang => lang.name);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const addLanguage = (language: string) => {
    setIsDropdownVisible(false);
    updateLanguages([...languages, language]);
  };

  const removeLanguage = (language: string) => {
    setIsDropdownVisible(false);
    updateLanguages(languages.filter(l => l !== language));
  };

  const languageOptions = allLanguages.filter(
    language => !languages.includes(language),
  );

  return (
    <Column>
      <LabelText variant="label">{t('newUser.publicInfo.languages')}</LabelText>
      {languages.length > 0 && (
        <Skills>
          {languages.map(language => (
            <Chip key={language} text={language} onToggle={removeLanguage} />
          ))}
        </Skills>
      )}
      <DropdownSearch
        isDropdownVisible={isDropdownVisible}
        options={languageOptions}
        placeholder={t('newUser.publicInfo.newLanguage')}
        selectOption={addLanguage}
        setIsDropdownVisible={setIsDropdownVisible}
      />
    </Column>
  );
};

const LabelText = styled(Text)`
  margin: 0 0 -0.6rem 0;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

export default LanguageEditor;
