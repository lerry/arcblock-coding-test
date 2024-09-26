import { useState } from 'react';
import { z } from 'zod';

import { UserProfileProps } from './types';

export function useProfileForm(initialProfile: UserProfileProps) {
  const [formData, setFormData] = useState(initialProfile);
  const [errors, setErrors] = useState<z.ZodFormattedError<UserProfileProps>>({
    _errors: [],
  });

  const updateFormData = (key: keyof UserProfileProps, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const resetForm = () => {
    setErrors({ _errors: [] });
    setFormData(initialProfile);
  };

  return { formData, errors, updateFormData, setErrors, resetForm };
}
