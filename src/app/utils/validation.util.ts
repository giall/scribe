import { Validators } from "@angular/forms";

const lengths = {
  username: {
    min: 5, max: 25
  },
  password: {
    min: 8, max: 20
  }
}

function getLengthValidationError(field: string) {
  const requirements = lengths[field];
  return `Must be between ${requirements.min} and ${requirements.max} characters long`;
}

function getMinMaxValidators(field: string) {
  const requirements = lengths[field];
  return [
    Validators.minLength(requirements.min),
    Validators.maxLength(requirements.max)
  ];
}

export {
  getLengthValidationError, getMinMaxValidators
}