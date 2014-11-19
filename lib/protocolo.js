'use strict';

var gammautils = require('gammautils'),
    pad = gammautils.string.pad;

function eDataValida(data) { //TODO: Mover para o gammautils
    //http://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
    if ( Object.prototype.toString.call(data) === '[object Date]' ) {
        if ( isNaN( data.getTime() ) ) {
            return false;
        }
        else {
            return true;
        }
    } else {
        return false;
    }
}

function formatarHorario(data) { //TODO: Mover para o brasil
    if(!eDataValida(data)) {
        return '';
    }

    return [
        pad(data.getHours(), 2, '0'),
        pad(data.getMinutes(), 2, '0'),
        pad(data.getSeconds(), 2, '0'),
    ].join(':');
}

function formatarData(data) { //TODO: Mover para o brasil
    if(!eDataValida(data)) {
        return '';
    }

    return [
        pad(data.getDate(), 2, '0'),
        pad(data.getMonth() + 1, 2, '0'),
        data.getFullYear()
    ].join('/');
}

function formatarDataEHorario(data) { //TODO: Mover para o brasil
    return [
        formatarData(data),
        formatarHorario(data)
    ].join(' ');
}

var Protocolo = (function() {
    function Protocolo() {

    }

    Protocolo.prototype.getCodigo = function() {
        return this._codigo;
    };

    Protocolo.prototype.comCodigo = function(_codigo) {
        this._codigo = _codigo;
        return this;
    };

    Protocolo.prototype.getData = function() {
        return this._data;
    };

    Protocolo.prototype.getDataFormatada = function() {
        if(this.getData()) {
            return formatarDataEHorario(this.getData());
        }

        return '';
    };

    Protocolo.prototype.comData = function(_data) {
        this._data = _data;
        return this;
    };

    Protocolo.prototype.getProtocoloFormatado = function() {
        var resultado = '';

        if(this.getCodigo()) {
            resultado += this.getCodigo();
        }

        if(this.getCodigo() && this.getData()) {
            resultado += ' - ';
        }

        if(this.getData()) {
            resultado += this.getDataFormatada();
        }

        return resultado;
    };

    return Protocolo;
})();

module.exports = Protocolo;
