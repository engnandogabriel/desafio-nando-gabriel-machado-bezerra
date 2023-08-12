import { menu } from "./data.js";

class PaymentOrder {
  price;
  constructor() {
    this.price = 0;
  }

  payment(itens, metodoDePagamento, valueCorrection) {
    itens.forEach((element) => {
      const item = element.split(",")[0];
      const itemQuantity = element.split(",")[1];
      menu.find((e) => {
        if (e.cod === item) this.price += e.price * itemQuantity;
      });
    });
    if (metodoDePagamento === "dinheiro")
      this.price = this.price - this.price * valueCorrection;
    if (metodoDePagamento === "credito")
      this.price = this.price + this.price * valueCorrection;

    return this.price.toFixed(2).replace(".", ",");
  }
}

export default PaymentOrder;
