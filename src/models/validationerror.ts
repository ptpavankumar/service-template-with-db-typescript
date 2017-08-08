const message = 'Object does not match input schema';

export class ValidationError extends Error {
  errors: any
  constructor(errors) {
    super(message);
    this.errors = errors;
  }
};
