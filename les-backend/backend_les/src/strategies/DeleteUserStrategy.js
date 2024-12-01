const sequelize = require("../config/dbConfig");
const UserDAO = require('../daos/UserDAO');
const PhoneDAO = require('../daos/PhoneDAO');
const AddressDAO = require('../daos/AddressDAO');
const CreditCardDAO = require('../daos/CreditCardDAO');
const PurchaseDAO = require('../daos/PurchaseDAO');
const PaymentMethodDAO = require('../daos/PaymentMethodDAO');
const CouponDAO = require('../daos/CouponDAO');

class DeleteUserStrategy {
    static async execute(userId) {
        const transaction = await sequelize.transaction();
        try {
            (await CouponDAO.find("cpd_cli_id", userId, transaction)).map(async coupon => {
                await PaymentMethodDAO.delete("mpg_cpd_id", coupon.id, transaction);

                await CouponDAO.delete("cpd_id", coupon.id, transaction);
            });

            (await PurchaseDAO.find("cpr_cli_id", userId, transaction)).map(async purchase => {
                await PaymentMethodDAO.delete("mpg_cpr_id", purchase.id, transaction);

                await PurchaseDAO.delete(purchase.id, transaction);
            });

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
