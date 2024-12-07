const PurchaseDAO = require('../daos/PurchaseDAO');
const CouponDAO = require('../daos/CouponDAO');

class ValidateRequestObjectStrategy {
    static async execute(requestObject) {
        try {
            const missingFields = ['purchaseId', 'type'].filter(field => !(field in requestObject));

            if (missingFields.length > 0) {
                throw new Error(`Os seguintes campos estão faltando: ${missingFields.join(', ')}.`);
            }

            const existingPurchase = (await PurchaseDAO.find("cpr_id", requestObject.purchaseId))[0];
            if (!existingPurchase) {
                throw new Error('O Identificador do produto deve ter um valor válido.');
            }
            else {
                const couponCode = `${existingPurchase.id}${existingPurchase.purchaseDate.replace(/-/g, '')}`;
                if (await CouponDAO.checkCouponCode(couponCode)) {
                    throw new Error('Uma operação de troca/devolução já foi solicitada para a compra.');
                }
            }

            if (typeof requestObject.type !== 'string' || (requestObject.type !== "Exchange" && requestObject.type !== "Return")) {
                throw new Error('O tipo da solicitação deve ter um valor válido.');
            }

        } catch (error) {
            throw error;
        }
    }
}

module.exports = ValidateRequestObjectStrategy;