import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: '+07:00'
  });
  
  sequelize.authenticate()
    .then(() => {
      console.log('Successfully connected to the database.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
    
  
  export default sequelize;