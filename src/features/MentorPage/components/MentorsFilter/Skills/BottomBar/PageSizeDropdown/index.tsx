import { useComponentVisible } from '@/hooks/useComponentShow';
import { useTranslation } from 'react-i18next';

import { pageSizes } from './constants';

import { animations, palette } from '@/components/constants';
import styled from 'styled-components';
import Text from '@/components/Text';
import { OpenButton } from './OpenButton';
import { PageOption } from './PageOption';

type Props = {
  skillsInPage: number;
  setSkillsInPage: (nextSize: number) => void;
};
const PageSizeDropdown = ({ skillsInPage, setSkillsInPage }: Props) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLDivElement>(false);

  const { t } = useTranslation('mentors');

  const handlePageSizeChange = (next: number) => {
    setSkillsInPage(next);
    setIsComponentVisible(false);
  };

  return (
    <Container>
      <Text>{t('filters.pageSizeLabel')}</Text>
      <Anchor ref={ref}>
        <OpenButton
          isComponentVisible={isComponentVisible}
          onClick={setIsComponentVisible}
          selected={skillsInPage}
        />

        {isComponentVisible && (
          <Menu>
            {pageSizes.map(size => (
              <PageOption
                key={size}
                onClick={handlePageSizeChange}
                isSelected={size === skillsInPage}
                size={size}
              />
            ))}
          </Menu>
        )}
      </Anchor>
    </Container>
  );
};

const Anchor = styled.div`
  position: relative;
  display: inline-flex;
  align-items: stretch;
  overflow: visible;
`;

const Menu = styled.div`
  position: absolute;
  top: calc(100% - 2px);
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  min-width: calc(100% - 4px);
  background: ${palette.white};
  border: 2px solid ${palette.purple};
  border-radius: 0 0 8px 8px;
  transform-origin: top center;

  button:last-of-type {
    border-bottom: none;
    border-radius: 0 0 8px 8px;
  }

  ${animations.growDown}
`;

const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export default PageSizeDropdown;
