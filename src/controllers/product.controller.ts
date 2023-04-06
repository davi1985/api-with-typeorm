import { ProductDTO } from "@/dto/product.dto";
import { ProductRepository } from "@/repositories/product.repository";
import { validate } from "class-validator";
import { Request, Response } from "express";

class ProductController {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  findAll = async (_: Request, response: Response): Promise<Response> => {
    const products = await this.productRepository.findAll();

    return response.status(200).json(products);
  };

  findOne = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;

    const product = await this.productRepository.findOne(id);

    if (!product) {
      return response
        .status(404)
        .json({ error: { message: "Product not found" } });
    }

    return response.status(200).json(product);
  };

  create = async (request: Request, response: Response): Promise<Response> => {
    const { name, description, weight } = request.body;

    const productDTO = new ProductDTO(name, description, weight);

    const errors = await validate(productDTO);

    if (errors.length > 0) {
      return response.status(422).json(errors);
    }

    const product = await this.productRepository.create(productDTO);

    return response.status(201).json(product);
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    const { name, description, weight } = request.body;
    const productDTO = new ProductDTO(name, description, weight);

    const errors = await validate(productDTO);

    if (errors.length > 0) {
      return response.status(422).json(errors);
    }

    try {
      const productUpdated = await this.productRepository.update(
        id,
        productDTO
      );

      if (!productUpdated) {
        return response.status(404).json({
          error: {
            message: "Not found",
          },
        });
      }

      return response.status(200).json(productUpdated);
    } catch (error) {
      return response
        .status(500)
        .json({ error: { message: "Internal error" } });
    }
  };

  remove = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;

    try {
      await this.productRepository.remove(id);

      return response.status(204).json();
    } catch (error) {
      return response
        .status(500)
        .json({ error: { message: "Error deleting" } });
    }
  };
}

export default new ProductController();
