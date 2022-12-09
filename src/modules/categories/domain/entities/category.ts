import { Entity } from "../../../../shared/domain/entity/entity";
import { UniqueEntityId } from "../../../../shared/domain/value-object/unique-entity-id";

type CategoryProps = {
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export class Category extends Entity<CategoryProps> {
  constructor(public readonly props: CategoryProps, id?: UniqueEntityId) {
    super(props, id);
    this.description = this.props.description;
    this.isActive = this.props.isActive;
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  private set description(description: string) {
    this.props.description = description ?? null;
  }

  get isActive() {
    return this.props.isActive;
  }

  private set isActive(isActive: boolean) {
    this.props.isActive = isActive ?? true;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  activate(): void {
    this.props.isActive = true;
  }

  deactivate(): void {
    this.props.isActive = false;
  }

  update(name: string, description?: string): void {
    this.props.name = name;

    if (description && description != "") {
      this.props.description = description;
    }
  }
}
