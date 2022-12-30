import { Entity } from "../entity/entity";
import { UniqueEntityId } from "../value-object/unique-entity-id";
import {
  RepositoryInterface,
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
  SortDirection,
} from "./repository.interface";

export abstract class InMemoryRepository<T> implements RepositoryInterface<T> {
  public items: T[] = [];

  public async findById(id: string | UniqueEntityId): Promise<T | null> {
    const _id = `${id}`;
    // @ts-ignore
    const item = this.items.find((item) => item.id === _id);
    if (!item) {
      return null;
    }
    return item;
  }

  public async findAll(): Promise<T[]> {
    return this.items;
  }

  public async insert(data: T): Promise<T> {
    this.items.push(data);
    return data;
  }

  public async update(data: T): Promise<void> {
    // @ts-ignore
    const itemIndex = this.items.findIndex((item) => item.id === data.id);
    if (itemIndex >= 0) {
      this.items[itemIndex] = data;
    }
  }

  public async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    // @ts-ignore
    this.items = this.items.filter((item) => item.id !== _id);
  }
}

export abstract class InMemorySearchableRepository<T extends Entity>
  extends InMemoryRepository<T>
  implements SearchableRepositoryInterface<T>
{
  sortableFields: string[] = [];

  public async search(props: SearchParams): Promise<SearchResult<T>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter);
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sortDir
    );
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.perPage
    );
    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      currentPage: props.page,
      perPage: props.perPage,
      sort: props.sort,
      sortOrder: props.sortDir,
      filter: props.filter,
    });
  }

  protected abstract applyFilter(
    items: T[],
    filter: string | null
  ): Promise<T[]>;

  protected async applySort(
    items: T[],
    sort: string | null,
    sortDir: SortDirection | null
  ): Promise<T[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }

    return [...items].sort((a: T, b: T) => {
      // @ts-ignore
      if (a.props[sort] < b.props[sort]) {
        return sortDir === "asc" ? -1 : 1;
      }

      // @ts-ignore
      if (a.props[sort] > b.props[sort]) {
        return sortDir === "asc" ? 1 : -1;
      }

      return 0;
    });
  }

  protected async applyPaginate(
    items: T[],
    page: SearchParams["page"],
    perPage: SearchParams["perPage"]
  ): Promise<T[]> {
    const start = (page - 1) * perPage;
    const limit = start + perPage;
    return items.slice(start, limit);
  }
}
