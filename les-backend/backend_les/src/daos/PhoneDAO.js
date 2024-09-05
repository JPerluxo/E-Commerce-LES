const Phone = require('../models/phone');

class PhoneDAO {
    static async save(data, userId, transaction = null) {
        try {
            return await Phone.create({...data, userId: userId}, { transaction });
        } catch (error) {
            throw error;
        }
    }

    static async update(data, transaction = null) {
        try {
            const { id, ...fieldsToUpdate } = data;
            return await Phone.update(fieldsToUpdate, {
                where: { id: id },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async delete(userId, transaction = null) {
        try {
            return await Phone.destroy({
                where: { tel_cli_id: userId },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PhoneDAO;
