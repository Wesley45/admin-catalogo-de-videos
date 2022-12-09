import { omit } from "lodash";

import { UniqueEntityId } from "../../../../shared/domain/value-object/unique-entity-id";

import { Category } from "./category";

describe("Category Unit Tests", () => {
  it("constructor of category", () => {
    let category = new Category({ name: "Movie" });
    let props = omit(category.props, "createdAt");
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      isActive: true,
    });
    expect(category.createdAt).toBeInstanceOf(Date);

    let createdAt = new Date();
    category = new Category({
      name: "Movie",
      description: "Movie description",
      isActive: false,
      createdAt,
    });
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "Movie description",
      isActive: false,
      createdAt,
    });

    category = new Category({
      name: "Movie",
      description: "Other movie description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "Other movie description",
    });

    category = new Category({
      name: "Movie",
      isActive: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      isActive: true,
    });

    createdAt = new Date();
    category = new Category({
      name: "Movie",
      createdAt,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      createdAt,
    });
  });

  it("getter of name field", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  it("getter and setter of description field", () => {
    let category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
    expect(category.description).toBeNull();

    category = new Category({
      name: "Movie",
      description: "Movie description",
    });
    expect(category.name).toBe("Movie");
    expect(category.description).toBe("Movie description");

    category = new Category({
      name: "Movie",
    });
    category["description"] = "Other movie description";
    expect(category.name).toBe("Movie");
    expect(category.description).toBe("Other movie description");

    category["description"] = undefined;
    expect(category.description).toBeNull();

    category["description"] = null;
    expect(category.description).toBeNull();
  });

  it("getter and setter of isActive field", () => {
    let category = new Category({ name: "Movie" });
    expect(category.isActive).toBeTruthy();

    category = new Category({ name: "Movie", isActive: true });
    expect(category.isActive).toBeTruthy();

    category = new Category({ name: "Movie", isActive: false });
    expect(category.isActive).toBeFalsy();
  });

  it("getter and setter of createdAt field", () => {
    let category = new Category({ name: "Movie" });
    expect(category.createdAt).toBeInstanceOf(Date);

    let createdAt = new Date();
    category = new Category({ name: "Movie", createdAt });
    expect(category.createdAt).toBe(createdAt);
  });

  it("getter of id field", () => {
    const data = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      {
        props: { name: "Movie" },
        id: new UniqueEntityId("d52117ab-ba48-4a81-8bc1-6f39fdda7b5a"),
      },
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    });
  });

  it("should be able to update the category", () => {
    const createdAt = new Date();
    const category = new Category({
      name: "Movie",
      description: "Movie description",
      isActive: true,
      createdAt,
    });

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "Movie description",
      isActive: true,
      createdAt,
    });

    category.update("New Movie", "New Movie Description");

    expect(category.props).toStrictEqual({
      name: "New Movie",
      description: "New Movie Description",
      isActive: true,
      createdAt,
    });
  });

  it("should be able to update the category without description", () => {
    const createdAt = new Date();
    const category = new Category({
      name: "Movie",
      isActive: true,
      createdAt,
    });

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: null,
      isActive: true,
      createdAt,
    });

    category.update("New Movie");

    expect(category.props).toStrictEqual({
      name: "New Movie",
      description: null,
      isActive: true,
      createdAt,
    });
  });

  it("should be able to activate the category", () => {
    const category = new Category({ name: "Movie", isActive: false });
    expect(category.isActive).toBeFalsy();
    category.activate();
    expect(category.isActive).toBeTruthy();
  });

  it("should be able to deactivate the category", () => {
    const category = new Category({ name: "Movie", isActive: true });
    expect(category.isActive).toBeTruthy();
    category.deactivate();
    expect(category.isActive).toBeFalsy();
  });
});
