const sequelize = require("../config/dbConfig");
const UserDAO = require('../daos/UserDAO');

class GetUsersTableStrategy {
    static async execute() {
        const transaction = await sequelize.transaction();
        try {
            const data = {
                collumns: ["ID", "NOME COMPLETO", "CPF", "ATIVO", "AÇÃO"],
                rows: await UserDAO.findAll()
            }

            await transaction.commit();
            return { status: 200, data: data };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = GetUsersTableStrategy;
