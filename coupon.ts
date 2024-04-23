import { select } from "@inquirer/prompts";

export async function couponDiscount(currentPrice: number) {
  let discountAmount = 0;
  const category = await select({
    message: "Select coupon discount",
    choices: [
      {
        name: "Fixed amount",
        value: 0,
      },
      {
        name: "Percentage discount",
        value: 1,
      },
    ],
  });
  if (category === 0) {
    const amount = await select({
      message: "Choose your discount amount ",
      choices: [
        { name: "50", value: 50 , disabled: currentPrice <= 50 * 2 },
        { name: "100", value: 100, disabled: currentPrice <= 100 * 2 },
        { name: "150", value: 150, disabled: currentPrice <= 150 * 2},
        { name: "300", value: 300, disabled: currentPrice <= 300 * 2 },
        { name: "500", value: 500, disabled: currentPrice <= 500 * 2 },
        { name: "1000", value: 1000, disabled: currentPrice <= 1000 * 2 },
      ],
    });
    discountAmount = amount;
  }
  if (category === 1) {
    const percent = await select({
      message: "Choose your discount percentage ",
      choices: [
        { name: "5%", value: 0.05 },
        { name: "10%", value: 0.1 },
        { name: "15%", value: 0.15 },
        { name: "20%", value: 0.20 }
      ],
    });
    discountAmount = currentPrice * percent;
  }

  return discountAmount;
}
