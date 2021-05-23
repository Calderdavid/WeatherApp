
const net = require('net');

const server = net.createServer((socket) => {
    //Envio datos a cliente

    const axios = require('axios');

    const getClima = async (lat, lon) => {    
        const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=c788c2e15f9a3bfcc8544f2ff8dc1373&units=metric`)
        const temp = resp.data.main.temp; 
        console.log(temp);

        socket.write(temp);
        

        return resp.data.main.temp;
    }

        
    
    getClima();

})

server.listen(8000, '192.168.1.19');
