import Pet from '../models/pet.js';

export const petController = {
    async criar(req, res) {
        try {
            const pet = await Pet.create(req.body);
            return res.status(201).json(pet);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async listar(req, res) {
        try {
            const pets = await Pet.findAll();
            return res.json(pets);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};