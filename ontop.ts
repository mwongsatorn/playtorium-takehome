import { select,input } from "@inquirer/prompts";
import { cart, hasCategory } from "./cart.js";

export async function onTopDiscount(currentPrice: number) {
  let discount = 0
  const type = await select({
    message: "Select on-top discount",
    choices: [
      {
        name: "Percentage discount by item category",
        value: 0,
      },
      {
        name: "Discount by points",
        value: 1,
      },
    ],
  });

  if (type === 0) {
    const productCategory = await select({
      message: "Select category to discount",
      choices: [
        {
          name: "Clothings",
          value: "Clothings",
          disabled: !hasCategory("Clothings")
        },
        {
          name: "Accessories",
          value: "Accessories",
          disabled: !hasCategory("Accessories")
        },
        {
          name: "Electronics",
          value: "Electronics",
          disabled: !hasCategory("Electronics")
        },
      ],
    });
    const percentage = await select({
      message: "Select percentage discount",
      choices: [
        {
          name: "5%",
          value: 0.05,
        },
        {
          name: "10%",
          value: 0.1,
        },
        {
          name: "15%",
          value: 0.15,
        },
        {
          name: "20%",
          value: 0.20,
        },
      ],
    })
    const categoryDiscount = (cat: string, p: number): number => {
      const list = cart.filter((a) => a.category === cat);
      const totalPrice = list.reduce((acc, product) => acc + product.price, 0);
      return totalPrice * p;
    };
    discount = categoryDiscount(productCategory, percentage);
  }

  if (type === 1) {
    const cap = Math.floor(currentPrice * 0.2);
    const points = await input({
      message: `Enter your points (Max ${cap})`,
      validate: (value) => {
        const v = parseInt(value, 10);
        if (Number.isNaN(v)) return "Value must be a number";
        if (v < 0) return "Number must be positive";
        if (v > cap)
          return "You can't use your points more than 20% of the price";
        return true;
      },
    });
    discount = parseInt(points, 10);
  }
  return discount;
}