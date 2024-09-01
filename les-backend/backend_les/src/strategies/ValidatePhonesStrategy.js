class ValidatePhonesStrategy {
    static async execute(data) {
        try {
            if (!Array.isArray(data)) {
                throw new Error('O campo "phones" deve ser uma lista de objetos.');
            }

            data.forEach(phone => {
                const missingFields = ['number', 'type', 'ddd'].filter(field => !(field in phone));
                if (missingFields.length > 0) {
                    throw new Error(`Os seguintes campos estão faltando no telefone: ${missingFields.join(', ')}.`);
                }

                if (typeof phone.number !== 'string' || !/^\d{8,9}$/.test(phone.number)) {
                    throw new Error('O campo "Número" deve ser uma string de 8 ou 9 dígitos.');
                }

                if (typeof phone.type !== 'number' || ![1, 2].includes(phone.type)) {
                    throw new Error('O campo "Tipo" deve ter um valor válido.');
                }
                else switch(phone.type) {
                    case 1: {
                        phone.type = "Celular";
                        break;
                    }    
    
                    case 2: {
                        phone.type = "Fixo";
                        break;
                    } 
                }

                if (typeof phone.ddd !== 'string' || !/^\d{2}$/.test(phone.ddd)) {
                    throw new Error('O campo "DDD" deve ser uma string de 2 dígitos.');
                }
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ValidatePhonesStrategy;