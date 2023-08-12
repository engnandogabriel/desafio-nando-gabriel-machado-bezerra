import PaymentOrder from "./PaymentOrder.js";
import ValidateOrder from "./ValidateOrder.js";

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!itens.length) return "Não há itens no carrinho de compra!";

    const validateOrder = new ValidateOrder();
    const paymentOrder = new PaymentOrder();

    const validateIten = validateOrder.validateIten(itens);
    if (validateIten != null) return validateIten;

    const validatePayment =
      validateOrder.validateMethodoPayment(metodoDePagamento);
    if (validatePayment != null) return validatePayment;

    const validQuantity = validateOrder.validateQuantity(itens);
    if (validQuantity != null) return validQuantity;

    const validateItem = validateOrder.validateExtraItem(itens);
    if (validateItem != null) return validateItem;

    if (metodoDePagamento === "dinheiro")
      return `R$ ${paymentOrder.payment(itens, "dinheiro", 0.05)}`;
    if (metodoDePagamento === "debito")
      return `R$ ${paymentOrder.payment(itens)}`;
    if (metodoDePagamento === "credito")
      return `R$ ${paymentOrder.payment(itens, "credito", 0.03)}`;
  }
}

export { CaixaDaLanchonete };

const caixa = new CaixaDaLanchonete().calcularValorDaCompra("dinheiro", [
  "chantily,1",
  "cafe,1",
]);
console.log(caixa);
