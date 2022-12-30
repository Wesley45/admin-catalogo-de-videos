import { CategoryOutputDto } from "../../dtos/category.output.dto";

export type InputCreateCategoryDto = {
  name: string;
  description?: string;
  isActive?: boolean;
};

export type OutputCreateCategoryDto = CategoryOutputDto;
