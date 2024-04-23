import { select } from "@inquirer/prompts";

export async function seasonalDiscount(currentPrice: number) {
  let discount = 0;
  const selected = await select<"None" | { discount: number; every: number }>({
    message: "Select seasonal discount",
    choices: [
      {
        name: "Discount 30 for every 300",
        value: {
          discount: 30,
          every: 300,
        },
        disabled: currentPrice < 300,
      },
      {
        name: "Discount 50 for every 500",
        value: {
          discount: 50,
          every: 500,
        },
        disabled: currentPrice < 500,
      },
      {
        name: "Discount 100 for every 1000",
        value: {
          discount: 100,
          every: 1000,
        },
        disabled: currentPrice < 1000,
      },
      {
        name: "Discount 150 for every 1500",
        value: {
          discount: 150,
          every: 1500,
        },
        disabled: currentPrice < 1500,
      },
      {
        name: "None",
        value: "None",
      },
    ],
  });
  if (selected === "None") {
    return discount;
  }
  discount = Math.floor(currentPrice / selected.every) * selected.discount;
  return discount;
}
