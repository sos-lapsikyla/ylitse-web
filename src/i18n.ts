import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import chatEn from '@/static/locales/en/chat.json';
import chatFi from '@/static/locales/fi/chat.json';
import commonEn from '@/static/locales/en/common.json';
import commonFi from '@/static/locales/fi/common.json';
import homeEn from '@/static/locales/en/home.json';
import homeFi from '@/static/locales/fi/home.json';
import mentorsEn from '@/static/locales/en/mentors.json';
import mentorsFi from '@/static/locales/fi/mentors.json';
import profileEn from '@/static/locales/en/profile.json';
import profileFi from '@/static/locales/fi/profile.json';
import skillsFi from '@/static/locales/fi/skills.json';
import skillsEn from '@/static/locales/en/skills.json';
import usersFi from '@/static/locales/fi/users.json';
import usersEn from '@/static/locales/en/users.json';

export const defaultNS = 'common';

export const resources = {
  en: {
    chat: chatEn,
    common: commonEn,
    home: homeEn,
    mentors: mentorsEn,
    profile: profileEn,
    skills: skillsEn,
    users: usersEn,
  },
  fi: {
    chat: chatFi,
    common: commonFi,
    home: homeFi,
    mentors: mentorsFi,
    profile: profileFi,
    skills: skillsFi,
    users: usersFi,
  },
} as const;

export const i18nInit = i18n.use(initReactI18next).init({
  debug: true,
  defaultNS,
  fallbackLng: 'fi',
  interpolation: {
    escapeValue: false,
  },
  ns: ['chat', 'common', 'home', 'mentors', 'profile', 'skills', 'users'],
  resources,
});

export default i18n;
