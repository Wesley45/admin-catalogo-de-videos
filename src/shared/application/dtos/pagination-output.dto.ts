export interface PaginationOutputDto<Items = any> {
  items: Items[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
}
