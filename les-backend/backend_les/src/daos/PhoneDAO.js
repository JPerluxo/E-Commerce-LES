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

    static async delete(field, value, transaction = null) {
        try {
            return await Phone.destroy({
                where: { [field]: value },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async find(field, value, transaction = null) {
        try {
            return await Phone.findAll({
                where: { [field]: value },
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
