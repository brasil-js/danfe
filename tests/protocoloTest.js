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

    comCodigo: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                protocolo.comCodigo('353140024483664');
            });

            test.done();
        }
    },

    getCodigo: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(protocolo.getCodigo(), '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            protocolo.comCodigo('353140024483664');
            test.equal(protocolo.getCodigo(), '353140024483664');
            test.done();
        }
    },

    comData: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                protocolo.comData(new Date(2014, 10, 20, 12, 30, 45));
            });

            test.done();
        }
    },

    getData: {
        'É possível recuperar o valor definido': function(test) {
            protocolo.comData(new Date(2014, 10, 20, 12, 30, 45));
            test.equal(protocolo.getData().valueOf(), new Date(2014, 10, 20, 12, 30, 45).valueOf());
            test.done();
        }
    },

    getDataFormatada: {
        'Obtém-se string vazia se data não foi definida': function(test) {
            test.equal(protocolo.getDataFormatada(), '');
            test.done();
        },

        'Verifica formatação correta': function(test) {
            protocolo.comData(new Date(2014, 10, 20, 12, 30, 45));
            test.equal(protocolo.getDataFormatada(), '20/11/2014 12:30:45');
            test.done();
        },
    },

    getFormatacao: {
        'Verifica que a formatação correta é aplicada 1': function(test) {
            protocolo.comCodigo('353140024483664');
            protocolo.comData(new Date(2014, 10, 20, 12, 30, 45));

            test.equal(protocolo.getFormatacao(), '353140024483664 - 20/11/2014 12:30:45');
            test.done();
        },

        'Verifica que a formatação correta é aplicada 2': function(test) {
            // protocolo.comCodigo('353140024483664');
            protocolo.comData(new Date(2014, 10, 20, 12, 30, 45));

            test.equal(protocolo.getFormatacao(), '20/11/2014 12:30:45');
            test.done();
        },

        'Verifica que a formatação correta é aplicada 3': function(test) {
            protocolo.comCodigo('353140024483664');
            // protocolo.comData(new Date(2014, 10, 20, 12, 30, 45));

            test.equal(protocolo.getFormatacao(), '353140024483664');
            test.done();
        },

        'Verifica que a formatação correta é aplicada 4': function(test) {
            // protocolo.comCodigo('353140024483664');
            // protocolo.comData(new Date(2014, 10, 20, 12, 30, 45));

            test.equal(protocolo.getFormatacao(), '');
            test.done();
        },
    }
};
