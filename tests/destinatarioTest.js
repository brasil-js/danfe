'use strict';

var Destinatario = require('../lib/destinatario'),
    Pessoa = require('../lib/pessoa');

module.exports = {
    'Verifica que destinatario herda de pessoa': function(test) {

        var destinatario = new Destinatario();

        test.ok(destinatario instanceof Pessoa);
        test.done();
    }
};
