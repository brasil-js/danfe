'use strict';

var Pessoa = require('../lib/pessoa'),
    Endereco = require('../lib/endereco'),
    Transportador = require('../lib/transportador'),
    transportador;

module.exports = {
    setUp: function(callback) {
        transportador = new Transportador();
        callback();
    },

    tearDown: function(callback) {
        callback();
    },

    'Verifica que transportador herda de pessoa': function(test) {

        var transportador = new Transportador();

        test.ok(transportador instanceof Pessoa);
        test.done();
    },

    'Verifica que tem um endereço vazio por padrão': function(test) {
        test.ok(new Transportador().getEndereco() instanceof Endereco);
        test.done();
    },

    comCodigoAntt: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                transportador.comCodigoAntt('ABC123');
            });

            test.done();
        }
    },

    getCodigoAntt: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(transportador.getCodigoAntt(), '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            transportador.comCodigoAntt('ABC123');
            test.equal(transportador.getCodigoAntt(), 'ABC123');
            test.done();
        },

        'Retorna valor em caixa alta mesmo passado em caixa baixa': function(test) {
            transportador.comCodigoAntt('abcdefgh');
            test.equal(transportador.getCodigoAntt(), 'ABCDEFGH');
            test.done();
        },
    },

    comPlacaDoVeiculo: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                transportador.comPlacaDoVeiculo('ABC-1234');
            });

            test.done();
        },

        'Lança exceção ao passar placa inválida': function(test) {
            test.throws(function() {
                transportador.comPlacaDoVeiculo('Não é uma placa');
            });

            test.done();
        },
    },

    getPlacaDoVeiculo: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(transportador.getPlacaDoVeiculo(), '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            transportador.comPlacaDoVeiculo('ABC-1234');
            test.equal(transportador.getPlacaDoVeiculo(), 'ABC-1234');
            test.done();
        },

        'Retorna placa em caixa alta mesmo quando definida em caixa baixa': function(test) {
            transportador.comPlacaDoVeiculo('abc-1234');
            test.equal(transportador.getPlacaDoVeiculo(), 'ABC-1234');
            test.done();
        },
    },

    getPlacaDoVeiculoFormatada: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(transportador.getPlacaDoVeiculoFormatada(), '');
            test.done();
        },

        'Aplica formatação corretamente': function(test) {
            transportador.comPlacaDoVeiculo('ABC1234');
            test.equal(transportador.getPlacaDoVeiculoFormatada(), 'ABC-1234');
            test.done();
        }
    },

    comUfDaPlacaDoVeiculo: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                transportador.comUfDaPlacaDoVeiculo('DF');
            });

            test.done();
        },

        'Lança exceção ao tentar definir um estado inválido': function(test) {
            test.throws(function() {
                transportador.comUfDaPlacaDoVeiculo('ZZ');
            });

            test.done();
        },
    },

    getUfDaPlacaDoVeiculo: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(transportador.getUfDaPlacaDoVeiculo(), '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            transportador.comUfDaPlacaDoVeiculo('DF');
            test.equal(transportador.getUfDaPlacaDoVeiculo(), 'DF');
            test.done();
        },

        'Retorna a UF em caixa alta mesmo tendo sido definida em caixa baixa': function(test) {
            transportador.comUfDaPlacaDoVeiculo('df');
            test.equal(transportador.getUfDaPlacaDoVeiculo(), 'DF');
            test.done();
        },
    },
};
