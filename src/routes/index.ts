import ProductController from "@/controllers/product.controller";
import { Request, Response, Router } from "express";

export const routes = Router();

routes.get("/api/products", ProductController.findAll);
routes.post("/api/products", ProductController.create);
routes.get("/api/products/:id", ProductController.findOne);
routes.put("/api/products/:id", ProductController.update);
routes.delete("/api/products/:id", ProductController.remove);
routes.get("/", (_: Request, response: Response) => {
  return response.status(200).json({
    success: true,
  });
});
routes.get("*", (_: Request, response: Response) => {
  return response.status(404).json({
    error: "Not Found",
  });
});
