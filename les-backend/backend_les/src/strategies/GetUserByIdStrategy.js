const sequelize = require("../config/dbConfig");
const UserDAO = require('../daos/UserDAO');
const PhoneDAO = require('../daos/PhoneDAO');
const AddressDAO = require('../daos/AddressDAO');
const CreditCardDAO = require('../daos/CreditCardDAO');

class GetUserByIdStrategy {
    static async execute(userId) {
        const transaction = await sequelize.transaction();
        try {
            const user = await UserDAO.findById(userId, transaction);

            const userPhones = await PhoneDAO.find('tel_cli_id', userId, transaction);

            const userAddresses = await AddressDAO.find('end_cli_id', userId, transaction);

            const userCreditCards = await CreditCardDAO.find('crt_cli_id', userId, transaction);

            const data = {...user.dataValues, phones: userPhones, addresses: userAddresses, creditCards: userCreditCards}

            await transaction.commit();
            return { status: 200, data: data };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = GetUserByIdStrategy;
