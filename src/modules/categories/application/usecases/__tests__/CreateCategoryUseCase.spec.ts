import { CategoryRepositoryInMemory } from "../../../infra/repositories/in-memory/CategoryRepositoryInMemory";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";

describe("CreateCategoryUseCase Unit Tests", () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategoryRepositoryInMemory;

  beforeEach(() => {
    repository = new CategoryRepositoryInMemory();
    useCase = new CreateCategoryUseCase(repository);
  });

  it("should create a category", async () => {
    const spyInsert = jest.spyOn(repository, "insert");
    let output = await useCase.execute({ name: "test" });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: "test",
      description: null,
      isActive: true,
      createdAt: repository.items[0].createdAt,
    });

    output = await useCase.execute({
      name: "test",
      description: "some description",
      isActive: false,
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: "test",
      description: "some description",
      isActive: false,
      createdAt: repository.items[1].createdAt,
    });

    output = await useCase.execute({
      name: "test",
      description: "some description",
      isActive: true,
    });
    expect(spyInsert).toHaveBeenCalledTimes(3);
    expect(output).toStrictEqual({
      id: repository.items[2].id,
      name: "test",
      description: "some description",
      isActive: true,
      createdAt: repository.items[2].createdAt,
    });
  });
});
