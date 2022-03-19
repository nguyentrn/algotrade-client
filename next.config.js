const { i18n } = require('./next-i18next.config');

const env = {
  NETWORK: 'mainnet',
  SERVER_HOSTNAME: 'http://localhost:9999',
  // SERVER_HOSTNAME: 'http://128.199.137.24:9999',
  PROXY: 'http://128.199.137.24:6969/',
};

if (env.NETWORK === 'testnet') {
  env.BINANCE_SOCKET_HOSTNAME = 'wss://testnet.binance.vision/stream';
  env.BINANCE_API_HOSTNAME = 'https://testnet.binance.vision';
} else {
  env.BINANCE_SOCKET_HOSTNAME = 'wss://stream.binance.com:9443/stream';
  env.BINANCE_API_HOSTNAME = 'https://api.binance.com';
}

module.exports = {
  i18n,
  env,
};
