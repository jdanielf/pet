import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import Pet from './Pet.js';

const Servico = sequelize.define('Servico', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tipo_servico: { type: DataTypes.STRING, allowNull: false }, // "Somente Banho", "Somente Tosa" ou "Banho e Tosa"
    data_servico: { type: DataTypes.DATEONLY, allowNull: false },
    horario_chegada: { type: DataTypes.STRING }, // Armazena a hora (ex: "14:30")
    horario_saida: { type: DataTypes.STRING },   // Armazena a hora (ex: "16:00")
    local_servico: { type: DataTypes.STRING, allowNull: false }, // Nome do Pet Shop
    contato_local: { type: DataTypes.STRING } // Telefone/WhatsApp do local
});

// Relacionamento: Um Pet tem muitos Serviços de banho/tosa
Pet.hasMany(Servico, { onDelete: 'CASCADE' });
Servico.belongsTo(Pet);

export default Servico;