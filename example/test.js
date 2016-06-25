var t = require('tunnel-ssh')({dstHost: 'agebrock.com',username:'root', dstPort: 27017, localPort: 3004}, console.log)
