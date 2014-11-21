'use strict';

var geradorDePdf = require('./geradores/geradorDePdf');

var Gerador = (function() {
    function Gerador(danfe) {
        this._danfe = danfe;
    }

    Gerador.prototype.gerarPDF = function(opcoes, callback) {
        if(typeof opcoes === 'function') {
            callback = opcoes;
            opcoes = {};
        }

        geradorDePdf(this._danfe, opcoes, callback);
    };

    // Gerador.prototype.gerarHTML = function() {
    //     throw new Error('Não implementado');
    // };

    // Gerador.prototype.gerarPNG = function() {
    //     throw new Error('Não implementado');
    // };

    return Gerador;
})();

module.exports = Gerador;
