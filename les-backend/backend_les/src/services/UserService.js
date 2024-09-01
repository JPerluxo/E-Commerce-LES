const ValidateUserStrategy = require('../strategies/ValidateUserStrategy');
const ValidatePhonesStrategy = require('../strategies/ValidatePhonesStrategy');
const SaveUserStrategy = require('../strategies/SaveUserStrategy');

class UserService {
    static async saveUser(user) {
        try {
            await ValidateUserStrategy.execute(user);
            await ValidatePhonesStrategy.execute(user.phones);
            return await SaveUserStrategy.execute(user);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
