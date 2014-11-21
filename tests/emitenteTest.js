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

    comLogotipo: {
        'É possível definir': function(test) {
            console.log(emitente.prototype);

            test.doesNotThrow(function() {
                emitente.comLogotipo('logotipo.png');
            });

            test.done();
        }
    },

    getLogotipo: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(emitente.getLogotipo(), '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            emitente.comLogotipo('logotipo.png');
            test.equal(emitente.getLogotipo(), 'logotipo.png');
            test.done();
        }
    },
};
