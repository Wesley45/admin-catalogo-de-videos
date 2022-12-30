import { Category } from "../../domain/entities/category";
import { CategoryOutputMapper } from "./category.mapper";

describe("CategoryOutputMapper", () => {
  it("should be able to convert a category in output", () => {
    const createdAt = new Date();
    const category = new Category({
      name: "Movie",
      description: "Some description",
      isActive: true,
      createdAt,
    });
    const spyToJson = jest.spyOn(category, "toJSON");
    const output = CategoryOutputMapper.toOutput(category);
    expect(spyToJson).toHaveBeenCalled();
    expect(output).toStrictEqual(category.toJSON());
  });
});
