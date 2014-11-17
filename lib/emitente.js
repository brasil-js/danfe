'use strict';

var Emitente = (function() {
    function Emitente() {

    }

    Emitente.prototype.getLogotipo = function() {
        return this._logotipo;
    };

    Emitente.prototype.comLogotipo = function(_logotipo) {
        this._logotipo = _logotipo;
        return this;
    };

    Emitente.prototype.getPessoa = function() {
        return this._pessoa;
    };

    Emitente.prototype.comPessoa = function(_pessoa) {
        this._pessoa = _pessoa;
        return this;
    };

    return Emitente;
})();

module.exports = Emitente;
