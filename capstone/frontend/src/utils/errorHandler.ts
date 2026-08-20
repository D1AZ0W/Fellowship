import axios from 'axios';

export const getErrorMessage = (error: unknown, defaultMessage = 'Something went wrong'): string => {
  if (axios.isAxiosError(error) && error.response?.data?.errors) {
    const errors = error.response.data.errors;

    if (typeof errors.detail === 'string') {
      return errors.detail;
    }

    if (Array.isArray(errors.non_field_errors) && errors.non_field_errors.length > 0) {
      return errors.non_field_errors[0];
    }

    if (Array.isArray(errors) && errors.length > 0 && typeof errors[0] === 'string') {
      return errors[0];
    }

    for (const key in errors) {
      if (Array.isArray(errors[key]) && typeof errors[key][0] === 'string') {
        return errors[key][0];
      }
    }
  }

  return defaultMessage;
};
