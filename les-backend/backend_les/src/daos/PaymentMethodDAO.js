const PaymentMethod = require('../models/paymentMethod');

class PaymentMethodDAO {
    static async save(data, transaction = null) {
        try {
            return await PaymentMethod.create(data, { transaction });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PaymentMethodDAO;
