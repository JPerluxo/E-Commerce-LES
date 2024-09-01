const CreditCard = require('../models/creditCard');

class CreditCardDAO {
    static async save(data, userId, transaction = null) {
        try {
            return await CreditCard.create({...data, userId: userId}, { transaction });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CreditCardDAO;
