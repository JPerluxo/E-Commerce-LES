const sequelize = require("../config/dbConfig");
const PurchaseDAO = require('../daos/PurchaseDAO');

class RemoveCartBeverageStrategy {
    static async execute(beverageObject) {
        const transaction = await sequelize.transaction();
        try {
            if (!beverageObject.beverageId) throw new Error("O Identificador do produto é obrigatório");

            const cartItems = (await PurchaseDAO.find('cpr_cli_id', beverageObject.userId, transaction))
            .filter(cartItem => cartItem.purchaseStatus === 1);

            const cartItem = cartItems.find(cartItem => cartItem.beverageId === beverageObject.beverageId);
            if (!cartItem) throw new Error("Produto não encontrado no carrinho");

            await PurchaseDAO.delete(cartItem.id);
            await transaction.commit();
            return { status: 200, message: `Produto removido do carrinho com sucesso!` };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = RemoveCartBeverageStrategy;
