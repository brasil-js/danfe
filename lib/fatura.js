'use strict';

var brasil = require('brasil');

var Fatura = (function() {
    function Fatura() {

    }

    Fatura.prototype.getNumero = function() {
        return this._numero;
    };

    Fatura.prototype.comNumero = function(_numero) {
        this._numero = _numero;
        return this;
    };

    Fatura.prototype.getValorOriginal = function() {
        return this._valorOriginal;
    };

    Fatura.prototype.getValorOriginalFormatado = function() {
        return brasil.formatacoes.dinheiro(this._valorOriginal || 0);
    };

    Fatura.prototype.comValorOriginal = function(_valorOriginal) {
        this._valorOriginal = _valorOriginal;
        return this;
    };

    Fatura.prototype.getValorDoDesconto = function() {
        return this._valorDoDesconto;
    };

    Fatura.prototype.getValorDoDescontoFormatado = function() {
        return brasil.formatacoes.dinheiro(this._valorDoDesconto || 0);
    };

    Fatura.prototype.comValorDoDesconto = function(_valorDoDesconto) {
        this._valorDoDesconto = _valorDoDesconto;
        return this;
    };

    Fatura.prototype.getValorLiquido = function() {
        return this._valorLiquido;
    };

    Fatura.prototype.getValorLiquidoFormatado = function() {
        return brasil.formatacoes.dinheiro(this._valorLiquido || 0);
    };

    Fatura.prototype.comValorLiquido = function(_valorLiquido) {
        this._valorLiquido = _valorLiquido;
        return this;
    };

    Fatura.prototype.getFormaDePagamento = function() {
        return {
            'a vista': 'A VISTA',
            'a prazo': 'A PRAZO',
        }[this._formaDePagamento] || '';
    };

    Fatura.prototype.comFormaDePagamento = function(_formaDePagamento) {
        this._formaDePagamento = _formaDePagamento && _formaDePagamento.toLowerCase();
        return this;
    };

    Fatura.prototype.comPagamentoAVista = function() {
        this._formaDePagamento = 'a vista';
        return this;
    };

    Fatura.prototype.comPagamentoAPrazo = function() {
        this._formaDePagamento = 'a prazo';
        return this;
    };

    Fatura.prototype.removerFormaDePagamento = function() {
        this._formaDePagamento = null;
        return this;
    };

    return Fatura;
})();

module.exports = Fatura;
