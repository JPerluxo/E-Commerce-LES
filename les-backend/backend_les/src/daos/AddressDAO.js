const Address = require('../models/address');

class AddressDAO {
    static async save(data, userId, transaction = null) {
        try {
            return await Address.create({...data, userId: userId}, { transaction });
        } catch (error) {
            throw error;
        }
    }

    static async update(data, transaction = null) {
        try {
            const { id, ...fieldsToUpdate } = data;
            return await Address.update(fieldsToUpdate, {
                where: { id: id },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async delete(field, value, transaction = null) {
        try {
            return await Address.destroy({
                where: { [field]: value },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async find(field, value, transaction = null) {
        try {
            return await Address.findAll({
                where: { [field]: value },
                transaction
            }).then(addresses => addresses.map(address => {
                const { userId, ...addressWithoutUserId } = address.toJSON();
                return addressWithoutUserId;
            }));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AddressDAO;
