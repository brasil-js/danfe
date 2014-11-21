'use strict';

var util = require('util'),
    Pessoa = require('./pessoa');

var Emitente = (function() {
    function Emitente() {
        Pessoa.apply(this, arguments);
    }

    util.inherits(Emitente, Pessoa);

    Emitente.prototype.getLogotipo = function() {
        return this._logotipo || '';
    };

    Emitente.prototype.comLogotipo = function(_logotipo) {
        this._logotipo = _logotipo;
        return this;
    };

    return Emitente;
})();


module.exports = Emitente;
