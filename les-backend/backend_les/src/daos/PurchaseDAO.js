const Purchase = require('../models/purchase');

class PurchaseDAO {
    static async save(data, transaction = null) {
        try {
            return await Purchase.create(data, { transaction });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PurchaseDAO;
