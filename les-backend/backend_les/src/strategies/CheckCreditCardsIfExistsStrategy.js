const sequelize = require("../config/dbConfig");
const CreditCardDAO = require('../daos/CreditCardDAO');

class CheckCreditCardsIfExistsStrategy {
    static async execute(data, userId) {
        const transaction = await sequelize.transaction();
        try {
            const existingCreditCards = await CreditCardDAO.find('crt_cli_id', userId, transaction);

            const existingCreditCardsMap = new Map(existingCreditCards.map(creditCard => [creditCard.id, creditCard]));
            const dataCreditCardsMap = new Map(data.map(creditCard => [creditCard.id, creditCard]));

            for (const [id, creditCard] of existingCreditCardsMap) {
                if (!dataCreditCardsMap.has(id)) {
                    await CreditCardDAO.delete('id', id, transaction);
                }
            }

            for (const [id, creditCard] of dataCreditCardsMap) {
                if (!existingCreditCardsMap.has(id)) {
                    const { id: _, ...creditCardWithoutId } = creditCard;
                    const creditCardData = await CreditCardDAO.save(creditCardWithoutId, userId, transaction);
                    creditCard.id = creditCardData.id;
                }
            }

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw `Cartões de Crédito — ${error.message}`;
        }
    }
}

module.exports = CheckCreditCardsIfExistsStrategy;