var expect = require("chai").expect;
var gopher = require("../src/gopher.js");

describe("gopher is a pub/sub message/package broadcast system", function(){
    describe("Subscribe and broadcast on single function", function(){
        it("Subscribes a function and broadcasts an *object* to that function", function(){

            var complete_package = {};
            gopher("test").subscribe(function(packobj){
                complete_package["packobj"] = packobj;
            });
            var obj_for_transmission = {"foo":"bar"};
            gopher("test").broadcast(obj_for_transmission);
            
            expect(complete_package).to.have.property("packobj");
            expect(complete_package["packobj"]).to.have.property("foo");
            expect(complete_package["packobj"]["foo"]).to.equal("bar");

        });
        it("Subscribes a function and broadcasts a *string* to that function", function(){

            var complete_message = "";
            gopher("test").subscribe(function(message){
                complete_message = message+"world";
            });

            gopher("test").broadcast("hello");
            
            expect(complete_message).to.equal("helloworld");

        });

    });

    describe("Subscribe and broadcast on multiple functions", function(){
        it("Subscribes three functions and broadcasts to them", function(){
            var alpha_message = "";
            var alpha = function(message){ alpha_message += message; }

            var beta_message = "";
            var beta = function(message){ beta_message += message; }

            var gamma_message = "";
            var gamma = function(message){ gamma_message += message; }

            gopher("greek").subscribe(alpha);
            gopher("greek").subscribe(beta);
            gopher("greek").subscribe(gamma);

            gopher("greek").broadcast("aristotle");

            expect(alpha_message).to.equal("aristotle");
            expect(beta_message).to.equal("aristotle");
            expect(gamma_message).to.equal("aristotle");
        });
    });

    describe("Unsubscribe subscribed function", function(){
        it("Performs a subscription & broadcast on a *single* function and then unsubscribes that function", function(){
            var complete_package = {};
            var funtest = function(packobj){
                complete_package["packobj"] = packobj;
            }

            gopher("test").subscribe(funtest);

            var obj_for_transmission = {"foo":"bar"};
            gopher("test").broadcast(obj_for_transmission);

            expect(complete_package["packobj"]["foo"]).to.equal("bar");

            
            gopher("test").unsubscribe(funtest);
            var another_object = {"happy":"narwhal"};
            gopher("test").broadcast(another_object);
            expect(complete_package["packobj"]).to.not.have.property("happy");
        });

        it("Subscribes *multiple* functions and then unsubscribes a *single* function", function(){
            var alpha_var = "";
            var alpha = function(message){
                alpha_var += message;
            }

            var beta_var = "";
            var beta = function(message){
                beta_var += message;
            }
            
            gopher("greek").subscribe(alpha);
            gopher("greek").subscribe(beta);

            gopher("greek").broadcast("socrates");

            expect(alpha_var).to.equal("socrates");
            expect(beta_var).to.equal("socrates");
            
            gopher("greek").unsubscribe(alpha);
            
            gopher("greek").broadcast("plato");
            expect(alpha_var).to.equal("socrates");
            expect(beta_var).to.equal("socratesplato");
        });
    });

    describe("Test no topic (ie when gopher is called as gopher())", function(){
        it("Calls gopher with no topic (expected undefined)", function(){
            var alpha_var = "";
            var alpha = function(message){
                alpha_var += message;
            }
            expect(gopher()).to.equal(undefined);
        });
    });
});
