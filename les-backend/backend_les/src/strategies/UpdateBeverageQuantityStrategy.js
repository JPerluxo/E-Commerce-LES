const sequelize = require("../config/dbConfig");
const PurchaseDAO = require('../daos/PurchaseDAO');

class UpdateBeverageQuantityStrategy {
    static async execute(data) {
        const transaction = await sequelize.transaction();
        try {
            if (!data.purchaseId) throw new Error("O Identificador do produto é obrigatório");

            const existingPurchases = await PurchaseDAO.find("cpr_cli_id", data.userId, transaction);
            const purchaseId = parseInt(data.purchaseId, 10);
            if (isNaN(purchaseId) || !existingPurchases.map(purchase => purchase.beverageId).includes(purchaseId)) {
                throw new Error('O Identificador do produto deve ter um valor válido.');
            }

            const beverageQuantity = parseInt(data.newQuantity, 10);
            if (isNaN(beverageQuantity) || beverageQuantity <= 0) {
                throw new Error('O valor da quantidade do produto deve ter um valor válido.');
            }

            const purchaseObj = existingPurchases.find(purchase => purchase.beverageId == purchaseId & purchase.purchaseStatus == 1);
            if (purchaseObj.beverageQuantity === beverageQuantity) throw new Error("O valor da quantidade do produto não pode ser o mesmo.");
            
            await PurchaseDAO.update({...purchaseObj, "beverageQuantity": beverageQuantity}, transaction);

            await transaction.commit();
            return { status: 200 };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = UpdateBeverageQuantityStrategy;
