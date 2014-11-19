'use strict';

var util = require('util'),
    Pessoa = require('./pessoa');

var Emitente = (function() {
    function Emitente() {
        Pessoa.apply(this, arguments);
    }

    Emitente.prototype.getLogotipo = function() {
        return this._logotipo;
    };

    Emitente.prototype.comLogotipo = function(_logotipo) {
        this._logotipo = _logotipo;
        return this;
    };

    return Emitente;
})();

util.inherits(Emitente, Pessoa);

module.exports = Emitente;
