import { Category } from "../../../domain/entities/category";
import { NotFoundError } from "../../../../../shared/errors/NotFoundError";
import { CategoryRepositoryInMemory } from "../../../infra/repositories/in-memory/CategoryRepositoryInMemory";
import { GetCategoryUseCase } from "../getCategoryUseCase/GetCategoryUseCase";

describe("GetCategoryUseCase Unit Tests", () => {
  let useCase: GetCategoryUseCase;
  let repository: CategoryRepositoryInMemory;

  beforeEach(() => {
    repository = new CategoryRepositoryInMemory();
    useCase = new GetCategoryUseCase(repository);
  });

  it("should not be able to find a category when not found", async () => {
    expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError("Category not found")
    );
  });

  it("should be able to find a category", async () => {
    const items = [new Category({ name: "Movie" })];
    repository.items = items;

    const spyInsert = jest.spyOn(repository, "findById");
    let output = await useCase.execute({ id: items[0].id });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: "Movie",
      description: null,
      isActive: true,
      createdAt: repository.items[0].createdAt,
    });
  });
});
