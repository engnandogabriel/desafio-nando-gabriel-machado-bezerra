import ValidateOrder from "./ValidateOrder.js";
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
  // paymentInKind(itens) {
  //   itens.forEach((element) => {
  //     const item = element.split(",")[0];
  //     const itemQuantity = element.split(",")[1];
  //     menu.find((e) => {
  //       if (e.cod === item) this.price += e.price * itemQuantity;
  //     });
  //   });
  //   return this.price.toFixed(2);
  // }
  // paymentInCreditCard(itens) {
  //   itens.forEach((element) => {
  //     const item = element.split(",")[0];
  //     const itemQuantity = element.split(",")[1];
  //     menu.find((e) => {
  //       if (e.cod === item) this.price += e.price * itemQuantity;
  //     });
  //   });
  //   return (this.price + this.price * 0.03).toFixed(2);
  // }
}

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!itens.length) return "Não há itens no carrinho de compra!";

    const validateOrder = new ValidateOrder();

    const validateIten = validateOrder.validateIten(itens);
    if (validateIten != null) return validateIten;

    const validatePayment =
      validateOrder.validateMethodoPayment(metodoDePagamento);
    if (validatePayment != null) return validatePayment;

    const validQuantity = validateOrder.validateQuantity(itens);
    if (validQuantity != null) return validQuantity;

    const validateItem = validateOrder.validateExtraItem(itens);
    if (validateItem != null) return validateItem;

    const paymentOrder = new PaymentOrder();

    if (metodoDePagamento === "dinheiro")
      return `R$ ${paymentOrder.payment(itens, "dinheiro", 0.05)}`;
    if (metodoDePagamento === "debito")
      return `R$ ${paymentOrder.payment(itens)}`;
    if (metodoDePagamento === "credito")
      return `R$ ${paymentOrder.payment(itens, "credito", 0.03)}`;
  }
}

export { CaixaDaLanchonete };

const caixa = new CaixaDaLanchonete();
const teste = caixa.calcularValorDaCompra("debito", ["cafe,1"]);
console.log(teste);
