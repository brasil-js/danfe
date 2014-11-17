var geradorDePdf = require('../lib/geradorDePdf');

module.exports = {
    'Testa geração do PDF': function(test) {
        geradorDePdf(null, function() {

            test.done();
        });
    },
}
