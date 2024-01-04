import { email, helpers, maxLength, minLength, required, sameAs } from '@vuelidate/validators';

const passwordRegex = helpers.regex();
const password = (value: string) =>
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(value);

const validations = {
  required: (label: string) => helpers.withMessage(() => `${label} is required`, required),
  email: () => helpers.withMessage(() => `Must be a valid email address`, email),
  minLength: (label: string, min: number) =>
    helpers.withMessage(({ $params }) => `${label} should be at least ${$params.min} characters long`, minLength(min)),
  maxLength: (label: string, min: number) =>
    helpers.withMessage(
      ({ $params }) => `${label} must be no more than ${$params.max} characters long`,
      maxLength(min)
    ),
  password: () =>
    helpers.withMessage(
      () => `The Password must contain at least one uppercase and lowercase letter, digit, and special character`,
      password
    ),
  sameAs: (label: string, sameAsLabel: string, value: string | number) => {
    const sameAsPassword = () => sameAs(value);
    return helpers.withMessage(`${label} must be equal to ${sameAsLabel}`, sameAsPassword());
  },
};

export function useValidation() {
  return {
    validations,
  };
}
