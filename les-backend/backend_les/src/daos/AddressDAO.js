const Address = require('../models/address');

class AddressDAO {
    static async save(data, userId, transaction = null) {
        try {
            return await Address.create({...data, userId: userId}, { transaction });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AddressDAO;
