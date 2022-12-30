import { CategoryOutputDto } from "../../dtos/category.output.dto";

export type UpdateCategoryInputDto = {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
};

export type UpdateCategoryOutputDto = CategoryOutputDto;
