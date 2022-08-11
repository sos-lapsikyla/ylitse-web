import styled from 'styled-components';
import MentorSearch from './MentorSearch';
import * as cssVariables from '../../../components/variables';

/**
 * Div under the "Mentorit" -header where info about mentorsearch
 * is shown, also contains searchBar in separate MentorSearch component
 */

const MentorInfoSearchDiv = () => {
  return (
    <MentorSearchContainer>
      <MentorInfoText>
        Tervetuloa selaamaan mentoreiden profiileja! Löydät uusimmat mentorit
        listassa ensimmäisenä. Hakutoimintoa käyttämällä voit rajata mentoreita
        ongelmasi perusteella
      </MentorInfoText>
      <MentorSearch />
    </MentorSearchContainer>
  );
};

const MentorInfoText = styled.div`
  flex: 0 0 auto;
  color: ${cssVariables.palette.darkblue};
  ${cssVariables.basicSourceSansText};
  font-weight: 400;
  font-size: 1.25rem;
  width: 47%;
  padding-right: 5%;
`;

const MentorSearchContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 2rem 0;
  width: 90%;
  max-width: 90%;
  margin: auto;
`;

export default MentorInfoSearchDiv;