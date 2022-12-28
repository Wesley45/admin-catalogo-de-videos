import { validateSync } from "class-validator";
import {
  FieldsErrors,
  ValidatorFieldsInterface,
} from "./validator-fields-interface";

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors = null;
  validatedData: PropsValidated = null;

  public validate(data: any): boolean {
    const errors = validateSync(data);
    if (errors.length > 0) {
      this.errors = {};
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }
    } else {
      this.validatedData = data;
    }
    return !errors.length;
  }
}
