const Phone = require('../models/phone');

class PhoneDAO {
    static async save(data, userId, transaction = null) {
        try {
            return await Phone.create({...data, userId: userId}, { transaction });
        } catch (error) {
            throw error;
        }
    }

    static async update(data, transaction = null) {
        try {
            const { id, ...fieldsToUpdate } = data;
            return await Phone.update(fieldsToUpdate, {
                where: { id: id },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async delete(userId, transaction = null) {
        try {
            return await Phone.destroy({
                where: { tel_cli_id: userId },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async findByUserId(userId, transaction = null) {
        try {
            return await Phone.findAll({
                where: { tel_cli_id: userId },
                transaction
            }).then(phones => phones.map(phone => {
                const { userId, ...phoneWithoutUserId } = phone.toJSON();

                switch(phoneWithoutUserId.type) {
                    case "Celular":
                        phoneWithoutUserId.type = 1;
                        break;

                    case "Fixo":
                        phoneWithoutUserId.type = 2;
                        break;
                }

                return phoneWithoutUserId;
            }));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PhoneDAO;
