import { expect } from "expect";

import { FieldsErrors } from "../../validators/validator-fields-interface";
import { ClassValidatorFields } from "../../validators/class-validator-fields";
import { EntityValidationError } from "../../errors/ValidationError";

type Expected =
  | { validator: ClassValidatorFields<any>; data: any }
  | (() => any);

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === "function") {
      try {
        expected();
        success();
      } catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrosMessages(error.error, received);
      }
    } else {
      const { validator, data } = expected;
      const isValid = validator.validate(data);

      if (isValid) {
        return success();
      }

      return assertContainsErrosMessages(validator.errors, received);
    }
  },
});

function success() {
  return { pass: true, message: () => "" };
}

function assertContainsErrosMessages(
  expected: FieldsErrors,
  received: FieldsErrors
) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

  return isMatch
    ? { pass: true, message: () => "" }
    : {
        pass: false,
        message: () =>
          `The validation errors not contains ${JSON.stringify(
            received
          )}. Current: ${JSON.stringify(expected)}`,
      };
}
