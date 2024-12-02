const PurchaseDAO = require('../daos/PurchaseDAO');

class ValidatePurchaseObjectStrategy {
    static async execute(purchaseObject) {
        try {
            const missingFields = ['purchaseId', 'purchaseStatus'].filter(field => !(field in purchaseObject));

            if (missingFields.length > 0) {
                throw new Error(`Os seguintes campos estão faltando: ${missingFields.join(', ')}.`);
            }

            const existingPurchase = await PurchaseDAO.find("cpr_id", purchaseObject.purchaseId);
            if (!existingPurchase[0]) {
                throw new Error('O Identificador do produto deve ter um valor válido.');
            }
            else if (existingPurchase[0].purchaseStatus == purchaseObject.purchaseStatus) {
                throw new Error('O campo "Status da compra" não pode ser o mesmo pré-registrado.');
            }

            const purchaseStatus = parseInt(purchaseObject.purchaseStatus, 10);
            if (isNaN(purchaseStatus) || ![1, 2, 3, 4, 5].includes(purchaseStatus)) {
                throw new Error('O campo "Status da compra" deve ter um valor válido.');
            }

        } catch (error) {
            throw error;
        }
    }
}

module.exports = ValidatePurchaseObjectStrategy;