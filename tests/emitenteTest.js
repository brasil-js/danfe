'use strict';

var Emitente = require('../lib/emitente'),
    Endereco = require('../lib/endereco'),
    Pessoa = require('../lib/pessoa'),
    emitente;

module.exports = {
    setUp: function(callback) {
        emitente = new Emitente();
        callback();
    },
    'Verifica que emitente herda de pessoa': function(test) {
        test.ok(emitente instanceof Pessoa);
        test.done();
    },

    'Verifica que tem um endereço vazio por padrão': function(test) {
        test.ok(new Emitente().getEndereco() instanceof Endereco);
        test.done();
    },
};
