import { renderWithProviders } from '@/test/testStore';
import MentorList from '.';
import { type Mentor } from '../../models';

const mentorListCards: Array<Mentor> = [
  {
    age: 21,
    buddyId: 'asdf908asdf',
    created: new Date('2024-01-01').getTime(),
    communicationChannels: [],
    gender: 'muusu',
    isVacationing: true,
    languages: ['Suomi', 'Englanti'],
    mentorId: 'asdf908asdf',
    name: 'Matti Meikäläinen',
    region: 'Pirkanmaa',
    skills: [
      'Lastensuojelu',
      'Itsenäistyminen',
      'Vanhemmuus',
      'Opiskelu',
      'Kela-asiointi',
      'Raskausaika',
      'Päihdeongelmat',
    ],
    statusMessage: 'Voit ottaa yhteyttä!',
    story:
      'Olen nuorisokodista itsenäistynyt teini-ikäisen pojan äiti. Voin olla sinulle tukena opintoihin, itsenäistymiseen, jälkihuoltoon ja vanhem- muuteen liittyvissä asioissa. Minulta voi kysyä näihin asioihin liittyen tai mistä tahansa muusta mieltä painavasta asiasta. Toivon, että otat rohkeasti yhteyttä. Yhdessä varmasti keksimme keinoja, millä ongelmaasi voisi löytää ratkaisun. Tulehan sanomaan moikka!',
  },
  {
    age: 21,
    buddyId: 'asdfasdertsdf',
    created: new Date('2024-01-03').getTime(),
    communicationChannels: [],
    gender: 'muusu',
    isVacationing: false,
    languages: ['Suomi', 'Englanti'],
    mentorId: 'asdfasdertsdf',
    name: 'Matti Meikäläinen',
    region: 'Pirkanmaa',
    skills: [
      'Lastensuojelu',
      'Itsenäistyminen',
      'Vanhemmuus',
      'Opiskelu',
      'Kela-asiointi',
      'Raskausaika',
      'Päihdeongelmat',
    ],
    statusMessage: 'Voit ottaa yhteyttä!',
    story:
      'Olen nuorisokodista itsenäistynyt teini-ikäisen pojan äiti. Voin olla sinulle tukena opintoihin, itsenäistymiseen, jälkihuoltoon ja vanhem- muuteen liittyvissä asioissa. Minulta voi kysyä näihin asioihin liittyen tai mistä tahansa muusta mieltä painavasta asiasta. Toivon, että otat rohkeasti yhteyttä. Yhdessä varmasti keksimme keinoja, millä ongelmaasi voisi löytää ratkaisun. Tulehan sanomaan moikka!',
  },
];

describe('<MentorListItem />', () => {
  const setVisibleMentor = jest.fn();
  it('Mentor List Item with mentor cards is rendered correctly', () => {
    const { queryAllByTestId } = renderWithProviders(
      <MentorList
        setVisibleCard={setVisibleMentor}
        mentors={mentorListCards}
      />,
    );
    expect(queryAllByTestId('mentor-cards-container')).toBeTruthy();
  });
  it('Mentor List Item name in header is rendered correctly', () => {
    const { queryAllByText } = renderWithProviders(
      <MentorList
        setVisibleCard={setVisibleMentor}
        mentors={mentorListCards}
      />,
    );
    expect(queryAllByText('Matti Meikäläinen')).toBeTruthy();
  });
  it('New mentor is rendered correctly', () => {
    const { queryAllByText } = renderWithProviders(
      <MentorList
        setVisibleCard={setVisibleMentor}
        mentors={mentorListCards}
      />,
    );
    expect(queryAllByText('card.new')).toBeTruthy();
  });
  it('Offline mentor is rendered correctly', () => {
    const { queryAllByText } = renderWithProviders(
      <MentorList
        setVisibleCard={setVisibleMentor}
        mentors={mentorListCards}
      />,
    );
    expect(queryAllByText('card.unavailable')).toBeTruthy();
  });
});
