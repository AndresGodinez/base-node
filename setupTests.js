const { sequelize } = require('./config/config'); // Update the path

// This hook will run before each test
beforeEach(async () => {
  // Clear all tables in your test database
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  const tables = await sequelize.query(
      'SHOW TABLES',
      { type: sequelize.QueryTypes.SHOWTABLES }
  );

  for (let table of tables[0]) {
    await sequelize.query(`TRUNCATE TABLE \`${table}\``);
  }
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
});
