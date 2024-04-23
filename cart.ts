type Product = {
  name: string;
  price: number;
  category: string;
};

type Category = "Clothings" | "Accessories" | "Electronics";

export function filterCart(c: Category): Product[] {
  return cart.filter((product) => product.category === c);
}

export function emptyCart() {
  cart = [];
}

export function hasCategory(c: Category): boolean {
  return cart.some((v) => v.category === c);
}

export let cart: Product[] = [];
