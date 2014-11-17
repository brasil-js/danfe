'use strict';

var gammautils = require('gammautils'),
    merge = gammautils.object.merge,

    brasil = require('brasil'),
    removerMascara = brasil.formatacoes.removerMascara,
    formatarSerie = brasil.nfe.formatarSerie,
    formatarNumero = brasil.nfe.formatarNumero,
    formatarChaveDeAcesso = brasil.nfe.formatarChaveDeAcesso,
    eChaveDeAcesso = brasil.nfe.validarChaveDeAcesso;

var Danfe = (function() {
    function Danfe(_opcoes) {
        this._opcoes = merge({

        }, _opcoes);
    }

    Danfe.prototype.getProtocolo = function() {
        return this._protocolo;
    };

    Danfe.prototype.comProtocolo = function(_protocolo) {
        this._protocolo = _protocolo;
        return this;
    };

    Danfe.prototype.getEmitente = function() {
        return this._emitente;
    };

    Danfe.prototype.comEmitente = function(_emitente) {
        this._emitente = _emitente;
        return this;
    };

    Danfe.prototype.getDestinatario = function() {
        return this._destinatario;
    };

    Danfe.prototype.comDestinatario = function(_destinatario) {
        this._destinatario = _destinatario;
        return this;
    };

    Danfe.prototype.getTransportador = function() {
        return this._transportador;
    };

    Danfe.prototype.comTransportador = function(_transportador) {
        this._transportador = _transportador;
        return this;
    };

    Danfe.prototype.adicionarProduto = function(_produto) {
        this._produtos.push(_produto);
    };

    Danfe.prototype.getProdutos = function() {
        return this._produtos;
    };

    Danfe.prototype.comProdutos = function(_produtos) {
        this._produtos = _produtos;
        return this;
    };

    Danfe.prototype.getInformacoesComplementares = function() {
        return this._informacoesComplementares;
    };

    Danfe.prototype.comInformacoesComplementares = function(_informacoesComplementares) {
        this._informacoesComplementares = _informacoesComplementares;
        return this;
    };

    Danfe.prototype.getOrientacao = function() {
        return this._orientacao;
    };

    Danfe.prototype.comOrientacao = function(_orientacao) {
        this._orientacao = _orientacao;
        return this;
    };

    Danfe.prototype.getTipo = function() {
        return this._tipo;
    };

    Danfe.prototype.comTipo = function(_tipo) {
        this._tipo = _tipo;
        return this;
    };

    Danfe.prototype.getNumero = function() {
        return this._numero;
    };

    Danfe.prototype.getNumeroFormatado = function() {
        return formatarNumero(this.getNumero());
    };

    Danfe.prototype.comNumero = function(_numero) {
        _numero = parseInt(_numero, 10);

        if(_numero < 1 || _numero > 999999999) {
            throw new Error('O número deve ser um valor entre 1 e 999.999.999');
        }

        this._numero = _numero;

        return this;
    };

    Danfe.prototype.getSerie = function() {
        return this._serie;
    };

    Danfe.prototype.getSerieFormatada = function() {
        return formatarSerie(this.getSerie());
    };

    Danfe.prototype.comSerie = function(_serie) {
        _serie = parseInt(_serie, 10);

        if(_serie < 1 || _serie > 999) {
            throw new Error('A série deve ser um valor entre 1 e 999');
        }

        this._serie = _serie;

        return this;
    };

    Danfe.prototype.getChaveDeAcesso = function() {
        return this._chaveDeAcesso;
    };

    Danfe.prototype.getChaveDeAcessoFormatada = function() {
        return formatarChaveDeAcesso(this.getChaveDeAcesso());
    };

    Danfe.prototype.comChaveDeAcesso = function(_chaveDeAcesso) {
        if(!eChaveDeAcesso(_chaveDeAcesso)) {
            throw new Error('A chave de acesso é inválida');
        }

        this._chaveDeAcesso = removerMascara(_chaveDeAcesso);

        return this;
    };

    return Danfe;
})();

module.exports = Danfe;
