import { MentorCard } from '.';
import { renderWithProviders } from '@/test/testStore';

const mentors = [
  {
    age: 21,
    buddyId: 'asdf908asdf',
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

const onDismiss = jest.fn();

describe('<MentorListItem />', () => {
  it('Mentor List Item with mentor data is rendered correctly', () => {
    const { queryAllByTestId } = renderWithProviders(
      <MentorCard onDismiss={onDismiss} mentor={mentors[0]} />,
    );
    expect(queryAllByTestId('mentor-cards-container')).toBeTruthy();
  });

  it('Mentor List Item name in header is rendered correctly', () => {
    const { queryAllByText } = renderWithProviders(
      <MentorCard onDismiss={onDismiss} mentor={mentors[0]} />,
    );
    expect(queryAllByText('Matti Meikäläinen')).toBeTruthy();
  });

  it('New mentor is rendered correctly', () => {
    const { queryAllByText } = renderWithProviders(
      <MentorCard onDismiss={onDismiss} mentor={mentors[0]} />,
    );
    expect(queryAllByText('card.new')).toBeTruthy();
  });

  it('Offline mentor is rendered correctly', () => {
    const { queryAllByText } = renderWithProviders(
      <MentorCard onDismiss={onDismiss} mentor={mentors[0]} />,
    );
    expect(queryAllByText('card.unavailable').length).toBe(1);
  });

  it('Online mentor is rendered correctly', () => {
    const { queryAllByText } = renderWithProviders(
      <MentorCard onDismiss={onDismiss} mentor={mentors[1]} />,
    );
    expect(queryAllByText('card.unavailable').length).toBe(0);
  });
});
