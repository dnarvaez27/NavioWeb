module.exports = {
  mongo: {
    uri: 'mongodb://localhost:27017',
    db: 'icfes_db'
  },
  // origins(origin, callback) {
  //   const whitelist = ['http://localhost:3001'];
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // }
  origins: ''
};
