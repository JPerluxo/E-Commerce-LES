const sequelize = require("../config/dbConfig");
const AddressDAO = require('../daos/AddressDAO');

class CheckAddressesIfExistsStrategy {
    static async execute(data, userId) {
        const transaction = await sequelize.transaction();
        try {
            const existingAddresses = await AddressDAO.find('end_cli_id', userId, transaction);

            const existingAddressesMap = new Map(existingAddresses.map(address => [address.id, address]));
            const dataAddressesMap = new Map(data.map(address => [address.id, address]));

            for (const [id, address] of existingAddressesMap) {
                if (!dataAddressesMap.has(id)) {
                    await AddressDAO.delete('id', id, transaction);
                }
            }

            for (const [id, address] of dataAddressesMap) {
                if (!existingAddressesMap.has(id)) {
                    const { id: _, ...addressWithoutId } = address;
                    const addressData = await AddressDAO.save(addressWithoutId, userId, transaction);
                    address.id = addressData.id;
                }
            }

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw `Endereços — ${error.message}`;
        }
    }
}

module.exports = CheckAddressesIfExistsStrategy;