const Address = require('../models/address');

class AddressDAO {
    static async save(data, userId, transaction = null) {
        try {
            return await Address.create({...data, userId: userId}, { transaction });
        } catch (error) {
            throw error;
        }
    }

    static async update(data, transaction = null) {
        try {
            const { id, ...fieldsToUpdate } = data;
            return await Address.update(fieldsToUpdate, {
                where: { id: id },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async delete(userId, transaction = null) {
        try {
            return await Address.destroy({
                where: { end_cli_id: userId },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AddressDAO;
