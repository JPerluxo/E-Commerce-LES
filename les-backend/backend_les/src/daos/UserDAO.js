const User = require('../models/user');

class UserDAO {
    static async save(data, transaction = null) {
        try {
            return await User.create(data, { transaction });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserDAO;
