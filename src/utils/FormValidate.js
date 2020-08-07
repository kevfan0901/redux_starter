export const validatelenght = (value) => {
  if (value && value.length > 30) return 'You have exceeded the word limit';
  return '';
};

export const validateEmpty = (value) => {
  if (!value || value.trim().length === 0) return 'Required';
  return validatelenght(value);
};

export const validateSelectEmpty = (value) => {
  if (!value) return 'Required';
};
