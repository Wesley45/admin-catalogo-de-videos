import { SearchResult } from "../../../../../shared/domain/repository/repository.interface";
import { Category } from "../../../domain/entities/category";
import { CategoryRepositoryInMemory } from "../../../infra/repositories/in-memory/CategoryRepositoryInMemory";
import { CategoryOutputMapper } from "../../mappers/category.mapper";
import { ListCategoriesUseCase } from "../listCategories/ListCategoriesUseCase";

describe("ListCategoriesUseCase Unit Tests", () => {
  let useCase: ListCategoriesUseCase;
  let repository: CategoryRepositoryInMemory;

  beforeEach(() => {
    repository = new CategoryRepositoryInMemory();
    useCase = new ListCategoriesUseCase(repository);
  });

  it("should be able to list categories", async () => {
    let params = new SearchResult({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortOrder: null,
      filter: null,
    });

    let output = useCase["toOutput"](params);
    expect(output).toStrictEqual({
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
      items: [],
    });

    const categories = [new Category({ name: "Movie" })];
    repository.items = categories;

    params = new SearchResult({
      items: categories,
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortOrder: null,
      filter: null,
    });

    output = useCase["toOutput"](params);
    expect(output).toStrictEqual({
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
      items: categories.map((category) =>
        CategoryOutputMapper.toOutput(category)
      ),
    });
  });

  it("should be able to list categories when it ordered by created at", async () => {
    const createdAt = new Date();
    const categories = [
      new Category({
        name: "Movie 1",
        createdAt,
      }),
      new Category({
        name: "Movie 2",
        createdAt: new Date(createdAt.getTime() + 100),
      }),
      new Category({
        name: "Movie 3",
        createdAt: new Date(createdAt.getTime() + 200),
      }),
    ];
    repository.items = categories;

    const output = await useCase.execute({});

    expect(output).toStrictEqual({
      total: 3,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      items: [...categories].reverse().map((category) => category.toJSON()),
    });
  });

  it("should be able to list categories using pagination, sort and filter", async () => {
    const categories = [
      new Category({ name: "a" }),
      new Category({ name: "AAA" }),
      new Category({ name: "AaA" }),
      new Category({ name: "b" }),
      new Category({ name: "c" }),
    ];
    repository.items = categories;

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      filter: "a",
    });

    expect(output).toStrictEqual({
      total: 3,
      currentPage: 1,
      lastPage: 2,
      perPage: 2,
      items: [categories[1].toJSON(), categories[2].toJSON()],
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: "name",
      filter: "a",
    });

    expect(output).toStrictEqual({
      total: 3,
      currentPage: 2,
      lastPage: 2,
      perPage: 2,
      items: [categories[0].toJSON()],
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: "desc",
      filter: "a",
    });

    expect(output).toStrictEqual({
      total: 3,
      currentPage: 1,
      lastPage: 2,
      perPage: 2,
      items: [categories[0].toJSON(), categories[2].toJSON()],
    });
  });
});
