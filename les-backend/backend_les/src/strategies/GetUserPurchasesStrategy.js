const sequelize = require("../config/dbConfig");
const PurchaseDAO = require('../daos/PurchaseDAO');
const BeverageDAO = require('../daos/BeverageDAO');
const CouponDAO = require('../daos/CouponDAO');

class GetPurchasesTableStrategy {
    static async execute(userId) {
        const transaction = await sequelize.transaction();
        try {
            const rows = [];

            for (const purchase of await PurchaseDAO.find("cpr_cli_id", userId)) {
                const beverageLabel = (await BeverageDAO.findById(purchase.beverageId, transaction)).label;

                rows.push({
                    id: purchase.id,
                    beverage: beverageLabel,
                    quantity: purchase.beverageQuantity,
                    purchaseDate: purchase.purchaseDate,
                    purchaseValue: `R$${purchase.purchaseValue}`,
                    purchaseStatus: (() => {switch(purchase.purchaseStatus) {
                        case 2:
                            return "Pagamento Realizado"

                        case 3:
                            return "Pagamento Rejeitado"

                        case 4:
                            return "Em transporte"

                        case 5:
                            return "Compra Finalizada"

                        default:
                            throw new error(`Status da compra ${purchase.id} inválido.`)
                    }})(),
                    hasBeenConsumed: await this.checkConsumed(purchase.id, purchase.purchaseDate),
                });
            }

            await transaction.commit();
            return {
                status: 200,
                data: {
                    collumns: ["PRODUTO", "QUANTIDADE", "DATA", "VALOR", "STATUS DA COMPRA", "AÇÃO"],
                    rows: rows,
                },
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    static async checkConsumed(purchaseId, purchaseDate) {
        const couponCode = `${purchaseId}${purchaseDate.replace(/-/g, '')}`;
        return await CouponDAO.checkCouponCode(couponCode);
    }
}

module.exports = GetPurchasesTableStrategy;
