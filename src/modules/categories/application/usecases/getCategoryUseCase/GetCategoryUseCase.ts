import { UseCase } from "../../../../../shared/application/usecase";
import { NotFoundError } from "../../../../../shared/errors/NotFoundError";
import { CategoryRepository } from "../../../domain/repositories/category.repository";
import { CategoryOutputMapper } from "../../mappers/category.mapper";
import { InputGetCategoryDto, OutputGetCategoryDto } from "./GetCategory.dto";

export class GetCategoryUseCase
  implements UseCase<InputGetCategoryDto, OutputGetCategoryDto>
{
  constructor(private categoryRepository: CategoryRepository) {}

  public async execute(
    input: InputGetCategoryDto
  ): Promise<OutputGetCategoryDto> {
    const category = await this.categoryRepository.findById(input.id);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    return CategoryOutputMapper.toOutput(category);
  }
}
