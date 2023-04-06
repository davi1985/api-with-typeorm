import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("products")
export class Product {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public weight?: number;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
  })
  private createdAt: Date;

  constructor(name: string, description: string, weight?: number) {
    if (!this.id) {
      this.id = uuid();
    }

    this.name = name;
    this.description = description;
    this.weight = weight;
  }
}
