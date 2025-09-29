import { useComponentVisible } from '@/hooks/useComponentShow';
import { useTranslation } from 'react-i18next';

import { LangItem } from './LangItem';
import { Anchor, Menu } from '../InfoDropdown/index';
import { DropdownButton } from '../InfoDropdown/DropdownButton';

export type LangCode = 'en' | 'fi';

const LangDropdown = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLDivElement>(false);
  const { t, i18n } = useTranslation('common');

  const isSelected = (langCode: LangCode): boolean =>
    i18n.language === langCode;

  const changeLanguage = (langCode: LangCode): void => {
    void i18n.changeLanguage(langCode);
    setIsComponentVisible(false);
  };

  return (
    <Anchor ref={ref}>
      <DropdownButton
        id="lang-dropdown-button"
        isComponentVisible={isComponentVisible}
        setIsComponentVisible={setIsComponentVisible}
        text={
          i18n.language === 'en'
            ? t(`navigation.language.en.short`)
            : t(`navigation.language.fi.short`)
        }
      />

      {isComponentVisible && (
        <Menu>
          <LangItem
            changeLang={() => changeLanguage('en')}
            isSelected={isSelected('en')}
            text={t(`navigation.language.en.long`)}
          />
          <LangItem
            changeLang={() => changeLanguage('fi')}
            isSelected={isSelected('fi')}
            text={t(`navigation.language.fi.long`)}
          />
        </Menu>
      )}
    </Anchor>
  );
};

export default LangDropdown;
