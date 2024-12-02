const sequelize = require("../config/dbConfig");
const PurchaseDAO = require('../daos/PurchaseDAO');
const BeverageDAO = require('../daos/BeverageDAO');
const UserDAO = require('../daos/UserDAO');

class GetPurchasesTableStrategy {
    static async execute() {
        const transaction = await sequelize.transaction();
        try {
            const rows = [];

            for (const purchase of await PurchaseDAO.findAll()) {
                const beverageLabel = (await BeverageDAO.findById(purchase.beverageId, transaction)).label;
                const userName = (await UserDAO.findById(purchase.userId, transaction)).name;

                rows.push({
                    id: purchase.id,
                    beverage: beverageLabel,
                    quantity: purchase.beverageQuantity,
                    purchaseDate: purchase.purchaseDate,
                    purchaseValue: purchase.purchaseValue,
                    purchaseStatus: purchase.purchaseStatus,
                    userName: userName,
                });
            }

            await transaction.commit();
            return {
                status: 200,
                data: {
                    collumns: ["ID", "PRODUTO", "QUANTIDADE", "DATA", "VALOR", "CLIENTE", "STATUS DA COMPRA"],
                    rows: rows,
                },
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = GetPurchasesTableStrategy;
