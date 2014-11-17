'use strict';

var Endereco = (function() {
    function Endereco() {

    }

    Endereco.prototype.getLogradouro = function() {
        return this._logradouro;
    };

    Endereco.prototype.comLogradouro = function(_logradouro) {
        this._logradouro = _logradouro;
        return this;
    };

    Endereco.prototype.getNumero = function() {
        return this._numero;
    };

    Endereco.prototype.comNumero = function(_numero) {
        this._numero = _numero;
        return this;
    };

    Endereco.prototype.getComplemento = function() {
        return this._complemento;
    };

    Endereco.prototype.comComplemento = function(_complemento) {
        this._complemento = _complemento;
        return this;
    };

    Endereco.prototype.getCep = function() {
        return this._cep;
    };

    Endereco.prototype.comCep = function(_cep) {
        this._cep = _cep;
        return this;
    };

    Endereco.prototype.getMunicipio = function() {
        return this._municipio;
    };

    Endereco.prototype.comMunicipio = function(_municipio) {
        this._municipio = _municipio;
        return this;
    };

    Endereco.prototype.getUf = function() {
        return this._uf;
    };

    Endereco.prototype.comUf = function(_uf) {
        this._uf = _uf;
        return this;
    };

    return Endereco;
})();

module.exports = Endereco;
