import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Pet = sequelize.define('Pet', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    especie: { type: DataTypes.STRING, allowNull: false }, // Cachorro ou Gato
    raca: { type: DataTypes.STRING },
    data_nascimento: { type: DataTypes.DATEONLY },
    endereco: { type: DataTypes.STRING }
});

export default Pet;