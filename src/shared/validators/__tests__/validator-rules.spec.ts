import { ValidatorRules } from "../validator-rules";

type Values = {
  value: any;
  property: string;
};

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: string;
  params?: any[];
};

function assertIsInvalid(expected: ExpectedRule) {
  expect(() => {
    expect(() => {
      runRule(expected);
    }).not.toThrow(expected.error);
  }).toThrow(expected.error);
}

function assertIsValid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).not.toThrow(expected.error);
}

function runRule({
  value,
  property,
  rule,
  params = [],
}: Omit<ExpectedRule, "error">) {
  const validator = ValidatorRules.values(value, property);
  const method = validator[rule];
  method.apply(validator, params);
}

describe("ValidatorRules Unit Tests", () => {
  it("values method", () => {
    const validator = ValidatorRules.values("some value", "field");
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field");
  });

  it("required validation rule", () => {
    let arrange: Values[] = [
      {
        value: null,
        property: "field",
      },
      {
        value: undefined,
        property: "field",
      },
      {
        value: "",
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "required",
        error: "The field property is required",
      });
    });

    arrange = [
      {
        value: "test",
        property: "field",
      },
      {
        value: 5,
        property: "field",
      },
      {
        value: 0,
        property: "field",
      },
      {
        value: false,
        property: "field",
      },
    ] as any;

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "required",
        error: "The field property is required",
      });
    });
  });

  it("string validation rule", () => {
    let arrange: Values[] = [
      { value: 5, property: "field" },
      { value: {}, property: "field" },
      { value: false, property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "string",
        error: "The field must be a string",
      });
    });

    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "test", property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "string",
        error: "The field must be a string",
      });
    });
  });

  it("maxLength validation rule", () => {
    let arrange: Values[] = [{ value: "aaaaa", property: "field" }];

    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error: "The field must be less or equal than 4 characters",
        params: [4],
      });
    });

    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "aaaaa", property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error: "The field must be less or equal than 5 characters",
        params: [5],
      });
    });
  });

  it("boolean validation rule", () => {
    let arrange: Values[] = [
      { value: 5, property: "field" },
      { value: "true", property: "field" },
      { value: "false", property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error: "The field must be a boolean",
      });
    });

    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: true, property: "field" },
      { value: false, property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error: "The field must be a boolean",
      });
    });
  });

  it("should throw a validation error when combine two or more validation rules", () => {
    let validation = ValidatorRules.values(null, "field");
    expect(() => {
      validation.required().string().maxLength(5);
    }).toThrow("The field property is required");

    validation = ValidatorRules.values(5, "field");
    expect(() => {
      validation.required().string().maxLength(5);
    }).toThrow("The field must be a string");

    validation = ValidatorRules.values("aaaaaa", "field");
    expect(() => {
      validation.required().string().maxLength(5);
    }).toThrow("The field must be less or equal than 5 characters");

    validation = ValidatorRules.values(null, "field");
    expect(() => {
      validation.required().boolean();
    }).toThrow("The field property is required");

    validation = ValidatorRules.values(5, "field");
    expect(() => {
      validation.required().boolean();
    }).toThrow("The field must be a boolean");
  });

  it("should valid when combine two or more validation rules", () => {
    expect.assertions(0);
    ValidatorRules.values("test", "field").required().string();
    ValidatorRules.values("aaaaa", "field").required().string().maxLength(5);

    ValidatorRules.values(true, "field").required().boolean();
    ValidatorRules.values(false, "field").required().boolean();
  });
});
