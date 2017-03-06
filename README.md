### What is gopher?
***
gopher is a simple JavaScript pub/sub broadcast system.

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

gopher("notification").subscribe(outputToConsole);

gopher("notification").broadcast("This is just a test.");
```

### Requirements
***
JavaScript

### License
***
gopher is released under the MIT license.