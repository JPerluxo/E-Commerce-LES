class ValidateUserStrategy {
    static async execute(data) {
        try {
            const missingFields = ['name', 'gender', 'birthDate', 'cpf', 'isActive', 'password'].filter(field => !(field in data));

            if (missingFields.length > 0) {
                throw new Error(`Os seguintes campos estão faltando: ${missingFields.join(', ')}.`);
            }

            if (!data.name || !data.cpf || data.isActive === undefined || !data.gender || !data.birthDate || !data.password) {
                throw new Error('Todos os campos obrigatórios devem estar preenchidos.');
            }

            if (typeof data.name !== 'string') {
                throw new Error('O campo "Nome completo" deve ser uma string.');
            }

            if (typeof data.cpf !== 'string') {
                throw new Error('O campo "CPF" deve ser uma string.');
            }    
            else if (!/^\d{11}$|^\d{9}-\d{2}$/.test(data.cpf)) {
                throw new Error('O campo "CPF" deve ser uma string de 11 dígitos ou no formato "000000000-00".');
            }

            if (typeof data.isActive !== 'boolean') {
                throw new Error('O campo "Usuário Ativo?" deve ser um booleano.');
            }    

            if (typeof data.gender !== 'number' || ![1, 2, 3].includes(data.gender)) {
                throw new Error('O campo "Gênero" deve ter um valor válido.');
            }    
            else switch(data.gender) {
                case 1: {
                    data.gender = "Masculino";
                    break;
                }    

                case 2: {
                    data.gender = "Feminino";
                    break;
                }    

                case 3: {
                    data.gender = "Não informado";
                    break;
                }    
            }    

            if (typeof data.birthDate !== 'string' || isNaN(Date.parse(data.birthDate))) {
                throw new Error('O campo "Data de Nascimento" deve ser uma data válida no formato YYYY-MM-DD.');
            }    

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
            if (!passwordRegex.test(data.password)) {
                throw new Error('A senha deve ter pelo menos 8 caracteres, incluir letras maiúsculas, minúsculas e caracteres especiais.');
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ValidateUserStrategy;