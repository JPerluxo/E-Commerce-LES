const sequelize = require("../config/dbConfig");
const UserDAO = require('../daos/UserDAO');
const PhoneDAO = require('../daos/PhoneDAO');
const AddressDAO = require('../daos/AddressDAO');
const CreditCardDAO = require('../daos/CreditCardDAO');

class DeleteUserStrategy {
    static async execute(userId) {
        const transaction = await sequelize.transaction();
        try {
            await PhoneDAO.delete('tel_cli_id', userId, transaction);

            await AddressDAO.delete('end_cli_id', userId, transaction);

            await CreditCardDAO.delete('crt_cli_id', userId, transaction);

            await UserDAO.delete(userId, transaction);

            await transaction.commit();
            return { status: 200, message: `usuário ${userId} deletado com sucesso!` };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = DeleteUserStrategy;
