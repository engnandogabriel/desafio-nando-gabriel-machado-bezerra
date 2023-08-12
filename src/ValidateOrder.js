import { menu, methodosPayment } from "./data.js";

class ValidateOrder {
  productValidation;
  validatePayment;
  quantityValidation;
  hasDependency;

  constructor() {
    this.productValidation = null;
    this.quantityValidation = null;
    this.validatePayment = null;
    this.hasDependency = false;
  }

  validateIten(itens) {
    itens.forEach((element) => {
      var codProduct = element.split(",")[0];
      if (!menu.find((card) => card.cod === codProduct))
        this.productValidation = "Item inválido!";
    });
    return this.productValidation;
  }

  validateMethodoPayment(metodoDePagamento) {
    const paymet = methodosPayment.find(
      (methodos) => methodos === metodoDePagamento
    );
    if (paymet) return this.validatePayment;
    return (this.validatePayment = "Forma de pagamento inválida!");
  }

  validateQuantity(itens) {
    itens.forEach((element) => {
      var qtdProduct = element.split(",")[1];
      if (qtdProduct == 0) this.quantityValidation = "Quantidade inválida!";
      if (qtdProduct < 0)
        this.quantityValidation = "Não há itens no carrinho de compra!";
    });
    return this.quantityValidation;
  }

  validateExtraItem(itens) {
    const itemDependencies = {
      chantily: "cafe",
      queijo: "sanduiche",
    };
    const items = itens.map((item) => item.split(",")[0]);
    for (const item in itemDependencies) {
      if (items.includes(item)) {
        const dependency = itemDependencies[item];
        if (!items.includes(dependency)) {
          this.hasDependency = true;
          break;
        }
      }
    }
    if (this.hasDependency)
      return "Item extra não pode ser pedido sem o principal";
    return null;
  }
}
export default ValidateOrder;
