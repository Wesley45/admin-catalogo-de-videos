import { Category } from "../../../domain/entities/category";
import { NotFoundError } from "../../../../../shared/errors/NotFoundError";
import { CategoryRepositoryInMemory } from "../../../infra/repositories/in-memory/CategoryRepositoryInMemory";
import { UpdateCategoryUseCase } from "../updateCategory/UpdateCategoryUseCase";

describe("UpdateCategoryUseCase Unit Tests", () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategoryRepositoryInMemory;

  beforeEach(() => {
    repository = new CategoryRepositoryInMemory();
    useCase = new UpdateCategoryUseCase(repository);
  });

  it("should not be able to update a category when not found", async () => {
    expect(() =>
      useCase.execute({ id: "fake id", name: "fake name" })
    ).rejects.toThrow(new NotFoundError("Category not found"));
  });

  it("should be able to update a category", async () => {
    const category = new Category({ name: "Movie" });
    repository.items = [category];

    const spyUpdate = jest.spyOn(repository, "update");
    let output = await useCase.execute({ id: category.id, name: "test" });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: category.id,
      name: "test",
      description: category.description,
      isActive: category.isActive,
      createdAt: category.createdAt,
    });

    output = await useCase.execute({
      id: category.id,
      name: "test",
      description: "some description",
      isActive: false,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: category.id,
      name: "test",
      description: "some description",
      isActive: false,
      createdAt: category.createdAt,
    });

    output = await useCase.execute({
      id: category.id,
      name: "test",
      description: "some description",
      isActive: true,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(3);
    expect(output).toStrictEqual({
      id: category.id,
      name: "test",
      description: "some description",
      isActive: true,
      createdAt: category.createdAt,
    });

    output = await useCase.execute({
      id: category.id,
      name: "test",
    });
    expect(spyUpdate).toHaveBeenCalledTimes(4);
    expect(output).toStrictEqual({
      id: category.id,
      name: "test",
      description: "some description",
      isActive: true,
      createdAt: category.createdAt,
    });

    output = await useCase.execute({
      id: category.id,
      name: "test",
      isActive: true,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(5);
    expect(output).toStrictEqual({
      id: category.id,
      name: "test",
      description: "some description",
      isActive: true,
      createdAt: category.createdAt,
    });
  });
});
