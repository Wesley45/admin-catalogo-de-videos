import { Category } from "../../domain/entities/category";
import { CategoryOutputDto } from "../dtos/category.output.dto";

export class CategoryOutputMapper {
  static toOutput(category: Category): CategoryOutputDto {
    return category.toJSON();
  }
}
