import { ValidatorRules } from "../../../../shared/validators/validator-rules";
import { Entity } from "../../../../shared/domain/entity/entity";
import { UniqueEntityId } from "../../../../shared/domain/value-object/unique-entity-id";
import { CategoryValidatorFactory } from "../validators/category.validator";
import { EntityValidationError } from "../../../../shared/errors/ValidationError";

export type CategoryProps = {
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export class Category extends Entity<CategoryProps> {
  constructor(public readonly props: CategoryProps, id?: UniqueEntityId) {
    super(props, id);
    Category.validate(props);
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

  static validate(props: Omit<CategoryProps, "createdAt">): void {
    /* ValidatorRules.values(props.name, "name")
      .required()
      .string()
      .maxLength(255);
    ValidatorRules.values(props.description, "description").string();
    ValidatorRules.values(props.isActive, "isActive").boolean(); */
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  activate(): void {
    this.props.isActive = true;
  }

  deactivate(): void {
    this.props.isActive = false;
  }

  update(name: string, description?: string): void {
    Category.validate({ name, description });
    this.props.name = name;
    if (description && description != "") {
      this.props.description = description;
    }
  }
}
