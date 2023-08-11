import { menu, methodosPayment } from "./data.js";

class ValidateOrder {
  productValidation;
  validatePayment;
  quantityValidation;
  validateItemExtra;

  constructor() {
    this.productValidation = null;
    this.quantityValidation = null;
    this.validateItemExtra = null;
    this.validatePayment = null;
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
    var extra = itens.find(
      (e) => e.split(",")[0] === "chantily" || e.split(",")[0] === "queijo"
    );
    if (extra === undefined) return this.validateItemExtra;
    console.log(extra);
    extra = extra.split(",")[0];

    if (extra === "chantily") {
      const principal = itens.find((e) => e.split(",")[0].includes("cafe"));
      if (!principal)
        this.validateItemExtra =
          "Item extra não pode ser pedido sem o principal";
    }
    if (extra === "queijo") {
      const principal = itens.find((e) =>
        e.split(",")[0].includes("sanduiche")
      );
      console.log(principal);
      if (!principal)
        this.validateItemExtra =
          "Item extra não pode ser pedido sem o principal";
    }
    return this.validateItemExtra;
  }
}

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!itens.length) return "Não há itens no carrinho de compra!";

    const validarPedido = new ValidateOrder();

    const validateIten = validarPedido.validateIten(itens);
    if (validateIten != null) return validateIten;
    const validatePayment =
      validarPedido.validateMethodoPayment(metodoDePagamento);
    if (validatePayment != null) return validatePayment;

    const validQuantity = validarPedido.validateQuantity(itens);
    if (validQuantity != null) return validQuantity;

    const validateItem = validarPedido.validateExtraItem(itens);
    if (validateItem != null) return validateItem;
    return "R$ 2,85";
  }
}

export { CaixaDaLanchonete };

const caixa = new CaixaDaLanchonete();
const teste = caixa.calcularValorDaCompra("dinheiro", ["chantily,3", "cafe,2"]);
console.log(teste);
