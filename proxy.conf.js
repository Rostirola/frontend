const ProxyConf = [
  {
    context: ['/Alimentos', '/Pedidos', '/Usuarios', '/Clientes'],
    target: 'http://localhost:8082/',
    secure: false,
    logLevel: 'debug'
  }
];

module.exports = ProxyConf;
