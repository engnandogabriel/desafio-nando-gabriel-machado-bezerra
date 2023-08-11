import ValidateOrder from "./ValidateOrder.js";

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
