
const net = require('net');
const fetch = require('node-fetch');
const { array } = require('prop-types');

const server = net.createServer((socket) => {

    const getDescription = () =>{
        limite = 0;
        key = 'f6fa91665df76c05ab31ab51328c2f0f';
        id = '3873544';
        fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${key}`)
            .then(response => response.json())
            .then(data => {

            description = data.weather[0].description;

            socket.write(description);


            
            setTimeout(getDescription, 1000);
            

            return description;
        });

    }
    getDescription();

})

server.listen(8001, '192.168.1.19');
