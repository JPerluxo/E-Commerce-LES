const sequelize = require("../config/dbConfig");
const BeverageDAO = require('../daos/BeverageDAO');

class GetBeveragesStategy {
    static async execute() {
        const transaction = await sequelize.transaction();
        try {
            const data = await BeverageDAO.findAll()

            await transaction.commit();
            return data.map(beverage => {
                const categoriesDescriptions = beverage.categories.map(category => category.description);
                return { ...beverage.toJSON(), categories: categoriesDescriptions };
            });
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = GetBeveragesStategy;
