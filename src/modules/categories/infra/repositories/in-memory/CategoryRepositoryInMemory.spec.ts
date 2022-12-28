import { Category } from "../../../domain/entities/category";
import { CategoryRepositoryInMemory } from "./CategoryRepositoryInMemory";

describe("Category Repository In Memory Unit Tests", () => {
  let repository: CategoryRepositoryInMemory;
  beforeEach(() => {
    repository = new CategoryRepositoryInMemory();
  });

  it("should not be able to filter items when filter param is null", async () => {
    const items = [new Category({ name: "test" })];
    const spyFilterMethod = jest.spyOn(items, "filter");

    const itemsFiltered = await repository["applyFilter"](items, null);
    expect(spyFilterMethod).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(itemsFiltered);
  });

  it("should be able to filter using a filter param", async () => {
    const items = [
      new Category({ name: "test" }),
      new Category({ name: "TEST" }),
      new Category({ name: "fake" }),
    ];
    const spyFilterMethod = jest.spyOn(items, "filter");

    let itemsFiltered = await repository["applyFilter"](items, "TEST");
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);

    itemsFiltered = await repository["applyFilter"](items, "no-filter");
    expect(itemsFiltered).toHaveLength(0);
    expect(spyFilterMethod).toHaveBeenCalledTimes(2);
  });

  it("should be able to sort by createdAt when sort param is null", async () => {
    const createdAt = new Date();
    const items = [
      new Category({ name: "test", createdAt }),
      new Category({
        name: "TEST",
        createdAt: new Date(createdAt.getTime() + 100),
      }),
      new Category({
        name: "fake",
        createdAt: new Date(createdAt.getTime() + 200),
      }),
    ];

    let itemsSorted = await repository["applySort"](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it("should be able to sort by name", async () => {
    const items = [
      new Category({ name: "c" }),
      new Category({ name: "b" }),
      new Category({ name: "a" }),
    ];

    let itemsSorted = await repository["applySort"](items, "name", "asc");
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);

    itemsSorted = await repository["applySort"](items, "name", "desc");
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });
});
