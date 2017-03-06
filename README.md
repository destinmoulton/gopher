### What is gopher?
***
Gopher is a simple JavaScript pub/sub broadcast system.

Gopher works with node (CommonJS), RequireJS, and in the browser.

### Usage
***
Using gopher is simple.
```js
gopher("topic-name").subscribe(callback)
gopher("topic-name").broadcast(message)
gopher("topic-name").unsubscribe(callback)
```

Example
```js
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

// Console
// --------------------------------------
// >>> Message one.
// >>> Message two.
// >>> [ 'Message one.', 'Message two.' ]
```

### License
***
gopher is released under the MIT license.