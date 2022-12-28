import {
  CategoryRules,
  CategoryValidator,
  CategoryValidatorFactory,
} from "./category.validator";

describe("CategoryValidator Integration Tests", () => {
  let validator: CategoryValidator;

  beforeEach(() => {
    validator = CategoryValidatorFactory.create();
  });

  it("invalidation cases for name field", () => {
    //let isValid = validator.validate(null);

    expect({ validator, data: null }).containsErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    expect({ validator, data: { name: "" } }).containsErrorMessages({
      name: ["name should not be empty"],
    });

    expect({ validator, data: { name: 5 as any } }).containsErrorMessages({
      name: [
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    expect({
      validator,
      data: { name: "t".repeat(256) },
    }).containsErrorMessages({
      name: ["name must be shorter than or equal to 255 characters"],
    });

    /*  expect(isValid).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name should not be empty",
      "name must be a string",
      "name must be shorter than or equal to 255 characters",
    ]);

    isValid = validator.validate({ name: "" });
    expect(isValid).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name should not be empty",
    ]);

    isValid = validator.validate({ name: 5 as any });
    expect(isValid).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name must be a string",
      "name must be shorter than or equal to 255 characters",
    ]);

    isValid = validator.validate({ name: "t".repeat(256) });
    expect(isValid).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name must be shorter than or equal to 255 characters",
    ]); */
  });

  it("invalidation cases for description field", () => {
    expect({ validator, data: { description: 5 } }).containsErrorMessages({
      description: ["description must be a string"],
    });
  });

  it("invalidation cases for isActive field", () => {
    expect({ validator, data: { isActive: 5 } }).containsErrorMessages({
      isActive: ["isActive must be a boolean value"],
    });

    expect({ validator, data: { isActive: 0 } }).containsErrorMessages({
      isActive: ["isActive must be a boolean value"],
    });

    expect({ validator, data: { isActive: 1 } }).containsErrorMessages({
      isActive: ["isActive must be a boolean value"],
    });
  });

  it("valid cases for fields", () => {
    let isValid = validator.validate({ name: "some value" });
    expect(isValid).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(
      new CategoryRules({ name: "some value" })
    );

    isValid = validator.validate({
      name: "some value",
      description: undefined,
    });
    expect(isValid).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(
      new CategoryRules({ name: "some value", description: undefined })
    );

    isValid = validator.validate({ name: "some value", description: null });
    expect(isValid).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(
      new CategoryRules({ name: "some value", description: null })
    );

    isValid = validator.validate({ name: "some value", isActive: true });
    expect(isValid).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(
      new CategoryRules({ name: "some value", isActive: true })
    );

    isValid = validator.validate({ name: "some value", isActive: false });
    expect(isValid).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(
      new CategoryRules({ name: "some value", isActive: false })
    );
  });
});
