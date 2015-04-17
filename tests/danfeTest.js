'use strict';

var gammautils = require('gammautils'),
    eDataValida = gammautils.date.isValidDate,

    Danfe = require('../lib/danfe.js'),
    Emitente = require('../lib/emitente'),
    Destinatario = require('../lib/destinatario'),
    Transportador = require('../lib/transportador'),
    Protocolo = require('../lib/protocolo'),
    Impostos = require('../lib/impostos'),
    Volumes = require('../lib/volumes'),
    danfe;

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
                danfe.comSerie('Não é um número');
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
        'Retorna string vazia se não deinido': function(test) {
            test.equal(danfe.getSerieFormatada(), '');
            test.done();
        },

        'Retorna a série com três digitos e zeros a esquerda': function(test) {
            danfe.comSerie(1);
            test.equal(danfe.getSerieFormatada(), 'SÉRIE 001');
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
        'Retorna string vazia se não definido': function(test) {
            test.equal(danfe.getNumeroFormatado(), '');
            test.done();
        },

        'Retorna o número com nove digitos e zeros a esquerda': function(test) {
            danfe.comNumero(100);
            test.equal(danfe.getNumeroFormatado(), 'Nº. 000.000.100');
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
        'Retorna string vazia se não definida': function(test) {
            test.ok(danfe.getChaveDeAcesso() === '');
            test.done();
        },

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
        'Retorna string vazia se não definida': function(test) {
            test.ok(danfe.getChaveDeAcessoFormatada() === '');
            test.done();
        },

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
        'Retorna string vazia se o tipo não tiver sido definido': function(test) {
            test.equal(danfe.getTipoFormatado(), '');
            test.done();
        },

        'Retorna "0" para "entrada" e "1" para "saida"': function(test) {
            danfe.comTipo('entrada');
            test.equal(danfe.getTipoFormatado(), '0');

            danfe.comTipo('saida');
            test.equal(danfe.getTipoFormatado(), '1');

            test.done();
        },
    },

    comValorTotalDaNota: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                danfe.comValorTotalDaNota(1350.25);
            });

            test.done();
        }
    },

    getValorTotalDaNotaFormatado: {
        'Retorna formatação correta com símbolo': function(test) {
            danfe.comValorTotalDaNota(1350.25);
            test.equal(danfe.getValorTotalDaNotaFormatado(), 'R$ 1.350,25');
            test.done();
        },

        'Retorna formatação correta sem símbolo': function(test) {
            danfe.comValorTotalDaNota(1350.25);
            test.equal(danfe.getValorTotalDaNotaFormatado(false), '1.350,25');
            test.done();
        },
    },

    getValorTotalDaNota: {
        'Retorna 0 antes de ser definido': function(test) {
            test.equal(danfe.getValorTotalDaNota(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            danfe.comValorTotalDaNota(1350.25);
            test.equal(danfe.getValorTotalDaNota(), 1350.25);
            test.done();
        }
    },

    comValorTotalDosProdutos: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                danfe.comValorTotalDosProdutos(550.31);
            });

            test.done();
        }
    },

    getValorTotalDosProdutosFormatado: {
        'Retorna o valor formatado sem o símbolo': function(test) {
            danfe.comValorTotalDosProdutos(550.31);
            test.equal(danfe.getValorTotalDosProdutosFormatado(), '550,31');
            test.done();
        },
    },

    getValorTotalDosProdutos: {
        'Retorna 0 antes de ser definido': function(test) {
            test.equal(danfe.getValorTotalDosProdutos(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            danfe.comValorTotalDosProdutos(550.31);
            test.equal(danfe.getValorTotalDosProdutos(), 550.31);
            test.done();
        }
    },

    comValorTotalDosServicos: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                danfe.comValorTotalDosServicos(12328.97);
            });

            test.done();
        }
    },

    getValorTotalDosServicosFormatado: {
        'Retorna valor formatado sem o símbolo': function(test) {
            danfe.comValorTotalDosServicos(12328.97);
            test.equal(danfe.getValorTotalDosServicosFormatado(), '12.328,97');
            test.done();
        }
    },

    getValorTotalDosServicos: {
        'Retorna 0 antes de ser definido': function(test) {
            test.equal(danfe.getValorTotalDosServicos(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            danfe.comValorTotalDosServicos(12328.97);
            test.equal(danfe.getValorTotalDosServicos(), 12328.97);
            test.done();
        }
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

    comInscricaoEstadualDoSubstitutoTributario: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                danfe.comInscricaoEstadualDoSubstitutoTributario('03.707.130-0');
            });

            test.done();
        }
    },

    getInscricaoEstadualDoSubstitutoTributario: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(danfe.getInscricaoEstadualDoSubstitutoTributario(), '');
            test.done();
        },

        'É possível recuperar o valor definido sem máscara': function(test) {
            danfe.comInscricaoEstadualDoSubstitutoTributario('03.707.130-0');
            test.equal(danfe.getInscricaoEstadualDoSubstitutoTributario(), '037071300');
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

    comValorDoFrete: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                danfe.comValorDoFrete(100);
            });

            test.done();
        }
    },

    getValorDoFreteFormatado: {
        'Retorna valor formatado corretamente': function(test) {
            danfe.comValorDoFrete(100);
            test.equal(danfe.getValorDoFreteFormatado(), '100,00');
            test.done();
        }
    },

    getValorDoFrete: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(danfe.getValorDoFrete(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            danfe.comValorDoFrete(100);
            test.equal(danfe.getValorDoFrete(), 100);
            test.done();
        }
    },

    comValorDoSeguro: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                danfe.comValorDoSeguro(110);
            });

            test.done();
        }
    },

    getValorDoSeguroFormatado: {
        'Retorna valor formatado corretamente': function(test) {
            danfe.comValorDoSeguro(110);
            test.equal(danfe.getValorDoSeguroFormatado(), '110,00');
            test.done();
        }
    },

    getValorDoSeguro: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(danfe.getValorDoSeguro(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            danfe.comValorDoSeguro(110);
            test.equal(danfe.getValorDoSeguro(), 110);
            test.done();
        }
    },

    comDesconto: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                danfe.comDesconto(120);
            });

            test.done();
        }
    },

    getDescontoFormatado: {
        'Retorna valor formatado corretamente': function(test) {
            danfe.comDesconto(120);
            test.equal(danfe.getDescontoFormatado(), '120,00');
            test.done();
        }
    },

    getDesconto: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(danfe.getDesconto(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            danfe.comDesconto(120);
            test.equal(danfe.getDesconto(), 120);
            test.done();
        }
    },

    comOutrasDespesas: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                danfe.comOutrasDespesas(140);
            });

            test.done();
        }
    },

    getOutrasDespesasFormatado: {
        'Retorna valor formatado corretamente': function(test) {
            danfe.comOutrasDespesas(140);
            test.equal(danfe.getOutrasDespesasFormatado(), '140,00');
            test.done();
        }
    },

    getOutrasDespesas: {
        'Retorna zero antes de ser definido': function(test) {
            test.equal(danfe.getOutrasDespesas(), 0);
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            danfe.comOutrasDespesas(140);
            test.equal(danfe.getOutrasDespesas(), 140);
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

        'Não lança erro se passar informações null ou undefined': function(test) {
            test.doesNotThrow(function() {
                danfe.comInformacoesComplementares(null);
                danfe.comInformacoesComplementares({}.naoDefinido);
            });

            test.done();
        }
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

    adicionarItem: {
        'Adicionar item incrementa o array de produtos': function(test) {
            danfe.adicionarItem({});
            test.equal(danfe.getItens().length, 1);

            danfe.adicionarItem({});
            test.equal(danfe.getItens().length, 2);

            test.done();
        },

        'Pode-se adicionar itens com interface fluente': function(test) {
            danfe.adicionarItem({}).adicionarItem({});
            test.equal(danfe.getItens().length, 2);

            test.done();
        },
    },

    comItens: {
        'Sobrescreve o array de itens com um novo': function(test) {
            danfe.comItens([{}, {}]);
            test.equal(danfe.getItens().length, 2);

            danfe.comItens(['produto1', 'serviço1', 'produto2']);
            test.equal(danfe.getItens().length, 3);

            test.done();
        },
    },

    getItens: {
        'Retorna um array vazio mesmo antes de ter algum item': function(test) {
            test.ok(Array.isArray(danfe.getItens()));
            test.equal(danfe.getItens().length, 0);
            test.done();
        },
    },

    comProtocolo: {
        'Define um objeto de protocolo': function(test) {
            var protocolo = {};

            test.doesNotThrow(function() {
                danfe.comProtocolo(protocolo);
            });

            test.equal(danfe.getProtocolo(), protocolo);
            test.done();
        },
    },

    getProtocolo: {
        'Verifica que a danfe é instânciada com um protocolo vazio': function(test) {
            test.ok(danfe.getProtocolo() instanceof Protocolo);
            test.done();
        }
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
        'Retorna um emitente vazio caso o emitente ainda não tenha sido definido': function(test) {
            test.ok(danfe.getEmitente() instanceof Emitente);
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
            test.ok(danfe.getDestinatario() instanceof Destinatario);
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
        'Retorna transportador vazio caso ainda não tenha sido definido': function(test) {
            test.ok(danfe.getTransportador() instanceof Transportador);
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
        'Retorna impostos vazios caso ainda não tenha sido definido': function(test) {
            test.ok(danfe.getImpostos() instanceof Impostos);
            test.done();
        },
    },

    comVolumes: {
        'Define um objeto de volumes': function(test) {
            var volumes = {};

            danfe.comVolumes(volumes);

            test.equal(danfe.getVolumes(), volumes);
            test.done();
        },
    },

    getVolumes: {
        'Retorna volumes vazios caso ainda não tenha sido definido': function(test) {
            test.ok(danfe.getVolumes() instanceof Volumes);
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
        'Retorna string vazia se não tiver sido definifo': function(test) {
            test.equal(danfe.getModalidadeDoFreteFormatada(), '');
            test.done();
        },

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
    },

    comNaturezaDaOperacao: {
        'É possível definir a natureza da operação': function(test) {
            danfe.comNaturezaDaOperacao('VENDA');

            test.equal(danfe.getNaturezaDaOperacao(), 'VENDA');
            test.done();
        },
    },

    getNaturezaDaOperacao: {
        'É possível obter a natureza da operação': function(test) {
            danfe.comNaturezaDaOperacao('VENDA');

            test.equal(danfe.getNaturezaDaOperacao(), 'VENDA');
            test.done();
        },

        'Retorna uma string vazia mesmo antes de definir a natureza da operação': function(test) {
            test.equal(danfe.getNaturezaDaOperacao(), '');
            test.done();
        },
    }
};
