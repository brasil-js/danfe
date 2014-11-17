'use strict';

var Gerador = (function() {
    function Gerador() {

    }

    Gerador.prototype.gerarPDF = function() {

    };

    Gerador.prototype.gerarHTML = function() {
        throw new Error('Não implementado ainda');
    };

    Gerador.prototype.gerarPNG = function() {
        throw new Error('Não implementado ainda');
    };

    return Gerador;
})();

module.exports = Gerador;
