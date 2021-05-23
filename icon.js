
const net = require('net');
const fetch = require('node-fetch');
const { array } = require('prop-types');

const server = net.createServer((socket) => {

    const getIcon = () =>{
        limite = 0;
        key = 'f6fa91665df76c05ab31ab51328c2f0f';
        id = '3873544';
        fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${key}`)
            .then(response => response.json())
            .then(data => {
            
            icon = data.weather[0].icon;
            

            socket.write(icon);

            
            setTimeout(getIcon, 1000);
            

            return icon;
        });

    }
    getIcon();

})

server.listen(8002, '192.168.1.19');
