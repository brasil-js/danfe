'use strict';

// var brasil = require('brasil'),
    // formatarNumero = brasil.formatacoes.numero,
    // formatarDinheiro = brasil.formatacoes.dinheiro;

var Impostos = (function() {
    function Impostos() {

    }

    Impostos.prototype.getBaseDeCalculoDoIcms = function() {
        return this._baseDeCalculoDoIcms || 0;
    };

    Impostos.prototype.getBaseDeCalculoDoIcmsFormatada = function() {
        return this.formatarNumero(this.getBaseDeCalculoDoIcms());
    };

    Impostos.prototype.comBaseDeCalculoDoIcms = function(_baseDeCalculoDoIcms) {
        this._baseDeCalculoDoIcms = _baseDeCalculoDoIcms;
        return this;
    };

    Impostos.prototype.getValorDoIcms = function() {
        return this._valorDoIcms;
    };

    Impostos.prototype.getValorDoIcmsFormatado = function() {
        return this.formatarNumero(this.getValorDoIcms());
    };

    Impostos.prototype.comValorDoIcms = function(_valorDoIcms) {
        this._valorDoIcms = _valorDoIcms;
        return this;
    };

    Impostos.prototype.getBaseDeCalculoDoIcmsSt = function() {
        return this.formatarNumero(this.getBaseDeCalculoDoIcmsSt());
    };

    Impostos.prototype.comBaseDeCalculoDoIcmsSt = function(_baseDeCalculoDoIcmsSt) {
        this._baseDeCalculoDoIcmsSt = _baseDeCalculoDoIcmsSt;
        return this;
    };

    Impostos.prototype.getValorDoIcmsSubst = function() {
        return this._valorDoIcmsSubst;
    };

    Impostos.prototype.getValorDoIcmsSubstFormatado = function() {
        return this.formatarNumero(this.getValorDoIcmsSubst());
    };

    Impostos.prototype.comValorDoIcmsSubst = function(_valorDoIcmsSubst) {
        this._valorDoIcmsSubst = _valorDoIcmsSubst;
        return this;
    };

    Impostos.prototype.getValorDoImpostoDeImportacao = function() {
        return this._valorDoImpostoDeImportacao;
    };

    Impostos.prototype.comValorDoImpostoDeImportacao = function(_valorDoImpostoDeImportacao) {
        this._valorDoImpostoDeImportacao = _valorDoImpostoDeImportacao;
        return this;
    };

    Impostos.prototype.getValorDoPis = function() {
        return this._valorDoPis;
    };

    Impostos.prototype.comValorDoPis = function(_valorDoPis) {
        this._valorDoPis = _valorDoPis;
        return this;
    };

    Impostos.prototype.getValorTotalDoIpi = function() {
        return this._valorTotalDoIpi;
    };

    Impostos.prototype.comValorTotalDoIpi = function(_valorTotalDoIpi) {
        this._valorTotalDoIpi = _valorTotalDoIpi;
        return this;
    };

    Impostos.prototype.getValorDaCofins = function() {
        return this._valorDaCofins;
    };

    Impostos.prototype.comValorDaCofins = function(_valorDaCofins) {
        this._valorDaCofins = _valorDaCofins;
        return this;
    };

    Impostos.prototype.getBaseDeCalculoDoIssqn = function() {
        return this._baseDeCalculoDoIssqn;
    };

    Impostos.prototype.comBaseDeCalculoDoIssqn = function(_baseDeCalculoDoIssqn) {
        this._baseDeCalculoDoIssqn = _baseDeCalculoDoIssqn;
        return this;
    };

    Impostos.prototype.getValorTotalDoIssqn = function() {
        return this._valorTotalDoIssqn;
    };

    Impostos.prototype.comValorTotalDoIssqn = function(_valorTotalDoIssqn) {
        this._valorTotalDoIssqn = _valorTotalDoIssqn;
        return this;
    };

    return Impostos;
})();

module.exports = Impostos;
