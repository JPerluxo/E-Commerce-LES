const UserDAO = require('../daos/UserDAO');
const AddressDAO = require('../daos/AddressDAO');
const PurchaseDAO = require('../daos/PurchaseDAO');

class ValidateCheckoutProductsStrategy {
    static async execute(checkoutObject) {
        try {
            if (!checkoutObject.products || checkoutObject.products.length === 0) {
                throw new Error('O campo "Products" é obrigatório.');
            }
            
            for (const product of checkoutObject.products) {
                const missingFields = ['checkoutId', 'checkoutDate', 'checkoutStatus', 'userId', 'deliveryAddress', 'BillingAddress'].filter(field => !(field in product));
                
                if (missingFields.length > 0) {
                    throw new Error(`Os seguintes campos estão faltando no campo "Products": ${missingFields.join(', ')}.`);
                }
                
                if (!product.checkoutId || !product.checkoutDate || !product.checkoutStatus || !product.userId || !product.deliveryAddress || !product.BillingAddress) {
                    throw new Error('Todos os campos obrigatórios devem estar preenchidos.');
                }
                
                const existingUsers = await UserDAO.findAll().then(users => users.map(user => user.id));
                const userId = parseInt(product.userId, 10);
                if (isNaN(userId) || !existingUsers.includes(userId)) {
                    throw new Error('O campo "Identificador do cliente" deve ter um valor válido.');
                }

                const existingPurchases = await PurchaseDAO.find("cpr_cli_id", userId);
                const checkoutId = parseInt(product.checkoutId, 10);
                if (isNaN(checkoutId) || !existingPurchases.map(purchase => purchase.id).includes(checkoutId)) {
                    throw new Error('O Identificador da compra deve ter um valor válido.');
                }
                
                const checkoutDate = product.checkoutDate;
                if (typeof checkoutDate !== 'string' || isNaN(Date.parse(checkoutDate))) {
                    throw new Error('O campo "checkoutDate" deve ter um valor válido.');
                }

                const checkoutStatus = parseInt(product.checkoutStatus, 10);
                if (isNaN(checkoutStatus) || ![1, 2, 3, 4, 5].includes(checkoutStatus)) {
                    throw new Error('O campo "checkoutStatus" deve ter um valor válido.');
                }

                const userAddresses = await AddressDAO.find('end_cli_id', userId).then(addresses => addresses.map(address => address.id));
                const deliveryAddress = parseInt(product.deliveryAddress, 10);
                if (isNaN(deliveryAddress) || !userAddresses.includes(deliveryAddress)) {
                    throw new Error('O endereço de entrega deve ter um valor válido.');
                }

                const BillingAddress = parseInt(product.BillingAddress, 10);
                if (isNaN(BillingAddress) || !userAddresses.includes(BillingAddress)) {
                    throw new Error('O endereço de cobrança deve ter um valor válido.');
                }
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ValidateCheckoutProductsStrategy;