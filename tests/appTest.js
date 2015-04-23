'use strict';

var app = require('../app.js');
//     path = require('path'),
//     alltested = require('alltested');

module.exports = {

    // 'Garante que existe um teste para cada funcionalidade': function(test){
    //     // TODO: Melhorar o alltested para trabalhar com objetos
    //     var appPath = path.resolve(path.join(__dirname, '/../lib')),
    //         testsPath = __dirname;

    //     alltested(appPath, testsPath, {
    //         ignore: ['app.js']
    //     });

    //     test.done();
    // }

    'Verifica que os módulos estão sendo expostos': function(test) {
        test.equal(typeof app.Danfe, 'function');
        test.equal(typeof app.Emitente, 'function');
        test.equal(typeof app.Destinatario, 'function');
        test.equal(typeof app.Transportador, 'function');
        test.equal(typeof app.Endereco, 'function');
        test.equal(typeof app.Item, 'function');
        test.equal(typeof app.Protocolo, 'function');
        test.equal(typeof app.Gerador, 'function');
        test.equal(typeof app.Impostos, 'function');
        test.equal(typeof app.Volumes, 'function');
        test.equal(typeof app.FormularioDeSeguranca, 'function');
        test.equal(typeof app.Fatura, 'function');
        test.equal(typeof app.Duplicata, 'function');

        test.done();
    },

    'Exporta 10 submodulos': function(test) {
        test.equal(Object.keys(app).length, 13);
        test.done();
    },
};
