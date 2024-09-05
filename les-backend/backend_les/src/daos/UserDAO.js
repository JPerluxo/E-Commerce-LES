const User = require('../models/user');

class UserDAO {
    static async save(data, transaction = null) {
        try {
            return await User.create(data, { transaction });
        } catch (error) {
            throw error;
        }
    }

    static async update(data, transaction = null) {
        try {
            const { id, ...fieldsToUpdate } = data;
            return await User.update(fieldsToUpdate, {
                where: { id: id },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async delete(id, transaction = null) {
        try {
            return await User.destroy({
                where: { id: id },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async findById(id, transaction = null) {
        try {
            return await User.findByPk(id, {
                transaction
            }).then(userData => {
                switch(userData.gender) {
                    case "Masculino":
                        userData.gender = 1;
                        break;

                    case "Feminino":
                        userData.gender = 2;
                        break;

                    case "Não informado":
                        userData.gender = 3;
                        break;
                }

                return userData;
            });
        } catch (error) {
            throw error;
        }
    }

    static async findAll(transaction = null) {
        try {
            return await User.findAll({
                attributes: ['id', 'name', 'cpf', 'isActive'],
                transaction
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserDAO;
