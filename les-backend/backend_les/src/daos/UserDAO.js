const User = require('../models/user');

class UserDAO {
    static async save(data, transaction = null) {
        try {
            return await User.create(data, { transaction });
        } catch (error) {
            throw error;
        }
    }

    static async update(data, transaction = null) {
        try {
            const { id, ...fieldsToUpdate } = data;
            return await User.update(fieldsToUpdate, {
                where: { id: id },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserDAO;
