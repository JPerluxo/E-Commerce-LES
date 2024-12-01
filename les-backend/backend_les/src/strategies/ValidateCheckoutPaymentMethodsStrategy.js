const CreditCardDAO = require('../daos/CreditCardDAO');
const CouponDAO = require('../daos/CouponDAO');

class ValidateCheckoutPaymentMethodsStrategy {
    static async execute(checkoutObject) {
        const { paymentMethods, products } = checkoutObject;

        if (!paymentMethods || Object.keys(paymentMethods).length === 0) {
            throw new Error('O campo "PaymentMethods" é obrigatório e não pode estar vazio.');
        }

        if (!Array.isArray(paymentMethods.creditCards)) {
            throw new Error('O campo "CreditCards" em "PaymentMethods" é obrigatório e deve ser um array.');
        }

        if (!Array.isArray(paymentMethods.coupons)) {
            throw new Error('O campo "Coupons" em "PaymentMethods" é obrigatório e deve ser um array.');
        }

        const userId = products[0].userId;

        await ValidateCheckoutPaymentMethodsStrategy.validateIds(
            paymentMethods.creditCards,
            await CreditCardDAO.find("crt_cli_id", userId),
            "cartões de crédito"
        );

        await ValidateCheckoutPaymentMethodsStrategy.validateIds(
            paymentMethods.coupons,
            await CouponDAO.find("cpd_cli_id", userId),
            "cupons de desconto"
        );
    }

    static async validateIds(idsToCheck, userItems, itemType) {
        const userItemIds = userItems.map(item => item.id);
        const missingItems = idsToCheck.filter(id => !userItemIds.includes(id));

        if (missingItems.length > 0) {
            throw new Error(`Os seguintes ${itemType} estão inválidos: ${missingItems.join(", ")}`);
        }
    }
}

module.exports = ValidateCheckoutPaymentMethodsStrategy;