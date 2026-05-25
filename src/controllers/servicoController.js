import Servico from '../models/Servico.js';

export const servicoController = {
    async adicionar(req, res) {
        try {
            const servico = await Servico.create(req.body);
            return res.status(201).json(servico);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async listarPorPet(req, res) {
        try {
            const { petId } = req.params;
            const servicos = await Servico.findAll({ 
                where: { PetId: petId },
                order: [['data_servico', 'DESC']] // Mostra os mais recentes primeiro
            });
            return res.json(servicos);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};