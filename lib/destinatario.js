'use strict';

var util = require('util'),
    Pessoa = require('./pessoa');

var Destinatario = (function() {
    function Destinatario() {
        Pessoa.apply(this, arguments);
    }

    return Destinatario;
})();

util.inherits(Destinatario, Pessoa);

module.exports = Destinatario;
