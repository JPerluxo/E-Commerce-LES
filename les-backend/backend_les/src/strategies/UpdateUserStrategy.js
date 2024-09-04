const sequelize = require("../config/dbConfig");
const UserDAO = require('../daos/UserDAO');
const PhoneDAO = require('../daos/PhoneDAO');
const AddressDAO = require('../daos/AddressDAO');
const CreditCardDAO = require('../daos/CreditCardDAO');

class UpdateUserStrategy {
    static async execute(data) {
        const transaction = await sequelize.transaction();
        try {
            await UserDAO.update(data, transaction);

            for(const phone of data.phones) await PhoneDAO.update(phone, transaction);

            for(const address of data.addresses) await AddressDAO.update(address, transaction);

            for(const creditCard of data.creditCards) await CreditCardDAO.update(creditCard, transaction);

            await transaction.commit();
            return { status: 200, message: `Usuário ${data.id} alterado com sucesso!` };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = UpdateUserStrategy;
