import http from 'http';
import app from './app';
import { PORT } from './utils/config';  

// connect to server
const server = http.createServer(app);

const port = PORT || 8080

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});