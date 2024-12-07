const sequelize = require("../config/dbConfig");
const CouponDAO = require("../daos/CouponDAO");
const PurchaseDAO = require("../daos/PurchaseDAO");

class RequestExchangeAndReturnStrategy {
    static async execute(requestObject) {
        const transaction = await sequelize.transaction();
        try {
            const existingPurchase = await PurchaseDAO.findById(requestObject.purchaseId, transaction);
            const couponCode = `${existingPurchase.id}${existingPurchase.purchaseDate.replace(/-/g, '')}`;

            const couponObj = {
                code: `${requestObject.type == "Exchange" ? "TROCA" : "DEVOLUCAO"}${couponCode}`,
                value: existingPurchase.purchaseValue,
                isUsed: false,
                type: (() => {switch(requestObject.type) {
                    case "Exchange":
                        return "Troca"

                    case "Return":
                        return "Devolução"
                }})(),
                userId: existingPurchase.userId
            }

            await CouponDAO.save(couponObj, transaction);
            await transaction.commit();
            return { status: 200, message: `${requestObject.type == "Exchange" ? "Troca" : "Devolução"} solicitada com sucesso!` };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = RequestExchangeAndReturnStrategy;
