var gopher = require('../src/gopher');

function outputToConsole(message){
    console.log(message);
}

var messages = [];
function storeMessage(message){
    messages.push(message);
}

gopher("notification").subscribe(outputToConsole);
gopher("notification").subscribe(storeMessage);

gopher("notification").broadcast("Message one.");
gopher("notification").broadcast("Message two.");
console.log(messages);

// Message one.
// Message two.
// [ 'Message one.', 'Message two.' ]
