const sequelize = require("../config/dbConfig");
const PhoneDAO = require('../daos/PhoneDAO');

class CheckPhonesIfExistsStrategy {
    static async execute(data, userId) {
        const transaction = await sequelize.transaction();
        try {
            const existingPhones = await PhoneDAO.find('tel_cli_id', userId, transaction);

            const existingPhonesMap = new Map(existingPhones.map(phone => [phone.id, phone]));
            const dataPhonesMap = new Map(data.map(phone => [phone.id, phone]));

            for (const [id, phone] of existingPhonesMap) {
                if (!dataPhonesMap.has(id)) {
                    await PhoneDAO.delete('id', id, transaction);
                }
            }

            for (const [id, phone] of dataPhonesMap) {
                if (!existingPhonesMap.has(id)) {
                    const { id: _, ...phoneWithoutId } = phone;
                    const phoneData = await PhoneDAO.save(phoneWithoutId, userId, transaction);
                    phone.id = phoneData.id;
                }
            }

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw `Telefones — ${error.message}`;
        }
    }
}

module.exports = CheckPhonesIfExistsStrategy;