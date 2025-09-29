import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import links from '@/static/links.json';

import { FOOTER_HEIGHT, palette } from '../constants';
import FooterLogo from '@/static/img/footer-logo.svg';
import Text from '../Text';
import Link from '../Link';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <Link url={links.sosLapsikylaUrl}>
        <FooterText variant="footer">{t('footer')}</FooterText>
        <FooterImage src={FooterLogo} />
      </Link>
    </Container>
  );
};

const Container = styled.footer`
  align-items: center;
  background-color: ${palette.blue};
  display: inline-flex;
  height: ${FOOTER_HEIGHT};
  justify-content: center;
  width: 100%;
`;

const FooterText = styled(Text)`
  margin-right: 1rem;
`;

const FooterImage = styled.img`
  margin-left: 1rem;
  transform: translateX(0.5px);
  width: 7.25rem;
`;

export default Footer;
