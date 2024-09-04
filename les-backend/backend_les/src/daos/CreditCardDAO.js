const CreditCard = require('../models/creditCard');

class CreditCardDAO {
    static async save(data, userId, transaction = null) {
        try {
            return await CreditCard.create({...data, userId: userId}, { transaction });
        } catch (error) {
            throw error;
        }
    }

    static async update(data, transaction = null) {
        try {
            const { id, ...fieldsToUpdate } = data;
            return await CreditCard.update(fieldsToUpdate, {
                where: { id: id },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CreditCardDAO;
