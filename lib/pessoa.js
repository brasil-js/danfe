'use strict';

var ie = require('inscricaoestadual'),
    brasil = require('brasil'),
    eTelefone = brasil.validacoes.eTelefone,
    eRegistroNacional = brasil.validacoes.eRegistroNacional;

var Pessoa = (function() {
    function Pessoa() {

    }

    Pessoa.prototype.getNome = function() {
        return this._nome || '';
    };

    Pessoa.prototype.comNome = function(_nome) {
        this._nome = _nome;
        return this;
    };

    Pessoa.prototype.getRegistroNacional = function() {
        return this._registroNacional || '';
    };

    Pessoa.prototype.comRegistroNacional = function(_registroNacional) {
        if(!eRegistroNacional(_registroNacional)) {
            throw new Error('Não é um registro nacional válido');
        }

        this._registroNacional = _registroNacional;
        return this;
    };

    Pessoa.prototype.getEndereco = function() {
        return this._endereco;
    };

    Pessoa.prototype.comEndereco = function(_endereco) {
        this._endereco = _endereco;
        return this;
    };

    Pessoa.prototype.getInscricaoEstadual = function() {
        return this._inscricaoEstadual;
    };

    Pessoa.prototype.comInscricaoEstadual = function(_inscricaoEstadual) {
        if(!ie(_inscricaoEstadual)) {
            throw new Error('Inscrição estadual insválida');
        }

        this._inscricaoEstadual = _inscricaoEstadual;
        return this;
    };

    Pessoa.prototype.getTelefone = function() {
        return this._telefone;
    };

    Pessoa.prototype.comTelefone = function(_telefone) {
        if(!eTelefone) {
            throw new Error('Não é um telefone válido (o DDD também está sendo validado)');
        }

        this._telefone = _telefone;
        return this;
    };

    return Pessoa;
})();

module.exports = Pessoa;
