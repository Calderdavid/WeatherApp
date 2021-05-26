const net = require('net');
const fetch = require('node-fetch');

const server = net.createServer((socket) => {

    const getClima = () =>{
        limite = 0;
        key = 'f6fa91665df76c05ab31ab51328c2f0f';
        id = '3873544';
        fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${key}`)
            .then(response => response.json())
            .then(data => {
            clima = data.main.temp;
            clima = parseFloat(clima) - 273.15;
            clima = clima.toFixed(2);
                        
            socket.write(clima);

            setTimeout(getClima, 1000);
            
            return clima;
        });

    }
    getClima();

})
server.listen(8000, '192.168.1.19');
