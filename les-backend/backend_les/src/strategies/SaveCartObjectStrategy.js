const sequelize = require("../config/dbConfig");
const BeverageDAO = require('../daos/BeverageDAO');
const PurchaseDAO = require('../daos/PurchaseDAO');

class SaveCartObjectStrategy {
    static async execute(cartObject) {
        const transaction = await sequelize.transaction();
        const beverage = await BeverageDAO.findById(cartObject.beverageId);
        try {
            cartObject.purchaseDate = null;
            cartObject.purchaseDeliveryAddress = null;
            cartObject.purchaseBillingAddress = null;
            cartObject.purchaseValue *= cartObject.beverageQuantity;

            const existingCartItem = (await PurchaseDAO.find("cpr_cli_id", cartObject.userId)).find(cartItem => cartItem.purchaseStatus === parseInt(cartObject.purchaseStatus) && cartItem.beverageId === cartObject.beverageId);
            if (existingCartItem) {
                await PurchaseDAO.update({...existingCartItem, "beverageQuantity": (parseInt(existingCartItem.beverageQuantity) + parseInt(cartObject.beverageQuantity))}, transaction);
            }

            else await PurchaseDAO.save(cartObject, transaction);
            await transaction.commit();
            return { status: 200, message: `${beverage?.toJSON()?.label} adicionado ao carrinho!` };
        } catch (error) {
            await transaction.rollback();
            if (cartObject.beverageId) {
                error.beverageLabel = beverage?.toJSON()?.label || "produto";
            } else {
                error.beverageLabel = "produto";
            }
            throw error;
        }
    }
}

module.exports = SaveCartObjectStrategy;
