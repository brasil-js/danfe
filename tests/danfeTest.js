'use strict';

var Danfe = require('../lib/danfe.js'),
    danfe;

function eDataValida(data) { //TODO: Mover para o gammautils
    //http://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
    if ( Object.prototype.toString.call(data) === '[object Date]' ) {
        if ( isNaN( data.getTime() ) ) {
            return false;
        }
        else {
            return true;
        }
    } else {
        return false;
    }
}

module.exports = {
    setUp: function(cb) {
        danfe = new Danfe();
        cb();
    },

    'Verifica valores padrão': function(test) {
        test.equal(danfe.getOrientacao(), 'retrato');
        test.done();
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
        },

        'Lança exceção se passar algo que não seja um número válido': function(test) {
            test.throws(function() {
                danfe.comSerie('não é um número');
            });

            test.done();
        },
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

        'Lança exceção se passar algo que não seja um número válido': function(test) {
            test.throws(function() {
                danfe.comNumero('não é um número');
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
    },

    comTipo: {
        'Permite apenas os valores "entrada" e "saída"': function(test) {
            test.doesNotThrow(function() {
                danfe.comTipo('entrada');
            });

            test.doesNotThrow(function() {
                danfe.comTipo('saida');
            });

            test.done();
        },

        'Lança exceção se passado algo que não sejam os valores "entrada" e "saida"': function(test) {
            test.throws(function() {
                danfe.comTipo('gammasoft');
            });

            test.throws(function() {
                danfe.comTipo(42);
            });

            test.done();
        },
    },

    getTipo: {
        'É possível obter o tipo': function(test) {
            danfe.comTipo('entrada');
            test.equal(danfe.getTipo(), 'entrada');

            danfe.comTipo('saida');
            test.equal(danfe.getTipo(), 'saida');

            test.done();
        }
    },

    getTipoFormatado: {
        'Retorna "0" para "entrada" e "1" para "saida"': function(test) {
            danfe.comTipo('entrada');
            test.equal(danfe.getTipoFormatado(), '0');

            danfe.comTipo('saida');
            test.equal(danfe.getTipoFormatado(), '1');

            test.done();
        },
    },

    comOrientacao: {
        'Permite apenas os valores "retrato" e "paisagem"': function(test) {
            test.doesNotThrow(function() {
                danfe.comOrientacao('retrato');
            });

            test.doesNotThrow(function() {
                danfe.comOrientacao('paisagem');
            });

            test.done();
        },

        'Lança exceção se passado algo que não sejam os valores "retrato" e "paisagem"': function(test) {
            test.throws(function() {
                danfe.comOrientacao('gammasoft');
            });

            test.throws(function() {
                danfe.comOrientacao(42);
            });

            test.done();
        },
    },

    getOrientacao: {
        'É possível obter a orientação': function(test) {
            danfe.comOrientacao('retrato');
            test.equal(danfe.getOrientacao(), 'retrato');

            danfe.comOrientacao('paisagem');
            test.equal(danfe.getOrientacao(), 'paisagem');

            test.done();
        },
    },

    comDataDaEmissao: {
        'Lança exceção se não passar uma data válida ou uma string que possa ser passada direto ao construtor de Date': function(test) {
            test.throws(function() {
                danfe.comDataDaEmissao('Não é uma data');
            });

            test.done();
        },

        'Não lança exceção se data é passada no formato correto': function(test) {
            //Útil para se pegar o valor direto de um JSON
            test.doesNotThrow(function() {
                danfe.comDataDaEmissao('2014-11-17T19:44:39.699Z');
            });

            test.done();
        },

        'Não lança exceção se passar umo bjeto do tipo Date': function(test) {
            test.doesNotThrow(function() {
                danfe.comDataDaEmissao(new Date());
            });

            test.done();
        }
    },

    getDataDaEmissao: {
        'É possível se obter a data da emissão e sempre é um Date independente do formato passado': function(test) {
            danfe.comDataDaEmissao('2014-11-17T19:44:39.699Z');
            test.ok(eDataValida(danfe.getDataDaEmissao()));

            danfe.comDataDaEmissao(new Date());
            test.ok(eDataValida(danfe.getDataDaEmissao()));

            test.done();
        },

        'Retorna nulo caso não tenha sido definida nenhuma data da emissão': function(test) {
            test.equal(danfe.getDataDaEmissao(), null);
            test.done();
        },
    },

    getDataDaEmissaoFormatada: {
        'É possível obter a data da emissão formatada em DD/MM/YYYY': function(test) {
            danfe.comDataDaEmissao('2014-11-17T19:44:39.699Z');
            test.equal(danfe.getDataDaEmissaoFormatada(), '17/11/2014');

            test.done();
        },

        'Retorna vazio caso não tenha sido definida nenhuma data da emissão': function(test) {
            test.equal(danfe.getDataDaEmissaoFormatada(), '');
            test.done();
        }
    },

    comDataDaEntradaOuSaida: {
        'Lança exceção se não passar uma data válida ou uma string que possa ser passada direto ao construtor de Date': function(test) {
            test.throws(function() {
                danfe.comDataDaEntradaOuSaida('Não é uma data');
            });

            test.done();
        },

        'Não lança exceção se data é passada no formato correto': function(test) {
            //Útil para se pegar o valor direto de um JSON
            test.doesNotThrow(function() {
                danfe.comDataDaEntradaOuSaida('2014-11-17T19:44:39.699Z');
            });

            test.done();
        },

        'Não lança exceção se passar umo bjeto do tipo Date': function(test) {
            test.doesNotThrow(function() {
                danfe.comDataDaEntradaOuSaida(new Date());
            });

            test.done();
        }
    },

    getDataDaEntradaOuSaida: {
        'É possível se obter a data da entrada ou saída e sempre é um Date independente do formato passado': function(test) {
            danfe.comDataDaEntradaOuSaida('2014-11-17T19:44:39.699Z');
            test.ok(eDataValida(danfe.getDataDaEntradaOuSaida()));

            danfe.comDataDaEntradaOuSaida(new Date());
            test.ok(eDataValida(danfe.getDataDaEntradaOuSaida()));

            test.done();
        },

        'Retorna nulo caso não tenha sido definida nenhuma data de entrada ou saida': function(test) {
            test.equal(danfe.getDataDaEntradaOuSaida(), null);
            test.done();
        },
    },

    getDataDaEntradaOuSaidaFormatada: {
        'É possível obter a data da entrada ou saída formatada em DD/MM/YYYY': function(test) {
            danfe.comDataDaEntradaOuSaida('2014-11-17T19:44:39.699Z');
            test.equal(danfe.getDataDaEntradaOuSaidaFormatada(), '17/11/2014');

            test.done();
        },

        'Retorna vazio caso não tenha sido definida nenhuma data de entrada ou saida': function(test) {
            test.equal(danfe.getDataDaEntradaOuSaidaFormatada(), '');
            test.done();
        }
    },

    getHorarioDaEntradaOuSaida: {
        'É possível obter o horário da entrada ou saída formatado em HH:mm:ss': function(test) {
            danfe.comDataDaEntradaOuSaida('2014-11-17T19:44:39.699Z');
            test.equal(danfe.getHorarioDaEntradaOuSaida(), '17:44:39');

            test.done();
        },

        'Retorna vazio caso não tenha sido definida nenhum horario de entrada ou saida': function(test) {
            test.equal(danfe.getHorarioDaEntradaOuSaida(), '');
            test.done();
        },
    },

    comInformacoesComplementares: {
        'Converte qualquer valor passado para string': function(test) {
            danfe.comInformacoesComplementares(42);
            test.equal(danfe.getInformacoesComplementares(), '42');
            test.equal(typeof danfe.getInformacoesComplementares(), 'string');
            test.done();
        },
    },

    getInformacoesComplementares: {
        'É possível obter as informações complementares passadas': function(test) {
            danfe.comInformacoesComplementares('funciona');
            test.equal(danfe.getInformacoesComplementares(), 'funciona');
            test.equal(typeof danfe.getInformacoesComplementares(), 'string');
            test.done();
        },

        'Retorna sempre uma string vazia, mesmo que não tenha sido previamente setado': function(test) {
            test.equal(danfe.getInformacoesComplementares(), '');
            test.done();
        },
    },

    adicionarProduto: {
        'Adicionar produto incrementa o array de produtos': function(test) {
            danfe.adicionarProduto({});
            test.equal(danfe.getProdutos().length, 1);

            danfe.adicionarProduto({});
            test.equal(danfe.getProdutos().length, 2);

            test.done();
        },

        'Pode-se adicionar produtos com interface fluente': function(test) {
            danfe.adicionarProduto({}).adicionarProduto({});
            test.equal(danfe.getProdutos().length, 2);

            test.done();
        },
    },

    comProdutos: {
        'Sobrescreve o array de produtos com um novo': function(test) {
            danfe.comProdutos([{}, {}]);
            test.equal(danfe.getProdutos().length, 2);

            danfe.comProdutos(['produto1', 'produto2', 'produto2']);
            test.equal(danfe.getProdutos().length, 3);

            test.done();
        },
    },

    getProdutos: {
        'Retorna um array vazio mesmo antes de ter algum produto': function(test) {
            test.ok(Array.isArray(danfe.getProdutos()));
            test.equal(danfe.getProdutos().length, 0);
            test.done();
        },
    },

    comProtocolo: {
        'Define um objeto de protocolo': function(test) {
            var protocolo = {};

            danfe.comProtocolo(protocolo);

            test.equal(danfe.getProtocolo(), protocolo);
            test.done();
        },
    },

    getProtocolo: {
        'Retorna nulo caso o protocolo ainda não tenha sido definido': function(test) {
            test.equal(danfe.getProtocolo(), null);
            test.done();
        },
    },

    comEmitente: {
        'Define um objeto de emitente': function(test) {
            var emitente = {};

            danfe.comEmitente(emitente);

            test.equal(danfe.getEmitente(), emitente);
            test.done();
        },
    },

    getEmitente: {
        'Retorna nulo caso o emitente ainda não tenha sido definido': function(test) {
            test.equal(danfe.getEmitente(), null);
            test.done();
        },
    },

    comDestinatario: {
        'Define um objeto de destinatário': function(test) {
            var destinatario = {};

            danfe.comDestinatario(destinatario);

            test.equal(danfe.getDestinatario(), destinatario);
            test.done();
        },
    },

    getDestinatario: {
        'Retorna nulo caso o destinatário ainda não tenha sido definido': function(test) {
            test.equal(danfe.getDestinatario(), null);
            test.done();
        },
    },

    comTransportador: {
        'Define um objeto de transportador': function(test) {
            var transportador = {};

            danfe.comTransportador(transportador);

            test.equal(danfe.getTransportador(), transportador);
            test.done();
        },
    },

    getTransportador: {
        'Retorna nulo caso o transportador ainda não tenha sido definido': function(test) {
            test.equal(danfe.getTransportador(), null);
            test.done();
        },
    },

    comImpostos: {
        'Define um objeto de impostos': function(test) {
            var impostos = {};

            danfe.comImpostos(impostos);

            test.equal(danfe.getImpostos(), impostos);
            test.done();
        },
    },

    getImpostos: {
        'Retorna nulo caso os impostos ainda não tenha sido definido': function(test) {
            test.equal(danfe.getImpostos(), null);
            test.done();
        },
    },

    comModalidadeDoFrete: {
        'Permite apenas os valores "semFrete", "porContaDoEmitente", "porContaDoDestinatarioRemetente" e "porContaDeTerceiros"': function(test) {
            test.doesNotThrow(function() {
                danfe.comModalidadeDoFrete('semFrete');
            });

            test.doesNotThrow(function() {
                danfe.comModalidadeDoFrete('porContaDoEmitente');
            });

            test.doesNotThrow(function() {
                danfe.comModalidadeDoFrete('porContaDoDestinatarioRemetente');
            });

            test.doesNotThrow(function() {
                danfe.comModalidadeDoFrete('porContaDeTerceiros');
            });

            test.done();
        },

        'Lança exceção se passado algo que não sejam os valores "semFrete", "porContaDoEmitente", "porContaDoDestinatarioRemetente" e "porContaDeTerceiros"': function(test) {
            test.throws(function() {
                danfe.comModalidadeDoFrete('gammasoft');
            });

            test.throws(function() {
                danfe.comModalidadeDoFrete(42);
            });

            test.done();
        },
    },

    getModalidadeDoFrete: {
        'É possível obter a modalidade do frete': function(test) {
            danfe.comModalidadeDoFrete('semFrete');
            test.equal(danfe.getModalidadeDoFrete(), 'semFrete');

            danfe.comModalidadeDoFrete('porContaDoEmitente');
            test.equal(danfe.getModalidadeDoFrete(), 'porContaDoEmitente');

            danfe.comModalidadeDoFrete('porContaDoDestinatarioRemetente');
            test.equal(danfe.getModalidadeDoFrete(), 'porContaDoDestinatarioRemetente');

            danfe.comModalidadeDoFrete('porContaDeTerceiros');
            test.equal(danfe.getModalidadeDoFrete(), 'porContaDeTerceiros');

            test.done();
        },

        'Retorna nulo caso não tenha sido definido ainda': function(test) {
            test.equal(danfe.getModalidadeDoFrete(), null);
            test.done();
        },
    },

    getModalidadeDoFreteFormatada: {
        'Verifica que as formatações estão corretas': function(test) {

            danfe.comModalidadeDoFrete('semFrete');
            test.equal(danfe.getModalidadeDoFreteFormatada(), '(9) Sem Frete');

            danfe.comModalidadeDoFrete('porContaDoEmitente');
            test.equal(danfe.getModalidadeDoFreteFormatada(), '(0) Emitente');

            danfe.comModalidadeDoFrete('porContaDoDestinatarioRemetente');
            test.equal(danfe.getModalidadeDoFreteFormatada(), '(1) Dest/Rem');

            danfe.comModalidadeDoFrete('porContaDeTerceiros');
            test.equal(danfe.getModalidadeDoFreteFormatada(), '(2) Terceiros');

            test.done();
        },
    }
};
