'use strict';

var gammautils = require('gammautils'),
    pad = gammautils.string.pad,

    brasil = require('brasil'),
    removerMascara = brasil.formatacoes.removerMascara,
    formatarSerie = brasil.nfe.formatarSerie,
    formatarNumero = brasil.nfe.formatarNumero,
    formatarChaveDeAcesso = brasil.nfe.formatarChaveDeAcesso,
    eChaveDeAcesso = brasil.nfe.validarChaveDeAcesso;

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

function formatarHorario(data) {
    if(!eDataValida(data)) {
        return '';
    }

    return [
        pad(data.getHours(), 2, '0'),
        pad(data.getMinutes(), 2, '0'),
        pad(data.getSeconds(), 2, '0'),
    ].join(':');
}

function formatarData(data) {
    if(!eDataValida(data)) {
        return '';
    }

    return [
        pad(data.getDate(), 2, '0'),
        pad(data.getMonth() + 1, 2, '0'),
        data.getFullYear()
    ].join('/');
}

// function formatarDataEHorario(data) {
//     return [
//         formatarData(data),
//         formatarHorario(data)
//     ].join(' ');
// }

var Danfe = (function() {
    function Danfe() {
        this.comOrientacao('retrato');
        this._produtos = [];
    }


    Danfe.prototype.getProtocolo = function() {
        return this._protocolo;
    };

    Danfe.prototype.comProtocolo = function(_protocolo) {
        this._protocolo = _protocolo;
        return this;
    };

    Danfe.prototype.getEmitente = function() {
        return this._emitente;
    };

    Danfe.prototype.comEmitente = function(_emitente) {
        this._emitente = _emitente;
        return this;
    };

    Danfe.prototype.getDestinatario = function() {
        return this._destinatario;
    };

    Danfe.prototype.comDestinatario = function(_destinatario) {
        this._destinatario = _destinatario;
        return this;
    };

    Danfe.prototype.getTransportador = function() {
        return this._transportador;
    };

    Danfe.prototype.comTransportador = function(_transportador) {
        this._transportador = _transportador;
        return this;
    };

    Danfe.prototype.getImpostos = function() {
        return this._impostos;
    };

    Danfe.prototype.comImpostos = function(_impostos) {
        this._impostos = _impostos;
        return this;
    };

    Danfe.prototype.adicionarProduto = function(_produto) {
        this._produtos.push(_produto);
        return this;
    };

    Danfe.prototype.getProdutos = function() {
        return this._produtos;
    };

    Danfe.prototype.comProdutos = function(_produtos) {
        this._produtos = _produtos;
        return this;
    };

    Danfe.prototype.getInformacoesComplementares = function() {
        return this._informacoesComplementares || '';
    };

    Danfe.prototype.comInformacoesComplementares = function(_informacoesComplementares) {
        this._informacoesComplementares = _informacoesComplementares.toString();
        return this;
    };

    Danfe.prototype.getOrientacao = function() {
        return this._orientacao;
    };

    Danfe.prototype.comOrientacao = function(_orientacao) {
        if(['retrato', 'paisagem'].indexOf(_orientacao) === -1) {
            throw new Error('Os valores permitidos são as strings "retrato" e "paisagem"');
        }

        this._orientacao = _orientacao;

        return this;
    };

    Danfe.prototype.getTipo = function() {
        return this._tipo;
    };

    Danfe.prototype.getTipoFormatado = function() {
        return {
            entrada: '0',
            saida: '1'
        }[this.getTipo()];
    };

    Danfe.prototype.comTipo = function(_tipo) {
        if(['entrada', 'saida'].indexOf(_tipo) === -1) {
            throw new Error('Os valores permitidos são as strings "entrada" e "saida"');
        }

        this._tipo = _tipo;

        return this;
    };

    Danfe.prototype.getNumero = function() {
        return this._numero;
    };

    Danfe.prototype.getNumeroFormatado = function() {
        return formatarNumero(this.getNumero());
    };

    Danfe.prototype.comNumero = function(_numero) {
        _numero = parseInt(_numero, 10);

        if(isNaN(_numero)) {
            throw new Error('Não é um número válido. Valor encontrado: ' + _numero);
        }

        if(_numero < 1 || _numero > 999999999) {
            throw new Error('O número deve ser um valor entre 1 e 999.999.999');
        }

        this._numero = _numero;

        return this;
    };

    Danfe.prototype.getSerie = function() {
        return this._serie;
    };

    Danfe.prototype.getSerieFormatada = function() {
        return formatarSerie(this.getSerie());
    };

    Danfe.prototype.comSerie = function(_serie) {
        _serie = parseInt(_serie, 10);

        if(isNaN(_serie)) {
            throw new Error('Não é um número válido. Valor encontrado: ' + _serie);
        }

        if(_serie < 1 || _serie > 999) {
            throw new Error('A série deve ser um valor entre 1 e 999');
        }

        this._serie = _serie;

        return this;
    };

    Danfe.prototype.getChaveDeAcesso = function() {
        return this._chaveDeAcesso;
    };

    Danfe.prototype.getChaveDeAcessoFormatada = function() {
        return formatarChaveDeAcesso(this.getChaveDeAcesso());
    };

    Danfe.prototype.comChaveDeAcesso = function(_chaveDeAcesso) {
        if(!eChaveDeAcesso(_chaveDeAcesso)) {
            throw new Error('A chave de acesso é inválida');
        }

        this._chaveDeAcesso = removerMascara(_chaveDeAcesso);

        return this;
    };

    Danfe.prototype.getDataDaEmissao = function() {
        return this._dataDaEmissao;
    };

    Danfe.prototype.getDataDaEmissaoFormatada = function() {
        return formatarData(this.getDataDaEmissao());
    };

    Danfe.prototype.comDataDaEmissao = function(_dataDaEmissao) {
        if(typeof _dataDaEmissao === 'string') {
            _dataDaEmissao = new Date(_dataDaEmissao);
        }

        if(!eDataValida(_dataDaEmissao)) {
            throw new Error('Não é uma data válida');
        }

        this._dataDaEmissao = _dataDaEmissao;

        return this;
    };

    Danfe.prototype.getDataDaEntradaOuSaida = function() {
        return this._dataDaEntradaOuSaida;
    };

    Danfe.prototype.getDataDaEntradaOuSaidaFormatada = function() {
        return formatarData(this.getDataDaEntradaOuSaida());
    };

    Danfe.prototype.getHorarioDaEntradaOuSaida = function() {
        return formatarHorario(this.getDataDaEntradaOuSaida());
    };

    Danfe.prototype.comDataDaEntradaOuSaida = function(_dataDaEntradaOuSaida) {
        if(typeof _dataDaEntradaOuSaida === 'string') {
            _dataDaEntradaOuSaida = new Date(_dataDaEntradaOuSaida);
        }

        if(!eDataValida(_dataDaEntradaOuSaida)) {
            throw new Error('Não é uma data válida');
        }

        this._dataDaEntradaOuSaida = _dataDaEntradaOuSaida;

        return this;
    };

    Danfe.prototype.getModalidadeDoFrete = function() {
        return this._modalidadeDoFrete;
    };

    Danfe.prototype.comModalidadeDoFrete = function(_modalidadeDoFrete) {
        if([
            'semFrete',
            'porContaDoEmitente',
            'porContaDoDestinatarioRemetente',
            'porContaDeTerceiros'
        ].indexOf(_modalidadeDoFrete) === -1) {
            throw new Error([
                'Os valores permitidos são as strings',
                '"semFrete",',
                '"porContaDoEmitente",',
                '"porContaDoDestinatarioRemetente",',
                '"porContaDeTerceiros"',
            ].join(' '));
        }

        this._modalidadeDoFrete = _modalidadeDoFrete;

        return this;
    };

    Danfe.prototype.getModalidadeDoFreteFormatada = function() {
        return {
            semFrete: '(9) Sem Frete',
            porContaDoEmitente: '(0) Emitente',
            porContaDoDestinatarioRemetente: '(1) Dest/Rem',
            porContaDeTerceiros: '(2) Terceiros'
        }[this.getModalidadeDoFrete()];
    };

    return Danfe;
})();

module.exports = Danfe;
