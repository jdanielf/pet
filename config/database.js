import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false // Desativa os logs de SQL no terminal para ficar mais limpo
});

export default sequelize;