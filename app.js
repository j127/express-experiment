let http = require('http');
let logger = require('morgan');
let express = require('express');
let path = require('path');

let app = module.exports.app = express();
let server = http.createServer(app)

let io = require('socket.io').listen(server);

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

let publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.use(logger('short'));

let conversation = [{ msg: 'first message from db' }, { msg: 'second message from db' }];

app.get('/', (req, res) => {
    let body = 'Send a chat message';
    res.render('home', {title: 'Chatroom', msg: body, conversation: conversation})
});

app.get('/about', (req, res) => {
    res.end('about page');
});

app.get('/saluton/:persono', (req, res) => {
    res.end(`Saluton ${req.params.persono}`);
});

app.use((request, response) => {
    response.statusCode = 404;
    response.end('404 Not Found');
});

io.on('connection', (socket) => {
    socket.emit('welcome', {greeting: 'Saluton mondo'});
    socket.on('chat message', (data) => {
        console.log(data);
        conversation.push(data);
        console.log(conversation);
        socket.emit('chat message received', JSON.stringify(data));
    });
});

// app.listen(3000);
server.listen(3000)
