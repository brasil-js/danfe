'use strict';

var Item = require('../lib/item'),
    item;

module.exports = {

    setUp: function(callback) {
        item = new Item();
        callback();
    },

    tearDown: function(callback) {
        callback();
    },

    comInformacoesAdicionais: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                item.comInformacoesAdicionais('INF AD');
            });

            test.done();
        },
    },

    getInformacoesAdicionais: {
        'É possível definir': function(test) {
            item.comInformacoesAdicionais('INF AD');

            test.equal(item.getInformacoesAdicionais(), 'INF AD');
            test.done();
        },
    },

    comCodigo: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                item.comCodigo('001');
            });

            test.done();
        }
    },

    getCodigo: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.ok(item.getCodigo() === '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            item.comCodigo('001');
            test.equal(item.getCodigo(), '001');
            test.done();
        }
    },

    comDescricao: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                item.comDescricao('Produto 01');
            });

            test.done();
        }
    },

    getDescricao: {
        'Retorna zero antes de ser definido': function(test) {
            test.ok(item.getDescricao() === '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            item.comDescricao('Produto 01');
            test.equal(item.getDescricao(), 'Produto 01');
            test.done();
        }
    },

    comNcmSh: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                item.comNcmSh('12079110');
            });

            test.done();
        },

        'Lança exceção caso seja passado um ncm inválido': function(test) {
            test.throws(function() {
                item.comNcmSh('Não é um NCM');
            });

            test.done();
        },
    },

    getNcmSh: {
        'Retorna zero antes de ser definido': function(test) {
            test.ok(item.getNcmSh() === '');
            test.done();
        },

        'NCM é retornado sem máscara': function(test) {
            item.comNcmSh('12.07.91-10');
            test.equal(item.getNcmSh(), '12079110');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            item.comNcmSh('12079110');
            test.equal(item.getNcmSh(), '12079110');
            test.done();
        }
    },

    comOCst: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                item.comOCst('020');
            });

            test.done();
        }
    },

    getOCst: {
        'Retorna zero antes de ser definido': function(test) {
            test.ok(item.getOCst() === '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            item.comOCst('020');
            test.equal(item.getOCst(), '020');
            test.done();
        }
    },

    comCfop: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                item.comCfop('7251');
            });

            test.done();
        },

        'Lança exceção caso seja passado um CFOP inválido': function(test) {
            test.throws(function() {
                item.comCfop('Não é um CFOP');
            });

            test.done();
        },
    },

    getCfop: {
        'Retorna zero antes de ser definido': function(test) {
            test.ok(item.getCfop() === '');
            test.done();
        },

        'Remove a máscara do CFOP': function(test) {
            item.comCfop('7.251');
            test.equal(item.getCfop(), '7251');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            item.comCfop('7251');
            test.equal(item.getCfop(), '7251');
            test.done();
        }
    },

    comUnidade: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                item.comUnidade('UN.');
            });

            test.done();
        }
    },

    getUnidade: {
        'Retorna zero antes de ser definido': function(test) {
            test.ok(item.getUnidade() === '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            item.comUnidade('UN.');
            test.equal(item.getUnidade(), 'UN.');
            test.done();
        }
    },

    comQuantidade: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                item.comQuantidade(0);
            });

            test.done();
        },

        'Lança exceção caso seja passado um valor negativo': function(test) {
            test.throws(function() {
                item.comQuantidade(-10);
            });

            test.done();
        },
    },

    getQuantidadeFormatada: {
        'Retorna valor formatado corretamente': function(test) {
            item.comQuantidade(0);
            test.equal(item.getQuantidadeFormatada(), '0');

            item.comQuantidade(125.234);
            test.equal(item.getQuantidadeFormatada(), '125,234');

            test.done();
        }
    },

    getQuantidade: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(item.getQuantidade(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            item.comQuantidade(0);
            test.equal(item.getQuantidade(), 0);
            test.done();
        }
    },

    comValorUnitario: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                item.comValorUnitario(1230.14);
            });

            test.done();
        },

        'Lança exceção se o valor unitário for inferior a zero': function(test) {
            test.throws(function() {
                item.comValorUnitario(-10);
            });

            test.done();
        },
    },

    getValorUnitarioFormatado: {
        'Retorna valor formatado corretamente': function(test) {
            item.comValorUnitario(1230);
            test.equal(item.getValorUnitarioFormatado(), '1.230,00');
            test.done();
        }
    },

    getValorUnitario: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(item.getValorUnitario(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            item.comValorUnitario(1230.14);
            test.equal(item.getValorUnitario(), 1230.14);
            test.done();
        }
    },

    comValorTotal: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                item.comValorTotal(1340);
            });

            test.done();
        },

        'Lança exceção se valor total for menor que zero': function(test) {
            test.throws(function() {
                item.comValorTotal(-100);
            });

            test.done();
        },
    },

    getValorTotalFormatado: {
        'Retorna valor formatado corretamente': function(test) {
            item.comValorTotal(1340);
            test.equal(item.getValorTotalFormatado(), '1.340,00');
            test.done();
        }
    },

    getValorTotal: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(item.getValorTotal(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            item.comValorTotal(1340);
            test.equal(item.getValorTotal(), 1340);
            test.done();
        }
    },

    comBaseDeCalculoDoIcms: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                item.comBaseDeCalculoDoIcms(123200);
            });

            test.done();
        },

        'Lança exceção caso passado valor negativo': function(test) {
            test.throws(function() {
                item.comBaseDeCalculoDoIcms(-10);
            });

            test.done();
        },
    },

    getBaseDeCalculoDoIcmsFormatada: {
        'Retorna valor formatado corretamente': function(test) {
            item.comBaseDeCalculoDoIcms(123200);
            test.equal(item.getBaseDeCalculoDoIcmsFormatada(), '123.200,00');
            test.done();
        }
    },

    getBaseDeCalculoDoIcms: {
        'Retorna zero antes de ser definido': function(test) {
            test.ok(item.getBaseDeCalculoDoIcms() === '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            item.comBaseDeCalculoDoIcms(123200);
            test.equal(item.getBaseDeCalculoDoIcms(), 123200);
            test.done();
        }
    },

    comValorDoIcms: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                item.comValorDoIcms(12);
            });

            test.done();
        },

        'Lança exceção caso passado valor negativo': function(test) {
            test.throws(function() {
                item.comValorDoIcms(-10);
            });

            test.done();
        },
    },

    getValorDoIcmsFormatado: {
        'Retorna valor formatado corretamente': function(test) {
            item.comValorDoIcms(12);
            test.equal(item.getValorDoIcmsFormatado(), '12,00');
            test.done();
        }
    },

    getValorDoIcms: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(item.getValorDoIcms(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            item.comValorDoIcms(12);
            test.equal(item.getValorDoIcms(), 12);
            test.done();
        }
    },

    comValorDoIpi: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                item.comValorDoIpi(123);
            });

            test.done();
        },

        'Lança exceção caso passado valor negativo': function(test) {
            test.throws(function() {
                item.comValorDoIpi(-10);
            });

            test.done();
        }
    },

    getValorDoIpiFormatado: {
        'Retorna valor formatado corretamente': function(test) {
            item.comValorDoIpi(123);
            test.equal(item.getValorDoIpiFormatado(), '123,00');
            test.done();
        }
    },

    getValorDoIpi: {
        'Retorna zero antes de ser definido': function(test) {
            test.ok(item.getValorDoIpi() === '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            item.comValorDoIpi(123);
            test.equal(item.getValorDoIpi(), 123);
            test.done();
        }
    },

    comAliquotaDoIcms: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                item.comAliquotaDoIcms(0.175);
            });

            test.done();
        },

        'Lança exceção caso passado valor negativo': function(test) {
            test.throws(function() {
                item.comValorcomAliquotaDoIcmsDoIpi(-10);
            });

            test.done();
        },

        'Lança exceção caso passado valor maior que um': function(test) {
            test.throws(function() {
                item.comAliquotaDoIcms(10);
            });

            test.done();
        },
    },

    getAliquotaDoIcmsFormatada: {
        'Retorna valor formatado corretamente': function(test) {
            item.comAliquotaDoIcms(0.175);
            test.equal(item.getAliquotaDoIcmsFormatada(), '17,5%');
            test.done();
        }
    },

    getAliquotaDoIcms: {
        'Retorna zero antes de ser definido': function(test) {
            test.ok(item.getAliquotaDoIcms() === '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            item.comAliquotaDoIcms(0.175);
            test.equal(item.getAliquotaDoIcms(), 0.175);
            test.done();
        }
    },

    comAliquotaDoIpi: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                item.comAliquotaDoIpi(0.03);
            });

            test.done();
        },

        'Lança exceção caso passado valor negativo': function(test) {
            test.throws(function() {
                item.comAliquotaDoIpi(-10);
            });

            test.done();
        },

        'Lança exceção caso passado valor maior que um': function(test) {
            test.throws(function() {
                item.comAliquotaDoIpi(10);
            });

            test.done();
        },
    },

    getAliquotaDoIpiFormatada: {
        'Retorna valor formatado corretamente': function(test) {
            item.comAliquotaDoIpi(0.03);
            test.equal(item.getAliquotaDoIpiFormatada(), '3%');
            test.done();
        }
    },

    getAliquotaDoIpi: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(item.getAliquotaDoIpi(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            item.comAliquotaDoIpi(0.03);
            test.equal(item.getAliquotaDoIpi(), 0.03);
            test.done();
        }
    },
};
