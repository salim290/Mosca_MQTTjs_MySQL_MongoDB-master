// MQTT publisher
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1883')
var topic = 'ESP32-02/Temp'
var message = 'ON'

let nr =0
client.on('connect', ()=>{
    setInterval(()=>{
        nr +=1
        let newMessage = message + nr.toString()
        client.publish(topic, newMessage)
        console.log('Message sent!', newMessage)
    }, 5000)
})