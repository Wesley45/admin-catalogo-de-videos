import { validate } from "uuid";

import { InvalidUuidError } from "../../../errors/InvalidUuid.error";
import { UniqueEntityId } from "../unique-entity-id";

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniqueEntityId Unit Tests", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const validateSpy = spyValidateMethod();
    const uuid = "d52117ab-ba48-4a81-8bc1-6f39fdda7b5a";
    const uniqueEntityId = new UniqueEntityId(uuid);

    expect(validate(uniqueEntityId.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
    expect(uniqueEntityId.id).toBe(uuid);
  });
});
