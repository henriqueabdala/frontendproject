const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();


let items = [];

const enviarEmail = message =>{
    const remetente = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'smtp.gmail.com',    
        port: 587,
        secure: false,        
        auth:{
            user: 'fefohenriller@gmail.com',
            pass: 'fiap2021' 
        }
    });   
    const emailASerEnviado = {
        from: 'fefohenriller@gmail.com',
        to: 'fefohenriller@gmail.com',
        subject: 'Enviando Email com Node.js',
        text: `Drone ID: ${message.droneId} - Rastreamento: ${message.rastreamento} - Latitude: ${message.latitude} - Longitude: ${message.longitude} - Temperatura: ${message.temperatura}ºC - Umidade ${message.umidade}% - `
    };
     remetente.sendMail(emailASerEnviado, function(error){
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado com sucesso.');
            }
    });
};




app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json(items);
});
app.post('/', (req, res) => {
    items.push(req.body);
    enviarEmail(req.body);
    res.send('Drone Adicionado com Sucesso!');
});
app.listen(3000, () => {
    console.log('Controle de Drones');
});