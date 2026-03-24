import { useCallback, useState } from 'react';

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

const DEFAULT_ROLE = 'mentor';

const getDefaultFormData = (): UserFormData => ({
  role: DEFAULT_ROLE,
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

export const useUserForm = (initial?: Partial<UserFormData>) => {
  const [formData, setFormData] = useState<UserFormData>({
    ...getDefaultFormData(),
    ...initial,
  });

  const updateField = useCallback(
    <K extends keyof UserFormData>(key: K, value: UserFormData[K]) => {
      setFormData(prev => ({ ...prev, [key]: value }));
    },
    [],
  );

  const reset = useCallback(() => {
    setFormData(getDefaultFormData());
  }, []);

  return { formData, updateField, reset };
};
