const GetPurchasesTableStrategy = require('../strategies/GetPurchasesTableStrategy');

class PurchaseService {
    static async getPurchasesTable() {
        try {
            return await GetPurchasesTableStrategy.execute();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PurchaseService;
