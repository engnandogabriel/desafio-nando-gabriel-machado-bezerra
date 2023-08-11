import { menu, methodosPayment } from "./data.js";

class ValidateOrder {
  productValidation;
  quantityValidation;

  constructor() {
    this.productValidation = true;
    this.quantityValidation = null;
  }

  validateIten(itens) {
    itens.forEach((element) => {
      var codProduct = element.split(",")[0];
      if (!menu.find((card) => card.cod === codProduct))
        this.productValidation = false;
    });
    return this.productValidation;
  }

  validateMethodoPayment(metodoDePagamento) {
    const paymet = methodosPayment.find(
      (methodos) => methodos === metodoDePagamento
    );
    if (paymet) return true;
    return false;
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
}

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const validarPedido = new ValidateOrder();
    if (!validarPedido.validateIten(itens)) return "Item inválido!";
    if (!validarPedido.validateMethodoPayment(metodoDePagamento))
      return "Forma de pagamento inválida";

    var validQuantity = validarPedido.validateQuantity(itens);
    if (validQuantity != null) return validQuantity;

    return "Compra Válida";
  }
}

export { CaixaDaLanchonete };

const caixa = new CaixaDaLanchonete();
const teste = caixa.calcularValorDaCompra("debito", ["chantily,1"]);
console.log(teste);
