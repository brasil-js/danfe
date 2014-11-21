'use strict';

var brasil = require('brasil'),
    formatarNumero = brasil.formatacoes.numero;

var Volumes = (function() {
    function Volumes() {

    }

    Volumes.prototype.getQuantidade = function() {
        return this._quantidade || 0;
    };

    Volumes.prototype.getQuantidadeFormatada = function() {
        return formatarNumero(this.getQuantidade());
    };

    Volumes.prototype.comQuantidade = function(_quantidade) {
        this._quantidade = _quantidade;
        return this;
    };

    Volumes.prototype.getEspecie = function() {
        return this._especie || '';
    };

    Volumes.prototype.comEspecie = function(_especie) {
        this._especie = _especie;
        return this;
    };

    Volumes.prototype.getMarca = function() {
        return this._marca || '';
    };

    Volumes.prototype.comMarca = function(_marca) {
        this._marca = _marca;
        return this;
    };

    Volumes.prototype.getNumeracao = function() {
        return this._numeracao || '';
    };

    Volumes.prototype.comNumeracao = function(_numeracao) {
        this._numeracao = _numeracao;
        return this;
    };

    Volumes.prototype.getPesoBruto = function() {
        return this._pesoBruto || '';
    };

    Volumes.prototype.comPesoBruto = function(_pesoBruto) {
        this._pesoBruto = _pesoBruto;
        return this;
    };

    Volumes.prototype.getPesoLiquido = function() {
        return this._pesoLiquido || '';
    };

    Volumes.prototype.comPesoLiquido = function(_pesoLiquido) {
        this._pesoLiquido = _pesoLiquido;
        return this;
    };

    return Volumes;
})();

module.exports = Volumes;
