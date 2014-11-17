'use strict';

var Transporte = (function() {
    function Transporte() {

    }

    Transporte.prototype.getTransportador = function() {
        return this._transportador; //pessoa
    };

    Transporte.prototype.comTransportador = function(_transportador) {
        this._transportador = _transportador; //pessoa
        return this;
    };

    return Transporte;
})();

module.exports.Transporte = Transporte;
