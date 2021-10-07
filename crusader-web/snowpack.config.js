const dotenv = require('dotenv');
const httpProxy = require('http-proxy');
dotenv.config();

const API_URL = process.env.API_URL || 'http://localhost:5000';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const proxy = httpProxy.createServer({ target: API_URL });

module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' }
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-webpack'
  ],
  devOptions: {
    port: PORT
  },
  routes: [
    {
      src: '/api/.*',
      dest: (req, res) => proxy.web(req, res)
    },
    /* Enable an SPA Fallback in development: */
    { match: 'routes', src: '.*', dest: '/index.html' }
  ]
};
