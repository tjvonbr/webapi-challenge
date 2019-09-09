require('dotenv').config();

const server = require('./server');

const port = process.env.PORT || 5555;
server.listen(port, () => {
  console.log(`\n*** Server running on port ${port} ***\n`)
});