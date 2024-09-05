const User = require('../models/user');

class CheckUserIfExistsStrategy {
    static async execute(userId) {
        try {
            const user = await User.findByPk(userId);
            
            if (!user) throw new Error("Não existe um usuário com o Id especificado.");

            return true;
        } catch (error) {
            throw error.message;
        }
    }
}

module.exports = CheckUserIfExistsStrategy;