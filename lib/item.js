'use strict';

var brasil = require('brasil'),
    formatarDinheiro = brasil.formatacoes.dinheiro,
    formatarNumero = brasil.formatacoes.numero;

var Item = (function() {
    function Item() {

    }

    Item.prototype.getCodigo = function() {
        return this._codigo || '';
    };

    Item.prototype.comCodigo = function(_codigo) {
        this._codigo = _codigo;
        return this;
    };

    Item.prototype.getDescricao = function() {
        return this._descricao || '';
    };

    Item.prototype.comDescricao = function(_descricao) {
        this._descricao = _descricao;
        return this;
    };

    Item.prototype.getNcmSh = function() {
        return this._ncmSh || '';
    };

    Item.prototype.comNcmSh = function(_ncmSh) {
        this._ncmSh = _ncmSh;
        return this;
    };

    Item.prototype.getOCst = function() {
        return this._oCst || '';
    };

    Item.prototype.comOCst = function(_oCst) {
        this._oCst = _oCst;
        return this;
    };

    Item.prototype.getCfop = function() {
        return this._cfop || '';
    };

    Item.prototype.comCfop = function(_cfop) {
        this._cfop = _cfop;
        return this;
    };

    Item.prototype.getUnidade = function() {
        return this._unidade || '';
    };

    Item.prototype.comUnidade = function(_unidade) {
        this._unidade = _unidade;
        return this;
    };

    Item.prototype.getQuantidade = function() {
        return this._quantidade || 0;
    };

    Item.prototype.getQuantidadeFormatada = function() {
        return formatarNumero(this.getQuantidade());
    };

    Item.prototype.comQuantidade = function(_quantidade) {
        this._quantidade = _quantidade;
        return this;
    };

    Item.prototype.getValorUnitario = function() {
        return this._valorUnitario || 0;
    };

    Item.prototype.getValorUnitarioFormatado = function() {
        return formatarDinheiro(this.getValorUnitario(), {
            simbolo: ''
        });
    };

    Item.prototype.comValorUnitario = function(_valorUnitario) {
        this._valorUnitario = _valorUnitario;
        return this;
    };

    Item.prototype.getValorTotal = function() {
        return this._valorTotal || 0;
    };

    Item.prototype.getValorTotalFormatado = function() {
        return formatarDinheiro(this.getValorTotal(), {
            simbolo: ''
        });
    };

    Item.prototype.comValorTotal = function(_valorTotal) {
        this._valorTotal = _valorTotal;
        return this;
    };

    Item.prototype.getBaseDeCalculoDoIcms = function() {
        return this._baseDeCalculoDoIcms;
    };

    Item.prototype.getBaseDeCalculoDoIcmsFormatada = function() {
        return formatarDinheiro(this.getBaseDeCalculoDoIcms(), {
            simbolo: ''
        });
    };

    Item.prototype.comBaseDeCalculoDoIcms = function(_baseDeCalculoDoIcms) {
        this._baseDeCalculoDoIcms = _baseDeCalculoDoIcms;
        return this;
    };

    Item.prototype.getValorDoIcms = function() {
        return this._valorDoIcms;
    };

    Item.prototype.getValorDoIcmsFormatado = function() {
        return this.formatarDinheiro(this.getValorDoIcms(), {
            simbolo: ''
        });
    };

    Item.prototype.comValorDoIcms = function(_valorDoIcms) {
        this._valorDoIcms = _valorDoIcms;
        return this;
    };

    Item.prototype.getValorDoIpi = function() {
        return this._valorDoIpi;
    };

    Item.prototype.getValorDoIpiFormatado = function() {
        return this.formatarDinheiro(this.getValorDoIpi(), {
            simbolo: ''
        });
    };

    Item.prototype.comValorDoIpi = function(_valorDoIpi) {
        this._valorDoIpi = _valorDoIpi;
        return this;
    };

    Item.prototype.getAliquotaDoIcms = function() {
        return this._aliquotaDoIcms;
    };

    Item.prototype.getAliquotaDoIcmsFormatada = function() {
        return this.formatarNumero(this.getAliquotaDoIcms()) + '%';
    };

    Item.prototype.comAliquotaDoIcms = function(_aliquotaDoIcms) {
        this._aliquotaDoIcms = _aliquotaDoIcms;
        return this;
    };

    Item.prototype.getAliquotaDoIpi = function() {
        return this._aliquotaDoIpi;
    };

    Item.prototype.getAliquotaDoIpiFormatada = function() {
        return this.formatarNumero(this.getAliquotaDoIpi()) + '%';
    };

    Item.prototype.comAliquotaDoIpi = function(_aliquotaDoIpi) {
        this._aliquotaDoIpi = _aliquotaDoIpi;
        return this;
    };

    Item.prototype.getInformacoesAdicionais = function() {
        return this._informacoesAdicionais;
    };

    Item.prototype.comInformacoesAdicionais = function(_informacoesAdicionais) {
        this._informacoesAdicionais = _informacoesAdicionais;
        return this;
    };

    return Item;
})();

module.exports = Item;
