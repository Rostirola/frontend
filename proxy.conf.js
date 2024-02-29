const ProxyConf = [
  {
    context: ['/alimentos'],
    target: 'http://localhost:8082/',
    secure: false,
    logLevel: 'debug'
  }
];

module.exports = ProxyConf;
