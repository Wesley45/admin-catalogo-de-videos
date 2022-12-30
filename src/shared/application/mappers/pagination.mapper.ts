import { SearchResult } from "../../domain/repository/repository.interface";
import { PaginationOutputDto } from "../dtos/pagination-output.dto";

export class PaginationOutputMapper {
  static toPaginationOutput(
    result: SearchResult
  ): Omit<PaginationOutputDto, "items"> {
    return {
      total: result.total,
      currentPage: result.currentPage,
      lastPage: result.lastPage,
      perPage: result.perPage,
    };
  }
}
