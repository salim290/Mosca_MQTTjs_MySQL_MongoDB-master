
# __Mosca 💛 MQTTjs 💚 MySQL__

## __1. Mosca & MQTT.js__

- Initiate a Node.js project then install Mosca & MQTT.js:
    
    ```bash
    $ npm init
    $ npm i mosca mqtt
    ```

- Create an __*MQTT broker*__ (_broker.js_):

    ```javascript
    // Mosca MQTT broker
    var mosca = require('mosca')
    var settings = {port: 1234}
    var broker = new mosca.Server(settings)

    broker.on('ready', ()=>{
        console.log('Broker is ready!')
    })

    broker.on('published', (packet)=>{
        message = packet.payload.toString()
        console.log(message)
    })
    ```

- Create an __*MQTT subscriber*__ (_sub.js_):

    ```javascript
    // MQTT subscriber
    var mqtt = require('mqtt')
    var client = mqtt.connect('mqtt://localhost:1883')
    var topic = 'ESP32-01/Hum'

    client.on('message', (topic, message)=>{
        message = message.toString()
        console.log(message)
    })

    client.on('connect', ()=>{
        client.subscribe(topic)
    })
    ```

- Create an __*MQTT publisher*__ (_pub.js_):

    ```javascript
    // MQTT publisher
    var mqtt = require('mqtt')
    var client = mqtt.connect('mqtt://localhost:1883')
    var topic = 'ESP32-01/Hum'
    var message = 'Hello IoT!'

    client.on('connect', ()=>{
        setInterval(()=>{
            client.publish(topic, message)
            console.log('Message sent!', message)
        }, 5000)
    })
    ```
#

## __2. Mosca, MQTT.js & MySQL__


- Create a database & table on MySQL:
    
    ```bash
    $ create database mqttJS;
    $ use mqttJS
    $ create table(
        id int not null auto_increment,
        topic varchar(255),
        value varchar(255),
        time timestamp default current_timestamp,
        primary key (id)
    );
    $ describe mqttJS
    ```

#
