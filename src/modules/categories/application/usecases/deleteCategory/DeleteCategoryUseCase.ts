import { CategoryRepository } from "../../../domain/repositories/category.repository";
import {
  DeleteCategoryInputDto,
  DeleteCategoryOutputDto,
} from "./DeleteCategory.dto";
import { UseCase } from "../../../../../shared/application/usecase";
import { NotFoundError } from "../../../../../shared/errors/NotFoundError";

export class DeleteCategoryUseCase
  implements UseCase<DeleteCategoryInputDto, DeleteCategoryOutputDto>
{
  constructor(private categoryRepository: CategoryRepository) {}

  public async execute(
    input: DeleteCategoryInputDto
  ): Promise<DeleteCategoryOutputDto> {
    const category = await this.categoryRepository.findById(input.id);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    await this.categoryRepository.delete(input.id);
  }
}
