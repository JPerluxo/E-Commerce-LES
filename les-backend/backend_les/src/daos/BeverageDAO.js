const Beverage = require('../models/beverage');
const Category = require('../models/category');

class BeverageDAO {
    static async findAll(transaction = null) {
        try {
            return await Beverage.findAll({
                include: [{
                    model: Category,
                    as: 'categories',
                    attributes: ['description'],
                    through: { attributes: [] }
                }],
                transaction
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BeverageDAO;
