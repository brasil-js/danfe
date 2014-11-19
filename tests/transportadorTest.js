'use strict';

var Transportador = require('../lib/transportador'),
    Pessoa = require('../lib/pessoa');

module.exports = {
    'Verifica que transportador herda de pessoa': function(test) {

        var transportador = new Transportador();

        test.ok(transportador instanceof Pessoa);
        test.done();
    }
};
