module.exports = {
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    db: 'navio_urls'
  },
  // origins(origin, callback) {
  //   const whitelist = ['http://localhost:3001'];
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // }
  origins: 'http://localhost:3000',
  backend: 'http://localhost:3001'
};
