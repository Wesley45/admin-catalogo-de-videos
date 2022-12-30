import { Category } from "../../../domain/entities/category";
import { NotFoundError } from "../../../../../shared/errors/NotFoundError";
import { CategoryRepositoryInMemory } from "../../../infra/repositories/in-memory/CategoryRepositoryInMemory";
import { DeleteCategoryUseCase } from "../deleteCategory/DeleteCategoryUseCase";

describe("UpdateCategoryUseCase Unit Tests", () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategoryRepositoryInMemory;

  beforeEach(() => {
    repository = new CategoryRepositoryInMemory();
    useCase = new DeleteCategoryUseCase(repository);
  });

  it("should not be able to delete a category when not found", async () => {
    expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError("Category not found")
    );
  });

  it("should be able to delete a category", async () => {
    const category = new Category({ name: "Movie" });
    repository.items = [category];

    const spyUpdate = jest.spyOn(repository, "delete");
    await useCase.execute({ id: category.id });

    expect(spyUpdate).toHaveBeenCalled();
    expect(repository.items).toStrictEqual([]);
  });
});
