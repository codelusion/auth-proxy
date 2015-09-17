'use strict';

var authProxy = require('./auth-proxy');

authProxy.run({
    targetDomain: 'https://aisaac01.imednet.com/',
    targetPath: 'api.php',
    proxyPort: 3000
});
