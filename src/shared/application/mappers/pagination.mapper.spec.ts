import { SearchResult } from "../../../shared/domain/repository/repository.interface";
import { PaginationOutputMapper } from "./pagination.mapper";

describe("PaginationOutputMapper Unit Tests", () => {
  it("should be able to convert a SearchResult in output", () => {
    const result = new SearchResult({
      items: ["fake"] as any,
      total: 1,
      currentPage: 1,
      perPage: 1,
      sort: "name",
      sortOrder: "desc",
      filter: "fake",
    });

    const output = PaginationOutputMapper.toPaginationOutput(result);
    expect(output).toStrictEqual({
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
    });
  });
});
