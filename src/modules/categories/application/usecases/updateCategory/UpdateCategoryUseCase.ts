import { CategoryRepository } from "../../../domain/repositories/category.repository";
import {
  UpdateCategoryInputDto,
  UpdateCategoryOutputDto,
} from "./UpdateCategory.dto";
import { UseCase } from "../../../../../shared/application/usecase";
import { CategoryOutputMapper } from "../../mappers/category.mapper";
import { NotFoundError } from "../../../../../shared/errors/NotFoundError";

export class UpdateCategoryUseCase
  implements UseCase<UpdateCategoryInputDto, UpdateCategoryOutputDto>
{
  constructor(private categoryRepository: CategoryRepository) {}

  public async execute(
    input: UpdateCategoryInputDto
  ): Promise<UpdateCategoryOutputDto> {
    const category = await this.categoryRepository.findById(input.id);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    category.update(input.name, input.description);

    if (input.isActive === true) {
      category.activate();
    }

    if (input.isActive === false) {
      category.deactivate();
    }

    await this.categoryRepository.update(category);

    return CategoryOutputMapper.toOutput(category);
  }
}
