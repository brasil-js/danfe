'use strict';
var brasil = require('brasil');
    // moment = require('moment');

var FormularioDeSeguranca = (function() {
    function FormularioDeSeguranca() {

    }

    FormularioDeSeguranca.prototype.getDanfe = function() {
        return this._danfe;
    };

    FormularioDeSeguranca.prototype.comDanfe = function(_danfe) {
        this._danfe = _danfe;
        return this;
    };

    FormularioDeSeguranca.prototype.getDadosDaNfe = function() {
        return brasil.nfe.gerarDadosDaNfe({
            uf: this.getDanfe().getEmitente().getEndereco().getUf(),
            tipoDeEmissao: 5,
            cnpj: this.getDanfe().getEmitente().getRegistroNacional(),
            valorDaNfe: this.getDanfe().getValorTotalDaNota(),
            destaqueDeIcmsProprio: this.getDestaqueDeIcmsProprio(),
            destaqueDeIcmsPorST: this.getDestaqueDeIcmsPorST(),
            dataDeEmissao: this.getDanfe().getDataDaEmissao()
        });
    };

    FormularioDeSeguranca.prototype.getDadosDaNfeFormatado = function() {
        return brasil.nfe.formatarDadosDaNfe(this.getDadosDaNfe());
    };

    FormularioDeSeguranca.prototype.getDestaqueDeIcmsProprio = function() {
        return this._destaqueDeIcmsProprio;
    };

    FormularioDeSeguranca.prototype.comDestaqueDeIcmsProprio = function(_destaqueDeIcmsProprio) {
        if(typeof _destaqueDeIcmsProprio === 'boolean') {
            this._destaqueDeIcmsProprio = _destaqueDeIcmsProprio;
        }

        if(typeof _destaqueDeIcmsProprio === 'string') {
            this._destaqueDeIcmsProprio = _destaqueDeIcmsProprio === 'true';
        }

        if(typeof _destaqueDeIcmsProprio === 'number') {
            this._destaqueDeIcmsProprio = _destaqueDeIcmsProprio === 1;
        }

        return this;
    };

    FormularioDeSeguranca.prototype.getDestaqueDeIcmsPorST = function() {
        return this._destaqueDeIcmsPorST;
    };

    FormularioDeSeguranca.prototype.comDestaqueDeIcmsPorST = function(_destaqueDeIcmsPorST) {
        if(typeof _destaqueDeIcmsPorST === 'boolean') {
            this._destaqueDeIcmsPorST = _destaqueDeIcmsPorST;
        }

        if(typeof _destaqueDeIcmsPorST === 'string') {
            this._destaqueDeIcmsPorST = _destaqueDeIcmsPorST === 'true';
        }

        if(typeof _destaqueDeIcmsPorST === 'number') {
            this._destaqueDeIcmsPorST = _destaqueDeIcmsPorST === 1;
        }

        return this;
    };

    FormularioDeSeguranca.prototype.getDataDaEntradaEmContingencia = function() {
        return this._privateAttribute;
    };

    FormularioDeSeguranca.prototype.comDataDaEntradaEmContingencia = function(_privateAttribute) {
        this._privateAttribute = new Date(_privateAttribute);
        return this;
    };

    FormularioDeSeguranca.prototype.getDataDaEntradaEmContingenciaFormatada = function() {
        // return moment(this.getDataDaEntradaEmContingencia).format('DD/MM/YYYY HH:mm:ss');
        return this.getDataDaEntradaEmContingencia;
    };

    FormularioDeSeguranca.prototype.getJustificativa = function() {
        return this._justificativa || '';
    };

    FormularioDeSeguranca.prototype.comJustificativa = function(_justificativa) {
        if(!_justificativa || _justificativa.length < 15) {
            throw new Error([
                'A justificativa para entrada em contingência deve conter',
                'pelo menos 15 caracteres'
            ].join(''));
        }

        this._justificativa = _justificativa.substr(0, 255);
        return this;
    };

    return FormularioDeSeguranca;
})();

module.exports = FormularioDeSeguranca;
