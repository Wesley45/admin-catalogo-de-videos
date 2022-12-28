import { Category } from "../../../domain/entities/category";
import { InMemorySearchableRepository } from "../../../../../shared/domain/repository/in-memory.repository";
import { CategoryRepository } from "../../../domain/repositories/category.repository";
import { SortDirection } from "../../../../../shared/domain/repository/repository.interface";

export class CategoryRepositoryInMemory
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository
{
  sortableFields: string[] = ["name", "createdAt"];

  protected async applyFilter(
    items: Category[],
    filter: string
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }
    return items.filter((item) => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: Category[],
    sort: string | null,
    sortDir: SortDirection | null
  ): Promise<Category[]> {
    if (!sort) {
      return super.applySort(items, "createdAt", "desc");
    }
    return super.applySort(items, sort, sortDir);
  }
}
