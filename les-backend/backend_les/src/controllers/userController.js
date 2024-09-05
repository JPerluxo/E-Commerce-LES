const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

router.post('/save', async (req, res) => {
    const user = req.body;

    try {
        const result = await UserService.saveUser(user);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao salvar usuário: ${error}`, status: 500 });
    }
});

router.get('/getById', async (req, res) => {
    const userId = req.query.userId

    try {
        const result = await UserService.getUserById(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao consultar usuário: ${error}`, status: 500 });
    }
});

router.post('/update', async (req, res) => {
    const user = req.body;

    try {
        const result = await UserService.updateUser({id: user.userId, ...user.userObject});
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao editar usuário: ${error}`, status: 500 });
    }
});

router.post('/delete', async (req, res) => {
    const userId = req.body.userId;

    try {
        const result = await UserService.deleteUser(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao deletar usuário: ${error}`, status: 500 });
    }
});

module.exports = router;
