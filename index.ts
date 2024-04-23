import figlet from "figlet";
import gradient from "gradient-string";
import Table from "cli-table3";
import chalk from "chalk";
import { confirm } from "@inquirer/prompts";
import { shopping } from "./shopping.js";
import { couponDiscount } from "./coupon.js";
import { onTopDiscount } from "./ontop.js";
import { seasonalDiscount } from "./seasonal.js";
import { emptyCart } from "./cart.js";

let totalPrice: number,
  firstDiscountPrice: number,
  secondDiscountPrice: number,
  finalPrice: number;

console.clear();
console.log(
  gradient.summer.multiline(
    figlet.textSync("Discount Module Simulation", {
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 90,
      whitespaceBreak: true,
    })
  )
);
await sleep(2000);

try {
  while (true) {
    totalPrice = await shopping();
    const cDiscount = await couponDiscount(totalPrice);
    firstDiscountPrice = totalPrice - cDiscount;

    const otDiscount = await onTopDiscount(firstDiscountPrice);
    secondDiscountPrice = firstDiscountPrice - otDiscount;

    const sDiscount = await seasonalDiscount(secondDiscountPrice);
    finalPrice = secondDiscountPrice - sDiscount;

    const priceTable = new Table({
      head: ["Discount category", "Discount amount", "After discount"],
    });
    priceTable.push(["Coupon", cDiscount, firstDiscountPrice]);
    priceTable.push(["On Top", otDiscount, secondDiscountPrice]);
    priceTable.push(["Seasonal", sDiscount, finalPrice]);
    priceTable.push([
      {
        colSpan: 2,
        content: chalk.cyan("Orignal price"),
        hAlign: "center",
      },
      totalPrice,
    ]);
    priceTable.push([
      {
        colSpan: 2,
        content: chalk.greenBright("Final price"),
        hAlign: "center",
      },
      finalPrice,
    ]);
    console.log(priceTable.toString());
    await sleep(2000);
    const retry = await confirm({ message: "Do you want to try again?" });
    if (!retry) break;
    console.clear();
    emptyCart();
  }
} catch (e) {
  console.log(e);
  process.exit();
}

async function sleep(ms: number = 1000) {
  return new Promise((r) => setTimeout(r, ms));
}
