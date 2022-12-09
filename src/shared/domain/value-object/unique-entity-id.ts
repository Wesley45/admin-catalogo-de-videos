import { randomUUID } from "crypto";
import { validate } from "uuid";
import ValueObject from "./value-object";

import { InvalidUuidError } from "../../errors/InvalidUuid.error";

export class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || randomUUID());
    this.validate();
  }

  private validate() {
    const isValid = validate(this._value);

    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
