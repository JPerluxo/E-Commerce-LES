const UserDAO = require('../daos/UserDAO');
const BeverageDAO = require('../daos/BeverageDAO');

class ValidateCartObjectStrategy {
    static async execute(cartObject) {
        try {
            const missingFields = ['beverageId', 'beverageQuantity', 'purchaseStatus', 'purchaseValue', 'userId'].filter(field => !(field in cartObject));

            if (missingFields.length > 0) {
                throw new Error(`Os seguintes campos estão faltando: ${missingFields.join(', ')}.`);
            }

            if (!cartObject.beverageId || !cartObject.beverageQuantity || !cartObject.purchaseStatus || !cartObject.purchaseValue || !cartObject.userId) {
                throw new Error('Todos os campos obrigatórios devem estar preenchidos.');
            }
            
            const existingBeverages = await BeverageDAO.findAll().then(beverages => beverages.map(beverage => beverage.id));
            const beverageId = parseInt(cartObject.beverageId, 10);
            if (isNaN(beverageId) || !existingBeverages.includes(beverageId)) {
                throw new Error('O campo "Identificador da bebida" deve ter um valor válido.');
            }

            const beverageQuantity = parseInt(cartObject.beverageQuantity, 10);
            if (isNaN(beverageQuantity) || beverageQuantity <= 0) {
                throw new Error('O campo "Quantidade" deve ter um valor válido.');
            }

            const purchaseStatus = parseInt(cartObject.purchaseStatus, 10);
            if (isNaN(purchaseStatus) || ![1, 2, 3, 4, 5].includes(purchaseStatus)) {
                throw new Error('O campo "Status da compra" deve ter um valor válido.');
            }

            const purchaseValue = parseFloat(cartObject.purchaseValue, 10);
            if (isNaN(purchaseValue) || purchaseValue <= 0) {
                throw new Error('O campo "Valor da bebida" deve ter um valor válido.');
            }

            const existingUsers = await UserDAO.findAll().then(users => users.map(user => user.id));
            const userId = parseInt(cartObject.userId, 10);
            if (isNaN(userId) || !existingUsers.includes(userId)) {
                throw new Error('O campo "Identificador do cliente" deve ter um valor válido.');
            }
        } catch (error) {
            if (cartObject.beverageId) {
                const beverage = await BeverageDAO.findById(cartObject.beverageId);
                error.beverageLabel = beverage?.toJSON()?.label || "produto";
            } else {
                error.beverageLabel = "produto";
            }
            throw error;
        }
    }
}

module.exports = ValidateCartObjectStrategy;