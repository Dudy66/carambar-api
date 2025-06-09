const { exec } = require('child_process');

exec('npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all', (error, stdout, stderr) => {
  if (error) {
    console.error(`Erreur migration/seed : ${error.message}`);
    return;
  }
  console.log(`Migration + Seed :\n${stdout}`);
  require('./server');
});
