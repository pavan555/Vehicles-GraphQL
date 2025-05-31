
import app from '../app.js';
import http from 'http';

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

let server;

const setupServer = async () => {
    //only http not https server is supported
    server = http.createServer(app);
}

setupServer()
.then(() => {
    server.setTimeout(600000);
    server.listen(app.get('port'));
    server.on('error', (e) => {
        console.log("error in server", e);
    });
    server.on('listening', () => {
        const addr = server.address();
        const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
        console.log('Listening on ' + bind);
    });
})