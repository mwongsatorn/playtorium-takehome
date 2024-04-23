import { checkbox, confirm } from "@inquirer/prompts";
import chalk from "chalk";
import Table from "cli-table3";
import productList from "./list.json";
import { cart, emptyCart } from "./cart.js";

export async function shopping() {
  let totalPrice = 0;
  let cartList = new Set<number>();
  while (true) {
    console.clear();
    let choices = productList.map((a, index) => {
      return { name: a.name, value: index, checked: cartList.has(index) };
    });
    const answers = await checkbox({
      message: "Select what you want to buy \n",
      required: true,
      choices: choices,
    }).catch((e) => process.exit());
    cartList = new Set(answers);
    const table = new Table({
      head: ["Product", "Price", "Category"],
      style: {
        "padding-left": 2,
        "padding-right": 2,
      },
    });
    const indexes = Array.from(cartList);
    indexes.forEach((v) => cart.push(productList[v]));
    totalPrice = cart.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
    cart.forEach((a) => {
      table.push([a.name, a.price, a.category]);
    });

    table.push([
      chalk.red("Total Price"),
      { colSpan: 2, content: totalPrice, hAlign: "center" },
    ]);
    console.log(table.toString());

    const proceed = await confirm({ message: "Confirm order?" });
    if (proceed) return totalPrice;

    emptyCart();
  }
}
