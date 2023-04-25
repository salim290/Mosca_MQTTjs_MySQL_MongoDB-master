// MQTT subscriber
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1883')
var topic01Hum = 'ESP32-01/Hum'
var topic01Temo = 'ESP32-01/Temp'
var topic02Hum = 'ESP32-02/Hum'
var topic02Temp = 'ESP32-02/Temp'


var mysql = require('mysql')
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mqttpy'
})

var mysql = require('mysql')
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mqttpy'
})
db.connect(()=>{
    console.log('Database connected!')
})


client.on('message', (topic, message)=>{
    message = message.toString()
    console.log('Message:',message)
    if(message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt'){
        var dbStat = 'insert into mqttpy set ?'
        var data = {
            topic: topic,
            value: message
        }
        db.query(dbStat, data, (error, output)=>{
            if(error){
                console.log(error)
            } else {
                console.log('Data saved to database!')
            }
        })
    }
})

client.on('connect', ()=>{
    client.subscribe(topic01Hum)
})
client.on('connect', ()=>{
    client.subscribe(topic01Temo)
})
client.on('connect', ()=>{
    client.subscribe(topic02Hum)
})
client.on('connect', ()=>{
    client.subscribe(topic02Temp)
})