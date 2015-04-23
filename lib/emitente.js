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

    Emitente.prototype.getInscricaoMunicipal = function() {
        return this._inscricaoMunicipal || '';
    };

    Emitente.prototype.comInscricaoMunicipal = function(_inscricaoMunicipal) {
        this._inscricaoMunicipal = _inscricaoMunicipal;
        return this;
    };

    return Emitente;
})();


module.exports = Emitente;
