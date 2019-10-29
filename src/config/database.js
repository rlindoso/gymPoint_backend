module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: '5430',
  username: 'postgres',
  password: 'docker',
  database: 'gymPoint',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
