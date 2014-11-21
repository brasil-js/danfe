'use strict';

var Impostos = require('../lib/impostos'),
    impostos;

module.exports = {
    setUp: function(callback) {
        impostos = new Impostos();
        callback();
    },

    tearDown: function(callback) {
        callback();
    },

    comBaseDeCalculoDoIcms: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                impostos.comBaseDeCalculoDoIcms(100);
            });

            test.done();
        }
    },

    getBaseDeCalculoDoIcmsFormatada: {
        'Retorna valor formatado corretamente': function(test) {
            impostos.comBaseDeCalculoDoIcms(100);
            test.equal(impostos.getBaseDeCalculoDoIcmsFormatada(), '100,00');
            test.done();
        }
    },

    getBaseDeCalculoDoIcms: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(impostos.getBaseDeCalculoDoIcms(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            impostos.comBaseDeCalculoDoIcms(100);
            test.equal(impostos.getBaseDeCalculoDoIcms(), 100);
            test.done();
        }
    },

    comValorDoIcms: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                impostos.comValorDoIcms(100);
            });

            test.done();
        }
    },

    getValorDoIcmsFormatado: {
        'Retorna valor formatado corretamente': function(test) {
            impostos.comValorDoIcms(100);
            test.equal(impostos.getValorDoIcmsFormatado(), '100,00');
            test.done();
        }
    },

    getValorDoIcms: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(impostos.getValorDoIcms(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            impostos.comValorDoIcms(100);
            test.equal(impostos.getValorDoIcms(), 100);
            test.done();
        }
    },

    comBaseDeCalculoDoIcmsSt: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                impostos.comBaseDeCalculoDoIcmsSt(100);
            });

            test.done();
        }
    },

    getBaseDeCalculoDoIcmsStFormatada: {
        'Retorna valor formatado corretamente': function(test) {
            impostos.comBaseDeCalculoDoIcmsSt(100);
            test.equal(impostos.getBaseDeCalculoDoIcmsStFormatada(), '100,00');
            test.done();
        }
    },

    getBaseDeCalculoDoIcmsSt: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(impostos.getBaseDeCalculoDoIcmsSt(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            impostos.comBaseDeCalculoDoIcmsSt(100);
            test.equal(impostos.getBaseDeCalculoDoIcmsSt(), 100);
            test.done();
        }
    },

    comValorDoIcmsSt: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                impostos.comValorDoIcmsSt(100);
            });

            test.done();
        }
    },

    getValorDoIcmsStFormatado: {
        'Retorna valor formatado corretamente': function(test) {
            impostos.comValorDoIcmsSt(100);
            test.equal(impostos.getValorDoIcmsStFormatado(), '100,00');
            test.done();
        }
    },

    getValorDoIcmsSt: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(impostos.getValorDoIcmsSt(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            impostos.comValorDoIcmsSt(100);
            test.equal(impostos.getValorDoIcmsSt(), 100);
            test.done();
        }
    },

    comValorDoImpostoDeImportacao: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                impostos.comValorDoImpostoDeImportacao(110);
            });

            test.done();
        }
    },

    getValorDoImpostoDeImportacaoFormatado: {
        'Retorna valor formatado corretamente': function(test) {
            impostos.comValorDoImpostoDeImportacao(110);
            test.equal(impostos.getValorDoImpostoDeImportacaoFormatado(), '110,00');
            test.done();
        }
    },

    getValorDoImpostoDeImportacao: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(impostos.getValorDoImpostoDeImportacao(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            impostos.comValorDoImpostoDeImportacao(110);
            test.equal(impostos.getValorDoImpostoDeImportacao(), 110);
            test.done();
        }
    },

    comValorDoPis: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                impostos.comValorDoPis(120);
            });

            test.done();
        }
    },

    getValorDoPisFormatado: {
        'Retorna valor formatado corretamente': function(test) {
            impostos.comValorDoPis(120);
            test.equal(impostos.getValorDoPisFormatado(), '120,00');
            test.done();
        }
    },

    getValorDoPis: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(impostos.getValorDoPis(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            impostos.comValorDoPis(120);
            test.equal(impostos.getValorDoPis(), 120);
            test.done();
        }
    },

    comValorTotalDoIpi: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                impostos.comValorTotalDoIpi(130);
            });

            test.done();
        }
    },

    getValorTotalDoIpiFormatado: {
        'Retorna valor formatado corretamente': function(test) {
            impostos.comValorTotalDoIpi(130);
            test.equal(impostos.getValorTotalDoIpiFormatado(), '130,00');
            test.done();
        }
    },

    getValorTotalDoIpi: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(impostos.getValorTotalDoIpi(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            impostos.comValorTotalDoIpi(130);
            test.equal(impostos.getValorTotalDoIpi(), 130);
            test.done();
        }
    },

    comValorDaCofins: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                impostos.comValorDaCofins(140);
            });

            test.done();
        }
    },

    getValorDaCofinsFormatado: {
        'Retorna valor formatado corretamente': function(test) {
            impostos.comValorDaCofins(140);
            test.equal(impostos.getValorDaCofinsFormatado(), '140,00');
            test.done();
        }
    },

    getValorDaCofins: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(impostos.getValorDaCofins(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            impostos.comValorDaCofins(140);
            test.equal(impostos.getValorDaCofins(), 140);
            test.done();
        }
    },

    comBaseDeCalculoDoIssqn: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                impostos.comBaseDeCalculoDoIssqn(150);
            });

            test.done();
        }
    },

    getBaseDeCalculoDoIssqnFormatada: {
        'Retorna valor formatado corretamente': function(test) {
            impostos.comBaseDeCalculoDoIssqn(150);
            test.equal(impostos.getBaseDeCalculoDoIssqnFormatada(), '150,00');
            test.done();
        }
    },

    getBaseDeCalculoDoIssqn: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(impostos.getBaseDeCalculoDoIssqn(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            impostos.comBaseDeCalculoDoIssqn(150);
            test.equal(impostos.getBaseDeCalculoDoIssqn(), 150);
            test.done();
        }
    }
};
