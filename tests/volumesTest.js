'use strict';

var Volumes = require('../lib/volumes'),
    volumes;

module.exports = {
    setUp: function(callback) {
        volumes = new Volumes();
        callback();
    },

    tearDown: function(callback) {
        callback();
    },

    'É possível se instanciar': function(test) {
        test.ok(volumes instanceof Volumes);
        test.done();
    },

    comQuantidade: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                volumes.comQuantidade(10);
            });

            test.done();
        }
    },

    getQuantidadeFormatada: {
        'Verifica que formatacao é retornada corretamente': function(test) {
            volumes.comQuantidade(10000.123);
            test.equal(volumes.getQuantidadeFormatada(), '10.000,123');
            test.done();
        },
    },

    getQuantidade: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(volumes.getQuantidade(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            volumes.comQuantidade(10);
            test.equal(volumes.getQuantidade(), 10);
            test.done();
        }
    },

    comEspecie: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                volumes.comEspecie('A GRANEL');
            });

            test.done();
        }
    },

    getEspecie: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(volumes.getEspecie(), '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            volumes.comEspecie('A GRANEL');
            test.equal(volumes.getEspecie(), 'A GRANEL');
            test.done();
        }
    },

    comMarca: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                volumes.comMarca('Apple');
            });

            test.done();
        }
    },

    getMarca: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(volumes.getMarca(), '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            volumes.comMarca('Apple');
            test.equal(volumes.getMarca(), 'Apple');
            test.done();
        }
    },

    comNumeracao: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                volumes.comNumeracao('12345');
            });

            test.done();
        }
    },

    getNumeracao: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(volumes.getNumeracao(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            volumes.comNumeracao('12345');
            test.equal(volumes.getNumeracao(), '12345');
            test.done();
        }
    },

    comPesoBruto: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                volumes.comPesoBruto('1230Kg');
            });

            test.done();
        }
    },

    getPesoBruto: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(volumes.getPesoBruto(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            volumes.comPesoBruto('1230Kg');
            test.equal(volumes.getPesoBruto(), '1230Kg');
            test.done();
        }
    },

    comPesoLiquido: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                volumes.comPesoLiquido('4234Kg');
            });

            test.done();
        }
    },

    getPesoLiquido: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(volumes.getPesoLiquido(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            volumes.comPesoLiquido('4234Kg');
            test.equal(volumes.getPesoLiquido(), '4234Kg');
            test.done();
        }
    },
};
