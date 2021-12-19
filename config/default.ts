export default {
  port: 1337,
  dbUri: 'mongodb://localhost:27017/tasks-app',
  saltWorkFactor: 10,
  accessTokenTtl: '15m',
  refreshTokenTtl: '1y',
  accessTokenPrivateKey: ``,
  accessTokenPublicKey: ``,
};
