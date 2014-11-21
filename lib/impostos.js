'use strict';

var brasil = require('brasil'),
    formatarDinheiro = brasil.formatacoes.dinheiro;

var Impostos = (function() {
    function Impostos() {

    }

    Impostos.prototype.getBaseDeCalculoDoIcms = function() {
        return this._baseDeCalculoDoIcms || 0;
    };

    Impostos.prototype.getBaseDeCalculoDoIcmsFormatada = function() {
        return formatarDinheiro(this.getBaseDeCalculoDoIcms(), {
            simbolo: ''
        });
    };

    Impostos.prototype.comBaseDeCalculoDoIcms = function(_baseDeCalculoDoIcms) {
        this._baseDeCalculoDoIcms = _baseDeCalculoDoIcms;
        return this;
    };

    Impostos.prototype.getValorDoIcms = function() {
        return this._valorDoIcms || 0;
    };

    Impostos.prototype.getValorDoIcmsFormatado = function() {
        return formatarDinheiro(this.getValorDoIcms(), {
            simbolo: ''
        });
    };

    Impostos.prototype.comValorDoIcms = function(_valorDoIcms) {
        this._valorDoIcms = _valorDoIcms;
        return this;
    };

    Impostos.prototype.getBaseDeCalculoDoIcmsSt = function() {
        return this._baseDeCalculoDoIcmsSt || 0;
    };

    Impostos.prototype.getBaseDeCalculoDoIcmsStFormatada = function() {
        return formatarDinheiro(this.getBaseDeCalculoDoIcmsSt(), {
            simbolo: ''
        });
    };

    Impostos.prototype.comBaseDeCalculoDoIcmsSt = function(_baseDeCalculoDoIcmsSt) {
        this._baseDeCalculoDoIcmsSt = _baseDeCalculoDoIcmsSt;
        return this;
    };

    Impostos.prototype.getValorDoIcmsSt = function() {
        return this._ValorDoIcmsSt || 0;
    };

    Impostos.prototype.getValorDoIcmsStFormatado = function() {
        return formatarDinheiro(this.getValorDoIcmsSt(), {
            simbolo: ''
        });
    };

    Impostos.prototype.comValorDoIcmsSt = function(_ValorDoIcmsSt) {
        this._ValorDoIcmsSt = _ValorDoIcmsSt;
        return this;
    };

    Impostos.prototype.getValorDoImpostoDeImportacao = function() {
        return this._valorDoImpostoDeImportacao || 0;
    };

    Impostos.prototype.getValorDoImpostoDeImportacaoFormatado = function() {
        return formatarDinheiro(this.getValorDoImpostoDeImportacao(), {
            simbolo: ''
        });
    };

    Impostos.prototype.comValorDoImpostoDeImportacao = function(_valorDoImpostoDeImportacao) {
        this._valorDoImpostoDeImportacao = _valorDoImpostoDeImportacao;
        return this;
    };

    Impostos.prototype.getValorDoPis = function() {
        return this._valorDoPis || 0;
    };

    Impostos.prototype.getValorDoPisFormatado = function() {
        return formatarDinheiro(this.getValorDoPis(), {
            simbolo: ''
        });
    };

    Impostos.prototype.comValorDoPis = function(_valorDoPis) {
        this._valorDoPis = _valorDoPis;
        return this;
    };

    Impostos.prototype.getValorTotalDoIpi = function() {
        return this._valorTotalDoIpi || 0;
    };

    Impostos.prototype.getValorTotalDoIpiFormatado = function() {
        return formatarDinheiro(this.getValorTotalDoIpi(), {
            simbolo: ''
        });
    };

    Impostos.prototype.comValorTotalDoIpi = function(_valorTotalDoIpi) {
        this._valorTotalDoIpi = _valorTotalDoIpi;
        return this;
    };

    Impostos.prototype.getValorDaCofins = function() {
        return this._valorDaCofins || 0;
    };

    Impostos.prototype.getValorDaCofinsFormatado = function() {
        return formatarDinheiro(this.getValorDaCofins(), {
            simbolo: ''
        });
    };

    Impostos.prototype.comValorDaCofins = function(_valorDaCofins) {
        this._valorDaCofins = _valorDaCofins;
        return this;
    };

    Impostos.prototype.getBaseDeCalculoDoIssqn = function() {
        return this._baseDeCalculoDoIssqn || 0;
    };

    Impostos.prototype.getBaseDeCalculoDoIssqnFormatada = function() {
        return formatarDinheiro(this.getBaseDeCalculoDoIssqn(), {
            simbolo: ''
        });
    };

    Impostos.prototype.comBaseDeCalculoDoIssqn = function(_baseDeCalculoDoIssqn) {
        this._baseDeCalculoDoIssqn = _baseDeCalculoDoIssqn;
        return this;
    };

    Impostos.prototype.getValorTotalDoIssqn = function() {
        return this._valorTotalDoIssqn || 0;
    };

    Impostos.prototype.getValorTotalDoIssqnFormatado = function() {
        return formatarDinheiro(this.getValorTotalDoIssqn(), {
            simbolo: ''
        });
    };

    Impostos.prototype.comValorTotalDoIssqn = function(_valorTotalDoIssqn) {
        this._valorTotalDoIssqn = _valorTotalDoIssqn;
        return this;
    };

    return Impostos;
})();

module.exports = Impostos;
