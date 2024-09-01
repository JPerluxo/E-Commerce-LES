const Phone = require('../models/phone');

class PhoneDAO {
    static async save(data, userId, transaction = null) {
        try {
            return await Phone.create({...data, userId: userId}, { transaction });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PhoneDAO;
