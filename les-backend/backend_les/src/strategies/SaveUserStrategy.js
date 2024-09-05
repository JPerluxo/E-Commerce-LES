const sequelize = require("../config/dbConfig");
const UserDAO = require('../daos/UserDAO');
const PhoneDAO = require('../daos/PhoneDAO');
const AddressDAO = require('../daos/AddressDAO');
const CreditCardDAO = require('../daos/CreditCardDAO');

class SaveUserStrategy {
    static async execute(data) {
        const transaction = await sequelize.transaction();
        try {
            const userData = await UserDAO.save(data, transaction);

            for(const phone of data.phones) await PhoneDAO.save(phone, userData.id, transaction);

            for(const address of data.addresses) await AddressDAO.save(address, userData.id, transaction);

            for(const creditCard of data.creditCards) await CreditCardDAO.save(creditCard, userData.id, transaction);

            await transaction.commit();
            return { status: 200, message: 'Usuário salvo com sucesso!' };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = SaveUserStrategy;
