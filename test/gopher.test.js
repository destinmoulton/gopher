var expect = require("chai").expect;
var gopher = require("../src/gopher.js");

describe("gopher pub/sub", function(){
    it("is undefined when called directly with no parameter", function(){
        var alpha_var = "";
        var alpha = function(message){
            alpha_var += message;
        }
        expect(gopher()).to.equal(undefined);
    });

    describe("subscribes", function(){
        it("a single function and unsubscribes that function", function(){
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

        it("multiple functions and then unsubscribes a single function", function(){
            var CHANNEL = "greek";
            var alpha_var = "";
            var alpha = function(message){
                alpha_var += message;
            }

            var beta_var = "";
            var beta = function(message){
                beta_var += message;
            }
            
            gopher(CHANNEL).subscribe(alpha);
            gopher(CHANNEL).subscribe(beta);

            gopher(CHANNEL).broadcast("socrates");

            expect(alpha_var).to.equal("socrates");
            expect(beta_var).to.equal("socrates");
            
            gopher(CHANNEL).unsubscribe(alpha);
            
            gopher(CHANNEL).broadcast("plato");
            expect(alpha_var).to.equal("socrates");
            expect(beta_var).to.equal("socratesplato");
        });
    });
    describe("subscribe a single function and broadcast", function(){
        it("an objects", function(){

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
        it("a string", function(){

            var complete_message = "";
            gopher("test").subscribe(function(message){
                complete_message = message+"world";
            });

            gopher("test").broadcast("hello");
            
            expect(complete_message).to.equal("helloworld");

        });

    });

    describe("subscribe multiple functions and broadcast", function(){
        it("a string to them", function(){
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

    
    
});
