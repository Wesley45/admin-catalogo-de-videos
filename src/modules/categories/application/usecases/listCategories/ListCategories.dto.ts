import { PaginationOutputDto } from "../../../../../shared/application/dtos/pagination-output.dto";
import { SearchInputDto } from "../../../../../shared/application/dtos/search-input.dto";
import { CategoryOutputDto } from "../../dtos/category.output.dto";

export type ListCategoriesInputDto = SearchInputDto;

export type ListCategoriesOutputDto = PaginationOutputDto<CategoryOutputDto>;
