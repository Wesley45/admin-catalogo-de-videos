import { UniqueEntityId } from "../value-object/unique-entity-id";

export interface RepositoryInterface<T> {
  insert(data: T): Promise<T>;
  findById(id: string | UniqueEntityId): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(data: T): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export type SortDirection = "asc" | "desc";

export type SearchProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParams<Filter = string> {
  protected _page: number;
  protected _perPage: number = 15;
  protected _sort: string | null;
  protected _sortDir: SortDirection | null;
  protected _filter: Filter | null;

  constructor(props: SearchProps = {}) {
    this.page = props.page;
    this.perPage = props.per_page;
    this.sort = props.sort;
    this.sortDir = props.sort_dir;
    this.filter = props.filter;
  }

  get page(): number {
    return this._page;
  }

  private set page(value: number) {
    let page = +value;

    if (Number.isNaN(page) || page <= 0 || parseInt(page as any) !== page) {
      page = 1;
    }

    this._page = page;
  }

  get perPage(): number {
    return this._perPage;
  }

  private set perPage(value: number) {
    let perPage = value === (true as any) ? this._perPage : +value;

    if (
      Number.isNaN(perPage) ||
      perPage <= 0 ||
      parseInt(perPage as any) !== perPage
    ) {
      perPage = this._perPage;
    }

    this._perPage = perPage;
  }

  get sort(): string | null {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort =
      value === null || value === undefined || value === "" ? null : `${value}`;
  }

  get sortDir() {
    return this._sortDir;
  }

  private set sortDir(value: SortDirection | null) {
    if (!this._sort) {
      this._sortDir = null;
      return;
    }

    const sortDir = `${value}`.toLocaleLowerCase();
    this._sortDir = sortDir !== "asc" && sortDir !== "desc" ? "asc" : sortDir;
  }

  get filter(): Filter | null {
    return this._filter;
  }

  private set filter(value: Filter | null) {
    this._filter =
      value === null || value === undefined || (value as unknown) === ""
        ? null
        : (`${value}` as any);
  }
}

type SearchResultProps<T, Filter> = {
  items: T[];
  total: number;
  currentPage: number;
  perPage: number;
  sort: string | null;
  sortOrder: string | null;
  filter: Filter | null;
};

export class SearchResult<T, Filter = string> {
  readonly items: T[];
  readonly total: number;
  readonly currentPage: number;
  readonly perPage: number;
  readonly lastPage: number;
  readonly sort: string | null;
  readonly sortOrder: string | null;
  readonly filter: Filter | null;

  constructor(props: SearchResultProps<T, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = Math.ceil(this.total / this.perPage);
    this.sort = props.sort ?? null;
    this.sortOrder = props.sortOrder ?? null;
    this.filter = props.filter ?? null;
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
      sort: this.sort,
      sortOrder: this.sortOrder,
      filter: this.filter,
    };
  }
}

export interface SearchableRepositoryInterface<
  T,
  Filter = string,
  InputSearchParams = SearchParams,
  OutputSearchResult = SearchResult<T, Filter>
> extends RepositoryInterface<T> {
  sortableFields: string[];
  search(props: InputSearchParams): Promise<OutputSearchResult>;
}
