'use strict';

var Danfe = require('../lib/danfe.js'),
    danfe;

module.exports = {
    setUp: function(cb) {
        danfe = new Danfe();
        cb();
    },

    comSerie: {
        'A série deve ser um número entre 1 e 999': function(test) {
            test.expect(4);

            test.throws(function() {
                danfe.comSerie(0);
            });

            test.throws(function() {
                danfe.comSerie('1000');
            });

            test.doesNotThrow(function() {
                danfe.comSerie(1);
            });

            test.doesNotThrow(function() {
                danfe.comSerie('100');
            });

            test.done();
        }
    },

    getSerie: {
        'É possível obter a série': function(test) {
            danfe.comSerie(100);
            test.equal(danfe.getSerie(), 100);
            test.done();
        },

        'A série é do tipo número': function(test) {
            danfe.comSerie('100');
            test.equal(typeof danfe.getSerie(), 'number');
            test.done();
        },
    },

    getSerieFormatada: {
        'Retorna a série com três digitos e zeros a esquerda': function(test) {
            danfe.comSerie(1);
            test.equal(danfe.getSerieFormatada(), '001');
            test.done();
        },
    },

    comNumero: {
        'O número deve ser um número entre 1 e 999.999.999': function(test) {
            test.expect(4);

            test.throws(function() {
                danfe.comNumero(0);
            });

            test.throws(function() {
                danfe.comNumero('1000000000');
            });

            test.doesNotThrow(function() {
                danfe.comNumero(1);
            });

            test.doesNotThrow(function() {
                danfe.comNumero('100');
            });

            test.done();
        },
    },

    getNumero: {
        'É possível obter o número': function(test) {
            danfe.comNumero(100);
            test.equal(danfe.getNumero(), 100);
            test.done();
        },

        'O número é do tipo número': function(test) {
            danfe.comNumero(100);
            test.equal(typeof danfe.getNumero(), 'number');
            test.done();
        },
    },

    getNumeroFormatado: {
        'Retorna o número com nove digitos e zeros a esquerda': function(test) {
            danfe.comNumero(100);
            test.equal(danfe.getNumeroFormatado(), '000.000.100');
            test.done();
        },
    },

    comChaveDeAcesso: {
        'Lança exceção se tentar definir uma chave de acesso inválida': function(test) {
            test.throws(function() {
                danfe.comChaveDeAcesso('nao é uma chave de acesso');
            });

            test.done();
        },

        'Permite uma chave de acesso válida': function(test) {
            test.doesNotThrow(function() {
                danfe.comChaveDeAcesso('52131000132781000178551000000153401000153408');
            });

            test.doesNotThrow(function() {
                danfe.comChaveDeAcesso('5213 1000 1327 8100 0178 5510 0000 0153 4010 0015 3408');
            });

            test.done();
        },
    },

    getChaveDeAcesso: {
        'Permite uma chave de acesso válida': function(test) {
            test.doesNotThrow(function() {
                danfe.comChaveDeAcesso('52131000132781000178551000000153401000153408');
                test.equal(danfe.getChaveDeAcesso(), '52131000132781000178551000000153401000153408');
            });

            test.done();
        },

        'Remove formatação ao definir uma chave de acesso válida': function(test) {
            test.doesNotThrow(function() {
                danfe.comChaveDeAcesso('5213 1000 1327 8100 0178 5510 0000 0153 4010 0015 3408');
                test.equal(danfe.getChaveDeAcesso(), '52131000132781000178551000000153401000153408');
            });

            test.done();
        },
    },

    getChaveDeAcessoFormatada: {
        'Retorna chave de acesso com formatação padrão': function(test) {
            danfe.comChaveDeAcesso('52131000132781000178551000000153401000153408');
            test.equal(danfe.getChaveDeAcessoFormatada(), '5213 1000 1327 8100 0178 5510 0000 0153 4010 0015 3408');
            test.done();
        },
    }
};
