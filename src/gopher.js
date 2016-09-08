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

(function(global, name, definition){
    if (typeof module !== 'undefined') module.exports = definition(global, name);
    else if (typeof define === 'function' && typeof define.amd  === 'object') define(definition);
    else global[name] = definition(global, name);
})(this, 'gopher', function(global, name){

    "use strict";

    var gopherNoTopic = {};

    /**
     * Set the current topic for the broadcast/subscription.
     * @param string topic
     **/
    function gopher(topic){
        if(typeof(topic) != "string" || topic==""){
            return undefined;
        }
        gopher.module._setTopic(topic);
        return gopher.module;
    }

    gopher.module = {
        topics:{},
        current_topic:"",

        /**
         * Create a topic if it doesn't exist.
         * Set the current topic.
         *
         * @param string topic
         */
        _setTopic: function(topic){
            if(!this.topics.hasOwnProperty(topic)){
                this.topics[topic] = [];
            }
            this.current_topic = topic;
        },

        /**
         * Subscribe to a topic. 
         *
         * @param function callback
         **/
        subscribe: function(callback){
            this.topics[this.current_topic].push(callback);
            return this;
        },

        /**
         * Broadcast/publish to a topic.
         * 
         * @param string/object payload
         **/
        broadcast: function(payload){
            if(this.topics.hasOwnProperty(this.current_topic)){
                this.topics[this.current_topic].forEach(function(callback){
                    callback(payload);
                });
            }
            return this;
        },

        /**
         * Unsubscribe from a topic.
         * 
         * @param function callback
         **/
        unsubscribe: function(callback){
            var ind = this.topics[this.current_topic].indexOf(callback);
            if(ind > -1){
                this.topics[this.current_topic].splice(ind,1);
            }
            return this;
        }
    };

    return gopher;
});
