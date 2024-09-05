const ValidateUserStrategy = require('../strategies/ValidateUserStrategy');
const ValidatePhonesStrategy = require('../strategies/ValidatePhonesStrategy');
const ValidateAddressesStrategy = require('../strategies/ValidateAddressesStrategy');
const ValidateCreditCardsStrategy = require('../strategies/ValidateCreditCardsStrategy');
const SaveUserStrategy = require('../strategies/SaveUserStrategy');
const UpdateUserStrategy = require('../strategies/UpdateUserStrategy');
const CheckUserIfExistsStrategy = require('../strategies/CheckUserIfExistsStrategy');
const DeleteUserStrategy = require('../strategies/DeleteUserStrategy');

class UserService {
    static async saveUser(user) {
        try {
            await ValidateUserStrategy.execute(user);
            await ValidatePhonesStrategy.execute(user.phones);
            await ValidateAddressesStrategy.execute(user.addresses);
            await ValidateCreditCardsStrategy.execute(user.creditCards);
            return await SaveUserStrategy.execute(user);
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(user) {
        try {
            await ValidateUserStrategy.execute(user);
            await ValidatePhonesStrategy.execute(user.phones);
            await ValidateAddressesStrategy.execute(user.addresses);
            await ValidateCreditCardsStrategy.execute(user.creditCards);
            return await UpdateUserStrategy.execute(user);
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(userId) {
        try {
            await CheckUserIfExistsStrategy.execute(userId);
            return await DeleteUserStrategy.execute(userId);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
