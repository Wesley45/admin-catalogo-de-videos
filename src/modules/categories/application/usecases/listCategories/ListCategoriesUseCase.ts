import {
  CategoryRepository,
  CategorySearchResult,
} from "../../../domain/repositories/category.repository";
import { UseCase } from "../../../../../shared/application/usecase";
import {
  ListCategoriesInputDto,
  ListCategoriesOutputDto,
} from "./ListCategories.dto";
import { SearchParams } from "../../../../../shared/domain/repository/repository.interface";
import { PaginationOutputMapper } from "../../../../../shared/application/mappers/pagination.mapper";
import { CategoryOutputMapper } from "../../mappers/category.mapper";

export class ListCategoriesUseCase
  implements UseCase<ListCategoriesInputDto, ListCategoriesOutputDto>
{
  constructor(private categoryRepository: CategoryRepository) {}

  public async execute(
    input: ListCategoriesInputDto
  ): Promise<ListCategoriesOutputDto> {
    const params = new SearchParams(input);
    const categories = await this.categoryRepository.search(params);
    return this.toOutput(categories);
  }

  private toOutput(categories: CategorySearchResult): ListCategoriesOutputDto {
    return {
      ...PaginationOutputMapper.toPaginationOutput(categories),
      items: categories.items.map((category) =>
        CategoryOutputMapper.toOutput(category)
      ),
    };
  }
}
