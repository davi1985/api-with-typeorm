import { AppDataSource } from "@/database/connection";
import { ProductDTO } from "@/dto/product.dto";
import { Product } from "@/entities/product.entity";
import { DeleteResult, Repository } from "typeorm";

type Nullable<Type> = Promise<Type | null>;

export class ProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async findAll(): Promise<Product[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Nullable<Product> {
    return await this.repository.findOneBy({ id });
  }

  async create(productDTO: ProductDTO): Promise<Product> {
    const product = new Product(
      productDTO.name,
      productDTO.description,
      productDTO.weight
    );

    return await this.repository.save(product);
  }

  async update(productId: string, productDTO: ProductDTO): Nullable<Product> {
    let product = await this.findOne(productId);

    if (!product) return null;

    product.name = productDTO.name;
    product.description = productDTO.description;
    product.weight = productDTO.weight;

    return await this.repository.save(product);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}
