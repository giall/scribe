import { Validators } from '@angular/forms';

export enum Field {
  Username,
  Password
}

const lengths = {
  [Field.Username]: {
    min: 5, max: 30
  },
  [Field.Password]: {
    min: 8, max: 30
  }
};

function getLengthValidationError(field: Field) {
  const requirements = lengths[field];
  return `Must be between ${requirements.min} and ${requirements.max} characters long`;
}

function getMinMaxValidators(field: Field) {
  const requirements = lengths[field];
  return [
    Validators.minLength(requirements.min),
    Validators.maxLength(requirements.max)
  ];
}

export {
  getLengthValidationError, getMinMaxValidators
};
