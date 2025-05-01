import { Router } from "express";
import { createCart, getCartById, addProductToCart, deleteProductFromCart, updateProductQuantity, clearCart } from "../controllers/cart.controllers.js";

const cartRouter = Router();

cartRouter.post("/", createCart);
cartRouter.get("/:id", getCartById);
cartRouter.post("/:id/products", addProductToCart);
cartRouter.delete("/:id/products/:productId", deleteProductFromCart);
cartRouter.put("/:id/products/:productId", updateProductQuantity);
cartRouter.delete("/:id", clearCart);

export default cartRouter;
