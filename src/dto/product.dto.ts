import { IsNotEmpty, Length } from "class-validator";

export class ProductDTO {
  @IsNotEmpty()
  @Length(3, 255)
  public name: string;

  @IsNotEmpty()
  @Length(3, 255)
  public description: string;

  @IsNotEmpty()
  public weight?: number;

  constructor(name: string, description: string, weight?: number) {
    this.name = name;
    this.description = description;

    this.weight = weight;
  }
}
