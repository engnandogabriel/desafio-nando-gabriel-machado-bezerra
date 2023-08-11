import { menu, methodosPayment } from "./data.js";

class ValidateOrder {
  productValidation = true;

  validateIten(itens) {
    itens.forEach((element) => {
      var codProduct = element.split(",")[0];
      if (!menu.find((card) => card.cod === codProduct))
        this.productValidation = false;
    });
    return this.productValidation;
  }
}

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const validarPedido = new ValidateOrder();
    if (!validarPedido.validateIten(itens)) return "Item inválido!";
    return "Compra Válida";
  }
}

export { CaixaDaLanchonete };

const caixa = new CaixaDaLanchonete();
const teste = caixa.calcularValorDaCompra("debito", ["cafe,1", "chantily,1"]);
console.log(teste);
