'use strict';

var brasil = require('brasil'),
    ePlaca = brasil.validacoes.ePlaca,
    formatarPlaca = brasil.formatacoes.placa,
    siglasDosEstados = brasil.dados.siglasDosEstados,
    util = require('util'),
    Pessoa = require('./pessoa');

var Transportador = (function() {
    function Transportador() {
        Pessoa.apply(this, arguments);
    }

    util.inherits(Transportador, Pessoa);

    Transportador.prototype.getCodigoAntt = function() {
        return this._codigoAntt || '';
    };

    Transportador.prototype.comCodigoAntt = function(_codigoAntt) {
        if(_codigoAntt) {
            this._codigoAntt = _codigoAntt.toUpperCase();
        }

        return this;
    };

    Transportador.prototype.getPlacaDoVeiculoFormatada = function() {
        return formatarPlaca(this.getPlacaDoVeiculo());
    };

    Transportador.prototype.getPlacaDoVeiculo = function() {
        return this._placaDoVeiculo || '';
    };

    Transportador.prototype.comPlacaDoVeiculo = function(_placaDoVeiculo) {
        if(!ePlaca(_placaDoVeiculo)) {
            throw new Error('Não é uma placa válida');
        }

        this._placaDoVeiculo = _placaDoVeiculo.toUpperCase();
        return this;
    };

    Transportador.prototype.getUfDaPlacaDoVeiculo = function() {
        return this._ufDaPlacaDoVeiculo || '';
    };

    Transportador.prototype.comUfDaPlacaDoVeiculo = function(_ufDaPlacaDoVeiculo) {
        _ufDaPlacaDoVeiculo = _ufDaPlacaDoVeiculo.toUpperCase();

        if(siglasDosEstados.indexOf(_ufDaPlacaDoVeiculo) === -1) {
            throw new Error('Não é um estado válido');
        }

        this._ufDaPlacaDoVeiculo = _ufDaPlacaDoVeiculo.toUpperCase();
        return this;
    };

    return Transportador;
})();


module.exports = Transportador;
