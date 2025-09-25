const app = require('../server');

// Export a handler for Vercel Serverless Functions
module.exports = (req, res) => {
  return app(req, res);
};
