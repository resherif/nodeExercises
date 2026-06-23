const EventEmitter = require('events');
class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter();
 myEmitter.on('log', (msg) => { 
     console.log(`welcome back ${msg}`);
 })
myEmitter.emit('log', 'reham');
myEmitter.emit('log', 'ahmed');