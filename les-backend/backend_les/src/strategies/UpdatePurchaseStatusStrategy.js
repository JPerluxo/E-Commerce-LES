const sequelize = require("../config/dbConfig");
const PurchaseDAO = require('../daos/PurchaseDAO');

class UpdatePurchaseStatusStrategy {
    static async execute(purchaseObject) {
        const transaction = await sequelize.transaction();
        try {
            const purchaseData = await PurchaseDAO.find("cpr_id", purchaseObject.purchaseId, transaction);

            await PurchaseDAO.update({...purchaseData[0], "purchaseStatus": purchaseObject.purchaseStatus}, transaction);

            await transaction.commit();
            return { status: 200, message: 'Status da compra alterado com sucesso!' };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = UpdatePurchaseStatusStrategy;
