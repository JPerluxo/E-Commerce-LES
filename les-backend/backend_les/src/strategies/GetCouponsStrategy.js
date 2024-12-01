const sequelize = require("../config/dbConfig");
const CouponDAO = require('../daos/CouponDAO');
const UserDAO = require('../daos/UserDAO');

class GetCouponsStrategy {
    static async execute(userId) {
        const transaction = await sequelize.transaction();
        try {
            userId = parseInt(userId, 10);

            if (!userId) {
                throw new Error("O Identificador do cliente é obrigatório");
            }

            const existingUsers = await UserDAO.findAll().then(users => users.map(user => user.id));
            if (isNaN(userId) || !existingUsers.includes(userId)) {
                throw new Error('O Identificador do cliente deve ter um valor válido.');
            }

            const data = (await CouponDAO.find("cpd_cli_id", userId, transaction)).map(coupon => {
                return {
                    id: coupon.id,
                    code: coupon.code,
                    value: coupon.value,
                    hasBeenUsed: coupon.isUsed,
                    type: "Frete Grátis",
                    userId: userId
                };
            });

            await transaction.commit();
            return { status: 200, data: data };
        } catch (error) {
            await transaction.rollback();
            throw error.message;
        }
    }
}

module.exports = GetCouponsStrategy;
