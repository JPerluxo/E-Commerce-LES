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

    static async delete(field, value, transaction = null) {
        try {
            return await CreditCard.destroy({
                where: { [field]: value },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async find(field, value, transaction = null) {
        try {
            return await CreditCard.findAll({
                where: { [field]: value },
                transaction
            }).then(creditCards => creditCards.map(creditCard => {
                const { userId, ...creditCardWithoutUserId } = creditCard.toJSON();
                return creditCardWithoutUserId;
            }));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CreditCardDAO;
