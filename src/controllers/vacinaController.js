import Vacina from '../models/vacina.js';

export const vacinaController = {
    async adicionar(req, res) {
        try {
            const vacina = await Vacina.create(req.body);
            return res.status(201).json(vacina);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async listarPorPet(req, res) {
        try {
            const { petId } = req.params;
            const vacinas = await Vacina.findAll({ where: { PetId: petId } });

            // Mapeia as vacinas calculando se o alerta deve ser exibido
            const vacinasComAlerta = vacinas.map(vacina => {
                const hoje = new Date();
                const dataDose = new Date(vacina.proxima_dose);
                
                // Diferença em dias
                const diferencaTempo = dataDose - hoje;
                const diferencaDias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));

                // Se a diferença for menor ou igual aos dias escolhidos, ativa o alerta
                const emitirAlerta = diferencaDias <= vacina.alerta_antecedencia_dias && diferencaDias >= 0;

                return {
                    ...vacina.toJSON(),
                    diasRestantes: diferencaDias,
                    emitirAlerta
                };
            });

            return res.json(vacinasComAlerta);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};