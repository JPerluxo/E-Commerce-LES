const UserDAO = require('../daos/UserDAO');

class ValidateUserIdStrategy {
    static async execute(data) {
        try {
            const userId = parseInt(data.userId, 10);

            if (!userId) {
                throw new Error("O Identificador do cliente é obrigatório");
            }

            const existingUsers = await UserDAO.findAll().then(users => users.map(user => user.id));
            if (isNaN(userId) || !existingUsers.includes(userId)) {
                throw new Error('O Identificador do cliente deve ter um valor válido.');
            }
        } catch (error) {
            throw error.message;
        }
    }
}

module.exports = ValidateUserIdStrategy;