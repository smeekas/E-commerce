export const validation = {
  Required: 'This field is required',
  MinChar: (n: number) => `Must be at least ${n} characters`,
  MaxChar: (n: number) => `Must be at most ${n} characters`,
  InvalidEmail: 'Please enter a valid email address',
  InvalidPhone: 'Please enter a valid phone number',
};

export default validation;
