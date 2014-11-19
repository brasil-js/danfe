'use strict';

var fs = require('fs'),
    path = require('path'),
    geradorDePdf = require('../lib/geradorDePdf');

module.exports = {
    'Testa geração do PDF': function(test) {
        geradorDePdf(null, function(err, pdf) {
            test.ifError(err);

            var pathDoArquivo = path.join(__dirname, 'danfe.pdf'),
                ws = fs.createWriteStream(pathDoArquivo);

            pdf.pipe(ws);

            ws.on('close', function() {
                fs.existsSync(pathDoArquivo);
                test.done();
            });
        });
    },
};
