import { useState } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { OUTER_VERTICAL_MARGIN, palette } from '@/components/constants';
import PageWithTransition from '@/components/PageWithTransition';
import Text from '@/components/Text';
import Spinner from '@/components/Spinner';
import Skills from './Skills';
import { useGetSkillsQuery } from './skillsApi';
import { selectAllSkills } from './selectors';
import { useAppSelector } from '@/store';
import { TextButton } from '@/components/Buttons';
import NewSkill from './NewSkill';

const SkillsPage = () => {
  const { t } = useTranslation('skills');
  const { isMobile } = useGetLayoutMode();
  const { isLoading: isSkillsQueryLoading } = useGetSkillsQuery();
  const isLoading = isSkillsQueryLoading;
  const [isNewSkillOpen, setIsNewSkillOpen] = useState(false);

  const allSkills = useAppSelector(selectAllSkills());

  const PageContent = isLoading ? (
    <Spinner variant="large" />
  ) : (
    <>
      <PageHeader $isMobile={isMobile}>
        <TitleWrapper $isMobile={isMobile}>
          <Text variant="h1">{t('title')}</Text>
        </TitleWrapper>
      </PageHeader>
      <PageContainer>
        <TopContainer $isMobile={isMobile}>
          <DescriptionWrapper>
            <Text variant="p">{t('description')}</Text>
          </DescriptionWrapper>
          <ButtonContainer $isMobile={isMobile}>
            {isNewSkillOpen && <NewSkill />}
            <TextButton
              leftIcon={!isNewSkillOpen ? 'add' : undefined}
              size="normal"
              onClick={() => setIsNewSkillOpen(!isNewSkillOpen)}
            >
              {isNewSkillOpen ? t('newSkill.close') : t('newSkill.title')}
            </TextButton>
          </ButtonContainer>
        </TopContainer>
        <Skills skills={allSkills}></Skills>
      </PageContainer>
    </>
  );

  return (
    <PageWithTransition>
      <Container $isMobile={isMobile}>{PageContent}</Container>
    </PageWithTransition>
  );
};

const Container = styled.div<{ $isMobile: boolean }>`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: ${OUTER_VERTICAL_MARGIN} auto;
  max-width: 95rem;
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          width: 100%;
        `
      : css`
          width: 90%;
        `}
`;

const PageHeader = styled.div<{ $isMobile: boolean }>`
  display: flex;
  margin-bottom: -1rem;
  max-width: 95rem;
  position: relative;
  width: 100%;

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          background-color: ${palette.white};
          flex-direction: column;
          gap: 2rem;
          margin-bottom: -3rem;
          margin-top: -3rem;
          padding: 2rem 6rem;
        `
      : css`
          align-items: center;
          background-color: ${palette.blue2};
          border-radius: 10px;
          height: 80px;
          justify-content: center;
          max-height: 80px;
        `}
`;
const TitleWrapper = styled.div<{ $isMobile: boolean }>`
  ${({ $isMobile }) =>
    !$isMobile
      ? css`
          left: 50%;
          position: absolute;
          transform: translateX(-50%);
        `
      : css`
          padding-left: 2rem;
        `};
`;

const PageContainer = styled.div`
  background-color: white;
  border-radius: 0 0 10px 10px;
  padding-top: 1rem;
  width: 100%;
`;

const TopContainer = styled.div<{ $isMobile: boolean }>`
  align-items: center;
  display: flex;
  gap: 2rem;
  padding: 2rem 4rem;

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          flex-direction: column;
          padding: -6rem 0;
        `
      : css`
          flex-direction: row;
          justify-content: space-between;
        `}
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ButtonContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          width: auto;
        `
      : css`
          width: 30%;
        `}
`;

export default SkillsPage;
