/**
 * gopher is a very simple pub/sub messaging broadcast system 
 * 
 * @author Destin Moulton
 * @copyright 2016
 * @license MIT
 * 
 * gopher is written as an IIFE object/module for ease of use.
 *
 * Usage:
 *   gopher("topic-name").subscribe(callback-function)
 *   gopher("topic-name").broadcast(message-or-payload)
 *   gopher("topic-name").unsubscribe(name-of-callback-function)
 *
 **/

"use strict";

var gopher = (function(){

    gopher = {
        topics:{}
    }

    /**
     * Subscribe to a topic. 
     *
     * @param string topic
     * @param function callback
     **/
    gopher.subscribe = function(topic, callback){
        if(gopher.topics.hasOwnProperty(topic)){
            gopher.topics[topic].push(callback);
        } else {
            gopher.topics[topic] = [callback];
        }
    }

    /**
     * Broadcast/publish to a topic.
     * 
     * @param string topic
     * @param string/object payload
     **/
    gopher.broadcast = function(topic, payload){
        if(!gopher.topics.hasOwnProperty(topic)){
            return undefined;
        }

        gopher.topics[topic].forEach(function(callback){
            callback(payload);
        });
    }

    /**
     * Unsubscribe from a topic.
     * 
     * @param string topic
     * @param function callback
     **/
    gopher.unsubscribe = function(topic, callback){
        if(!gopher.topics.hasOwnProperty(topic)){
            return undefined;
        }

        var ind = gopher.topics[topic].indexOf(callback)
        gopher.topics[topic].splice(ind,1);
    }
    
    return gopher;

}())
