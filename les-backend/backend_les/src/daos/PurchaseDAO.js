const Purchase = require('../models/purchase');

class PurchaseDAO {
    static async save(data, transaction = null) {
        try {
            return await Purchase.create(data, { transaction });
        } catch (error) {
            throw error;
        }
    }

    static async find(field, value, transaction = null) {
        try {
            return await Purchase.findAll({
                where: { [field]: value },
                transaction
            }).then(purchases => purchases.map(purchase => {
                const { userId, ...purchaseWithoutUserId } = purchase.toJSON();
                return purchaseWithoutUserId;
            }));
        } catch (error) {
            throw error;
        }
    }

    static async delete(id, transaction = null) {
        try {
            return await Purchase.destroy({
                where: { id: id },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PurchaseDAO;
