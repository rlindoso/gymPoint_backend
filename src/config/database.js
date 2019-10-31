module.exports = {
  dialect: 'postgres',
  host: '10.8.0.10',
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
