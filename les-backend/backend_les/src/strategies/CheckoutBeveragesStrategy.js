const sequelize = require("../config/dbConfig");
const PurchaseDAO = require('../daos/PurchaseDAO');
const CouponDAO = require('../daos/CouponDAO');
const PaymentMethodDAO = require('../daos/PaymentMethodDAO');

class CheckoutBeveragesStrategy {
    static async execute(checkoutObject) {
        const transaction = await sequelize.transaction();
        try {
            const products = checkoutObject.products;
            const creditCards = checkoutObject.paymentMethods.creditCards;
            const coupons = checkoutObject.paymentMethods.coupons;

            for (const product of products) {
                for (const creditCardId of creditCards) {
                    await PaymentMethodDAO.save({
                        "purchaseId": product.checkoutId,
                        "creditCardId": creditCardId,
                        "couponId": null
                    },
                    transaction);
                }

                const existingCheckoutItem = (await PurchaseDAO.find("cpr_id", product.checkoutId))[0];
                if (existingCheckoutItem) {

                    for (const couponId of coupons) {
                        
                        await PaymentMethodDAO.save({
                            "purchaseId": product.checkoutId,
                            "creditCardId": null,
                            "couponId": couponId
                        },
                        transaction);
                        
                        const couponObj = await CouponDAO.findById(couponId);
                        existingCheckoutItem.purchaseValue -= parseFloat(couponObj.value);
                        if (existingCheckoutItem.purchaseValue <= 0) throw new Error('O campo "Valor da bebida" deve ter um valor válido.');
                        if (!couponObj.isUsed) await CouponDAO.update({...couponObj, "isUsed": true}, transaction);
                    }
 
                    await PurchaseDAO.update({
                        ...existingCheckoutItem,
                        "purchaseDate": product.checkoutDate,
                        "purchaseStatus": product.checkoutStatus,
                        "purchaseDeliveryAddress": product.deliveryAddress,
                        "purchaseBillingAddress": product.BillingAddress
                    }, transaction);
                }
                else throw new Error(`O produto ${product.beverageId} não foi encontrado no carrinho.`);
            }
            
            await transaction.commit();
            return { status: 200, message: 'Compra processada com sucesso!' };
        } catch (error) {
            await transaction.rollback();
            throw error.message;
        }
    }
}

module.exports = CheckoutBeveragesStrategy;