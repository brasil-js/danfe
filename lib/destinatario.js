'use strict';

var util = require('util'),
    Pessoa = require('./pessoa');

var Destinatario = (function() {
    function Destinatario() {
        Pessoa.apply(this, arguments);
    }

    util.inherits(Destinatario, Pessoa);

    return Destinatario;
})();


module.exports = Destinatario;
