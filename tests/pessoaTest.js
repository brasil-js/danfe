'use strict';

var Pessoa = require('../lib/pessoa'),
    pessoa;

module.exports = {
    setUp: function(callback) {
        pessoa = new Pessoa();
        callback();
    },

    'Objeto pode ser instanciado': function(test) {
        test.ok(pessoa);
        test.done();
    },

    comNome: {
        'É possível definir um nome': function(test) {
            test.doesNotThrow(function() {
                pessoa.comNome('Gammasoft');
            });

            test.done();
        }
    },

    getNome: {
        'Retorna uma string vazia antes de definir o nome pela primeira vez': function(test) {
            test.equal(pessoa.getNome(), '');
            test.done();
        },

        'Pode se obter o nome': function(test) {
            pessoa.comNome('Gammasoft');
            test.equal(pessoa.getNome(), 'Gammasoft');
            test.done();
        },
    },

    comRegistroNacional: {
        'Lança exceção caso o registro nacional seja inválido': function(test) {
            test.throws(function() {
                pessoa.comRegistroNacional('Não é um CPF nem um CNPJ');
            });

            test.done();
        },

        'Pode-se definir um registro nacional válido': function(test) {
            test.doesNotThrow(function() {
                pessoa.comRegistroNacional('19950366000150');
            });

            test.done();
        },
    },

    getRegistroNacional: {
        'Retorna string vazia mesmo antes de definir o registro nacional': function(test) {
            test.equal(pessoa.getRegistroNacional(), '');
            test.done();
        },

        'Pode-se obter um registro nacional depois de definido': function(test) {
            pessoa.comRegistroNacional('19.950.366/0001-50');

            test.equal(pessoa.getRegistroNacional(), '19950366000150');
            test.done();
        },
    },

    getRegistroNacionalFormatado: {
        'Retorna string vazia caso o registro nacional ainda não tenha sido definido': function(test) {
            test.equal(pessoa.getRegistroNacionalFormatado(), '');
            test.done();
        },

        'Retorna o registro nacional propriamente formatado (CPF e CNPJ)': function(test) {
            pessoa.comRegistroNacional('78823938000107');
            test.equal(pessoa.getRegistroNacionalFormatado(), '78.823.938/0001-07');

            pessoa.comRegistroNacional('65478329533');
            test.equal(pessoa.getRegistroNacionalFormatado(), '654.783.295-33');

            test.done();
        },
    },

    comEndereco: {
        'É possível definir um endereço': function(test) {
            test.doesNotThrow(function() {
                pessoa.comEndereco({});
            });

            test.done();
        }
    },

    getEndereco: {
        'Retorna um endereço vazio (null object) caso o endereço não tenha sido definido': function(test) {
            test.ok(pessoa.getEndereco());
            test.done();
        },
    },

    comInscricaoEstadual: {
        'Lança exceção caso seja fornecida uma inscrição estadual inválida': function(test) {
            test.throws(function() {
                pessoa.comInscricaoEstadual('Não é uma inscrição estadual válida');
            });

            test.done();
        },

        'É possível definir uma inscrição estadual válida': function(test) {
            test.doesNotThrow(function() {
                pessoa.comInscricaoEstadual('041378547');
            });

            test.done();
        }
    },

    getInscricaoEstadual: {
        'Retorna uma string vazia caso ainda não tenha sido definida': function(test) {
            test.equal(pessoa.getInscricaoEstadual(), '');
            test.done();
        },

        'É possível se obter uma inscrição estadual já definida': function(test) {
            pessoa.comInscricaoEstadual('041378547');
            test.equal(pessoa.getInscricaoEstadual(), '041378547');
            test.done();
        },

        'Quando se obtem uma inscrição estadual a mesma retorna sem máscara': function(test) {
            pessoa.comInscricaoEstadual('04.137.854-7');
            test.equal(pessoa.getInscricaoEstadual(), '041378547');
            test.done();
        },
    },

    comTelefone: {
        'Lança exceção caso seja fornecido um telefone inválido': function(test) {
            test.throws(function() {
                pessoa.comTelefone('Não é um telefone');
            });

            test.done();
        },

        'É possível definir um telefone válido': function(test) {
            test.doesNotThrow(function() {
                pessoa.comTelefone('(61) 1234-1234'); //Oito dígitos
                pessoa.comTelefone('11912341234'); //Nove dígitos
            });

            test.done();
        },
    },

    getTelefone: {
        'Retorna uma string vazia caso ainda não tenha sido definida': function(test) {
            test.equal(pessoa.getTelefone(), '');
            test.done();
        },

        'É possível obter um telefone definido e ele vem sem a máscara': function(test) {
            pessoa.comTelefone('(61) 1234-1234');
            test.equal(pessoa.getTelefone(), '6112341234');
            test.done();
        },
    },

    getTelefoneFormatado: {
        'Retorna uma string vazia caso o telefone não tenha sido definido': function(test) {
            test.equal(pessoa.getTelefoneFormatado(), '');
            test.done();
        },

        'Obtém-se o telefone formatado corretamente': function(test) {
            pessoa.comTelefone('6112341234');
            test.equal(pessoa.getTelefoneFormatado(), '(61) 1234-1234');

            pessoa.comTelefone('11912341234');
            test.equal(pessoa.getTelefoneFormatado(), '(11) 91234-1234');

            test.done();
        },
    },

    comEmail: {
        'Lança exceção se não passar email válido': function(test) {
            test.throws(function() {
                pessoa.comEmail('Não é um email válido');
            });

            test.done();
        },
        'É possível definir': function(test) {
            test.doesNotThrow(function() {
                pessoa.comEmail('teste@exemplo.com.br');
            });

            test.done();
        }
    },

    getEmail: {
        'Retorna string vazia antes de ser definido': function(test) {
            test.equal(pessoa.getEmail(), '');
            test.done();
        },

        'É possível recuperar o valor definido': function(test) {
            pessoa.comEmail('teste@exemplo.com.br');
            test.equal(pessoa.getEmail(), 'teste@exemplo.com.br');
            test.done();
        }
    }
};
