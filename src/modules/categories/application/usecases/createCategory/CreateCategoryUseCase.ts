import { CategoryRepository } from "../../../domain/repositories/category.repository";
import { Category } from "../../../domain/entities/category";
import {
  InputCreateCategoryDto,
  OutputCreateCategoryDto,
} from "./CreateCategory.dto";
import { UseCase } from "../../../../../shared/application/usecase";
import { CategoryOutputMapper } from "../../mappers/category.mapper";

export class CreateCategoryUseCase
  implements UseCase<InputCreateCategoryDto, OutputCreateCategoryDto>
{
  constructor(private categoryRepository: CategoryRepository) {}

  public async execute(
    input: InputCreateCategoryDto
  ): Promise<OutputCreateCategoryDto> {
    const category = new Category({
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    });

    await this.categoryRepository.insert(category);

    return CategoryOutputMapper.toOutput(category);
  }
}
