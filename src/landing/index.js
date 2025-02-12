(async function (_window, document) {
  const links = await fetch('../static/links.json').then(response =>
    response.json(),
  );
  const mentors = await fetch('/api/mentors').then(response => response.json());

  const mentorsAmount = mentors.resources.length;
  const yearsOfService = new Date().getFullYear() - 2018;

  const getInfoLocalizations = (mentorAmount, yearsOfService) => ({
    en: {
      infoRing1: `${mentorAmount} active mentors`,
      infoRing2: `${yearsOfService} years of conversations`,
    },
    fi: {
      infoRing1: `${mentorAmount} aktiivista mentoria`,
      infoRing2: `keskusteluja jo ${yearsOfService} vuotta`,
    },
  });

  const infoLocalizations = getInfoLocalizations(mentorsAmount, yearsOfService);

  for (const key of ['infoRing1', 'infoRing2']) {
    const element = document.querySelector(
      `[dynamic-localization-key="${key}"]`,
    );
    let translation = infoLocalizations['fi'][key];
    element.innerText = translation;
  }

  const footerLink = document.getElementById('footer-link');
  footerLink.href = links.sosLapsikylaUrl;
})(window, document);
