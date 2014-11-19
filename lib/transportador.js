'use strict';

var util = require('util'),
    Pessoa = require('./pessoa');

var Transportador = (function() {
    function Transportador() {
        Pessoa.apply(this, arguments);
    }

    return Transportador;
})();

util.inherits(Transportador, Pessoa);

module.exports = Transportador;
