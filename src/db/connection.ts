import { Sequelize } from 'sequelize';

// LOCAL -> Para desarrollar
/*
const sequelize = new Sequelize('educare', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
*/

// ONLINE
/* */
const sequelize = new Sequelize(
  'educvueo_educare_db',  
  'educvueo_educare_user', 
  'wK6b5rLFKwm5Q3', 
  {
    host: 'localhost',
    // host: '198.177.120.29',  // Shared IP Address para conexiones externas
    dialect: 'mysql',   
    // port: 3000? 3306 // Puerto estándar
  }
);


export default sequelize;
