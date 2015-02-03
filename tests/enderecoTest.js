'use strict';

var Endereco = require('../lib/endereco'),
    endereco;

module.exports = {

    setUp: function(callback) {
        endereco = new Endereco();
        callback();
    },

    getPrimeiraLinha: {
        'Gera corretamente a primeira linha': function(test) {
            endereco = new Endereco()
                            .comLogradouro('Rua dos Testes')
                            .comNumero('42')
                            .comComplemento('Ed. Nodeunit')
                            .comCep('72.100-300')
                            .comMunicipio('Testolândia')
                            .comCidade('Testópolis')
                            .comUf('MG');

            test.equal(endereco.getPrimeiraLinha(), 'Rua dos Testes 42 Ed. Nodeunit');
            test.done();
        },
    },

    getSegundaLinha: {
        'Gera corretamente a segunda linha 1': function(test) {
            endereco = new Endereco()
                            .comLogradouro('Rua dos Testes')
                            .comNumero('42')
                            .comComplemento('Ed. Nodeunit')
                            .comCep('72.100-300')
                            .comBairro('Bairro da Integração Contínua')
                            .comMunicipio('Testolândia')
                            .comCidade('Belo Horizonte')
                            .comUf('MG');

            test.equal(endereco.getSegundaLinha(), 'Bairro da Integração Contínua, Belo Horizonte/MG — 72.100-300');
            test.done();
        },

        'Gera corretamente a segunda linha 2': function(test) {
            endereco = new Endereco()
                            .comLogradouro('Rua dos Testes')
                            .comNumero('42')
                            .comComplemento('Ed. Nodeunit')
                            .comCep('72.100-300')
                            // .comBairro('Bairro da Integração Contínua')
                            .comMunicipio('Testolândia')
                            .comCidade('Belo Horizonte')
                            .comUf('MG');

            test.equal(endereco.getSegundaLinha(), 'Belo Horizonte/MG — 72.100-300');
            test.done();
        },

        'Gera corretamente a segunda linha 3': function(test) {
            endereco = new Endereco()
                            .comLogradouro('Rua dos Testes')
                            .comNumero('42')
                            .comComplemento('Ed. Nodeunit')
                            .comCep('72.100-300')
                            .comBairro('Bairro da Integração Contínua')
                            .comMunicipio('Testolândia')
                            // .comCidade('Belo Horizonte')
                            .comUf('MG');

            test.equal(endereco.getSegundaLinha(), 'Bairro da Integração Contínua/MG — 72.100-300');
            test.done();
        },

        'Gera corretamente a segunda linha 4': function(test) {
            endereco = new Endereco()
                            .comLogradouro('Rua dos Testes')
                            .comNumero('42')
                            .comComplemento('Ed. Nodeunit')
                            .comCep('72.100-300')
                            .comBairro('Bairro da Integração Contínua')
                            .comMunicipio('Testolândia')
                            .comCidade('Belo Horizonte');
                            // .comUf('MG');

            test.equal(endereco.getSegundaLinha(), 'Bairro da Integração Contínua, Belo Horizonte — 72.100-300');
            test.done();
        },

        'Gera corretamente a segunda linha 5': function(test) {
            endereco = new Endereco()
                            .comLogradouro('Rua dos Testes')
                            .comNumero('42')
                            .comComplemento('Ed. Nodeunit')
                            // .comCep('72.100-300')
                            .comBairro('Bairro da Integração Contínua')
                            .comMunicipio('Testolândia')
                            .comCidade('Belo Horizonte')
                            .comUf('MG');

            test.equal(endereco.getSegundaLinha(), 'Bairro da Integração Contínua, Belo Horizonte/MG');
            test.done();
        },

        'Gera corretamente a segunda linha 6': function(test) {
            endereco = new Endereco()
                            .comLogradouro('Rua dos Testes')
                            .comNumero('42')
                            .comComplemento('Ed. Nodeunit')
                            // .comCep('72.100-300')
                            .comBairro('Bairro da Integração Contínua')
                            .comMunicipio('Testolândia')
                            .comCidade('Belo Horizonte');
                            // .comUf('MG');

            test.equal(endereco.getSegundaLinha(), 'Bairro da Integração Contínua, Belo Horizonte');
            test.done();
        },

        'Gera corretamente a segunda linha 7': function(test) {
            endereco = new Endereco()
                            .comLogradouro('Rua dos Testes')
                            .comNumero('42')
                            .comComplemento('Ed. Nodeunit')
                            // .comCep('72.100-300')
                            // .comBairro('Bairro da Integração Contínua')
                            .comMunicipio('Testolândia')
                            .comCidade('Belo Horizonte');
                            // .comUf('MG');

            test.equal(endereco.getSegundaLinha(), 'Belo Horizonte');
            test.done();
        },
    },

    comLogradouro: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                endereco.comLogradouro('Rua dos Testes');
            });

            test.done();
        }
    },

    getLogradouro: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(endereco.getLogradouro(), '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            endereco.comLogradouro('Rua dos Testes');
            test.equal(endereco.getLogradouro(), 'Rua dos Testes');
            test.done();
        }
    },

    comBairro: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                endereco.comBairro('Bairro da Integração Contínua');
            });

            test.done();
        }
    },

    getBairro: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(endereco.getBairro(), '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            endereco.comBairro('Bairro da Integração Contínua');
            test.equal(endereco.getBairro(), 'Bairro da Integração Contínua');
            test.done();
        }
    },

    comNumero: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                endereco.comNumero('123');
            });

            test.done();
        }
    },

    getNumero: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(endereco.getNumero(), '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            endereco.comNumero('123');
            test.equal(endereco.getNumero(), '123');
            test.done();
        }
    },

    comComplemento: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                endereco.comComplemento('Ao lado do supermercado');
            });

            test.done();
        }
    },

    getComplemento: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(endereco.getComplemento(), '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            endereco.comComplemento('Ao lado do supermercado');
            test.equal(endereco.getComplemento(), 'Ao lado do supermercado');
            test.done();
        }
    },

    comCidade: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                endereco.comCidade('Brasília');
            });

            test.done();
        }
    },

    getCidade: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(endereco.getCidade(), '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            endereco.comCidade('Brasília');
            test.equal(endereco.getCidade(), 'Brasília');
            test.done();
        }
    },

    comCep: {
        'Lança exceção se passar um cep inválido': function(test) {
            test.throws(function() {
                endereco.comCep('Não é um cep');
            });

            test.done();
        },

        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                endereco.comCep('72000000');
            });

            test.done();
        }
    },

    getCep: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(endereco.getCep(), '');
            test.done();
        },

        'É possível recuperar o valor definido sem máscara': function(test) {
            endereco.comCep('72.000-000');
            test.equal(endereco.getCep(), '72000000');
            test.done();
        }
    },

    getCepFormatado: {
        'Verifica que se obtém a formatação correta': function(test) {
            endereco.comCep('72000000');
            test.equal(endereco.getCepFormatado(), '72.000-000');
            test.done();
        },
    },

    comMunicipio: {
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                endereco.comMunicipio('Brasília');
            });

            test.done();
        }
    },

    getMunicipio: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(endereco.getMunicipio(), '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            endereco.comMunicipio('Brasília');
            test.equal(endereco.getMunicipio(), 'Brasília');
            test.done();
        }
    },

    comUf: {
        'Lança exceção caso não seja passado uma UF válida': function(test) {
            test.throws(function() {
                endereco.comUf('ZZ');
            });

            test.done();
        },
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                endereco.comUf('DF');
            });

            test.done();
        },
        'Não lança erro caso passe uf undefined ou null': function(test) {
            test.doesNotThrow(function() {
                endereco.comUf(null);
                endereco.comUf({}.naoDefinido);
            });

            test.done();
        },
    },

    getUf: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(endereco.getUf(), '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            endereco.comUf('DF');
            test.equal(endereco.getUf(), 'DF');
            test.done();
        },

        'Retorna UF toda maiúscula mesmo quando passada minúscula': function(test) {
            endereco.comUf('df');
            test.equal(endereco.getUf(), 'DF');
            test.done();
        },
    }
};
