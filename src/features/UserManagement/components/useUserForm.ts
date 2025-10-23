import { useState } from 'react';

export type UserFormData = {
  role: string;
  username: string;
  password: string;
  passwordAgain: string;
  email: string;
  displayName: string;
  birthYear: string;
  gender: string;
  area: string;
  story: string;
  languages: string[];
  skills: string[];
};

export const useUserForm = (initial?: Partial<UserFormData>) => {
  const [formData, setFormData] = useState<UserFormData>({
    role: '',
    username: '',
    password: '',
    passwordAgain: '',
    email: '',
    displayName: '',
    birthYear: '',
    gender: '',
    area: '',
    story: '',
    languages: [],
    skills: [],
    ...initial,
  });

  const updateField = <K extends keyof UserFormData>(
    key: K,
    value: UserFormData[K],
  ) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const reset = () =>
    setFormData({
      role: '',
      username: '',
      password: '',
      passwordAgain: '',
      email: '',
      displayName: '',
      birthYear: '',
      gender: '',
      area: '',
      story: '',
      languages: [],
      skills: [],
    });

  return { formData, updateField, reset };
};
