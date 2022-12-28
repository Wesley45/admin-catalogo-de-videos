import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { ClassValidatorFields } from "../../../../shared/validators/class-validator-fields";
import { ValidatorFieldsInterface } from "../../../../shared/validators/validator-fields-interface";
import { CategoryProps } from "../entities/category";

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  constructor({ name, description, isActive, createdAt }: CategoryProps) {
    Object.assign(this, { name, description, isActive, createdAt });
  }
}

export class CategoryValidator
  extends ClassValidatorFields<CategoryRules>
  implements ValidatorFieldsInterface<CategoryRules>
{
  public validate(data: CategoryProps): boolean {
    return super.validate(new CategoryRules(data ?? ({} as any)));
  }
}

export class CategoryValidatorFactory {
  static create(): CategoryValidator {
    return new CategoryValidator();
  }
}
