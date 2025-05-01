import { Cart } from "../persistence/models/cart.model.js";

export const cartService = {
  async createCart() {
    const newCart = new Cart({ products: [] });
    return await newCart.save();
  },

  async addProductToCart(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    return await cart.save();
  },

  async deleteProductFromCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    cart.products = cart.products.filter((p) => p.productId.toString() !== productId);
    return await cart.save();
  },

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const product = cart.products.find((p) => p.productId.toString() === productId);
    if (!product) throw new Error("Producto no encontrado en el carrito");

    product.quantity = quantity;
    return await cart.save();
  },
};
