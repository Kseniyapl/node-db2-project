const server = require('./api/server')

const port = process.env.PORT || 9999;

server.listen(port, () => console.log(`\n** Running on port ${port} **\n`))
