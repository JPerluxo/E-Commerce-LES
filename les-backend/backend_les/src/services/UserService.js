const SaveUserStrategy = require('../strategies/SaveUserStrategy');

class UserService {
    static async saveUser(user) {
        try {
            return await SaveUserStrategy.execute(user);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
