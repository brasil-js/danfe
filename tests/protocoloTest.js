'use strict';

var Protocolo = require('../lib/protocolo'),
    protocolo;

module.exports = {
    setUp: function(callback) {
        protocolo = new Protocolo();
        callback();
    },

    tearDown: function(callback) {
        callback();
    },

    'Pode-se instanciar um protocolo': function(test) {
        test.ok(protocolo);
        test.ok(protocolo instanceof Protocolo);
        test.done();
    },


};
