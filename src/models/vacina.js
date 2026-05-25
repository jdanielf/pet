import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import Pet from './pet.js';

const Vacina = sequelize.define('Vacina', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome_vacina: { type: DataTypes.STRING, allowNull: false },
    data_aplicada: { type: DataTypes.DATEONLY, allowNull: false },
    proxima_dose: { type: DataTypes.DATEONLY, allowNull: false },
    alerta_antecedencia_dias: { type: DataTypes.INTEGER, defaultValue: 5 }
});

// Relacionamento: Um Pet tem muitas Vacinas
Pet.hasMany(Vacina, { onDelete: 'CASCADE' });
Vacina.belongsTo(Pet);

export default Vacina;