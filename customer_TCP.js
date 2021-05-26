const http = require('http');
const net = require('net');
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.readFile('./index.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data, 'utf8');
    })
}).listen(1000, '192.168.1.19');

//crear websocket
const io = require('socket.io')(server);

//crear socket tcp
const clima = new net.Socket();
const description = new net.Socket();
const icon = new net.Socket();

clima.connect(8000, '192.168.1.19');
description.connect(8001, '192.168.1.19');
icon.connect(8002, '192.168.1.19');

//Recibo dato desde el servidodr
clima.on('data', (data) =>{
    data = data.toString();
    
    console.log('\n'+data);

    io.emit('clima',data);
    
    fs.appendFile('datos.txt', 'Weather: '+ data + '\n', (err) =>{
        if(err) throw err;
    })
});

description.on('data', (data) =>{
    data = data.toString();

    console.log('\n'+data);

    io.emit('description',data);

    fs.appendFile('datos.txt', 'Description: ' + data + '\n', (err) =>{
        if(err) throw err;
    })
});

icon.on('data', (data) =>{
    data = data.toString();

    console.log('\n'+data);

    io.emit('icon',data);

    

    fs.appendFile('datos.txt', 'id_Icon: '+data + '\n', (err) =>{
        if(err) throw err;
    })
});


// c.on('data', (data) =>{
//     // data = data.toString();

//     data = data.toString();

//     console.log('\n'+data);

//     io.emit('description', data);
    


// });

