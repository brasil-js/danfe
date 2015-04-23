'use strict';

var gammautils = require('gammautils'),
    eDataValida = gammautils.date.isValidDate,

    ie = require('inscricaoestadual'),
    brasil = require('brasil'),
    formatarDinheiro = brasil.formatacoes.dinheiro,
    formatarData = brasil.formatacoes.data,
    formatarHora = brasil.formatacoes.hora,
    removerMascara = brasil.formatacoes.removerMascara,
    formatarSerie = brasil.nfe.formatarSerie,
    formatarNumero = brasil.nfe.formatarNumero,
    formatarChaveDeAcesso = brasil.nfe.formatarChaveDeAcesso,
    eChaveDeAcesso = brasil.nfe.validarChaveDeAcesso,

    Impostos = require('./impostos'),
    Emitente = require('./emitente'),
    Destinatario = require('./destinatario'),
    Protocolo = require('./protocolo'),
    Transportador = require('./transportador'),
    Volumes = require('./volumes');

var Danfe = (function() {
    function Danfe() {
        this.comOrientacao('retrato');
        this.comEmitente(new Emitente());
        this.comDestinatario(new Destinatario());
        this.comTransportador(new Transportador());
        this.comProtocolo(new Protocolo());
        this.comImpostos(new Impostos());
        this.comVolumes(new Volumes());
        this._itens = [];
    }

    Danfe.prototype.getProtocolo = function() {
        return this._protocolo;
    };

    Danfe.prototype.comProtocolo = function(_protocolo) {
        this._protocolo = _protocolo;
        return this;
    };

    Danfe.prototype.getFormularioDeSeguranca = function() {
        return this._formularioDeSeguranca;
    };

    Danfe.prototype.comFormularioDeSeguranca = function(_formularioDeSeguranca) {
        if(_formularioDeSeguranca.getJustificativa().length < 15) {
            throw new Error([
                'A justificativa da entrada em contingência deve conter 15 caracteres ou mais'
            ].join(''));
        }

        _formularioDeSeguranca.comDanfe(this);
        this._formularioDeSeguranca = _formularioDeSeguranca;

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

    Danfe.prototype.adicionarItem = function(_item) {
        this._itens.push(_item);
        return this;
    };

    Danfe.prototype.getFatura = function() {
        return this._fatura;
    };

    Danfe.prototype.comFatura = function(_fatura) {
        this._fatura = _fatura;
        return this;
    };

    Danfe.prototype.getDuplicatas = function() {
        return this._duplicatas || [];
    };

    Danfe.prototype.comDuplicatas = function(_duplicatas) {
        this._duplicatas = _duplicatas;
        return this;
    };

    Danfe.prototype.adicionarDuplicata = function(duplicata) {
        if(!this._duplicatas) {
            this._duplicatas = [];
        }

        this._duplicatas.push(duplicata);
        return this;
    };

    Danfe.prototype.getItens = function() {
        return this._itens;
    };

    Danfe.prototype.comItens = function(_itens) {
        this._itens = _itens;
        return this;
    };

    Danfe.prototype.getInformacoesComplementares = function() {
        return this._informacoesComplementares || '';
    };

    Danfe.prototype.comInformacoesComplementares = function(_informacoesComplementares) {
        if(!_informacoesComplementares) {
            return this;
        }

        this._informacoesComplementares = _informacoesComplementares.toString();
        return this;
    };

    Danfe.prototype.getValorTotalDaNota = function() {
        return this._valorTotalDaNota || 0;
    };

    Danfe.prototype.getValorTotalDaNotaFormatado = function(simbolo) {
        return formatarDinheiro(this.getValorTotalDaNota(), {
            simbolo: (simbolo === false ? '' : 'R$ ')
        });
    };

    Danfe.prototype.comValorTotalDaNota = function(_valorTotalDaNota) {
        this._valorTotalDaNota = parseFloat(_valorTotalDaNota);
        return this;
    };

    Danfe.prototype.getValorTotalDosProdutos = function() {
        return this._valorTotalDosProdutos || 0;
    };

    Danfe.prototype.getValorTotalDosProdutosFormatado = function() {
        return formatarDinheiro(this.getValorTotalDosProdutos(), {
            simbolo: ''
        });
    };

    Danfe.prototype.comValorTotalDosProdutos = function(_valorTotalDosProdutos) {
        this._valorTotalDosProdutos = parseFloat(_valorTotalDosProdutos);
        return this;
    };

    Danfe.prototype.getValorTotalDosServicos = function() {
        return this._valorTotalDosServicos || 0;
    };

    Danfe.prototype.getValorTotalDosServicosFormatado = function() {
        return formatarDinheiro(this.getValorTotalDosServicos(), {
            simbolo: ''
        });
    };

    Danfe.prototype.comValorTotalDosServicos = function(_valorTotalDosServicos) {
        this._valorTotalDosServicos = parseFloat(_valorTotalDosServicos);
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

    Danfe.prototype.getInscricaoEstadualDoSubstitutoTributario = function() {
        return this._inscricaoEstadualDoSubstitutoTributario || '';
    };

    Danfe.prototype.comInscricaoEstadualDoSubstitutoTributario = function(_inscricaoEstadualDoSubstitutoTributario) {
        if(!ie(_inscricaoEstadualDoSubstitutoTributario)) {
            throw new Error('Não é uma inscrição estadual válida');
        }

        this._inscricaoEstadualDoSubstitutoTributario = removerMascara(_inscricaoEstadualDoSubstitutoTributario);
        return this;
    };

    Danfe.prototype.getValorDoFrete = function() {
        return this._valorDoFrete || 0;
    };

    Danfe.prototype.getValorDoFreteFormatado = function() {
        return formatarDinheiro(this.getValorDoFrete(), {
            simbolo: ''
        });
    };

    Danfe.prototype.comValorDoFrete = function(_valorDoFrete) {
        this._valorDoFrete = _valorDoFrete;
        return this;
    };

    Danfe.prototype.getValorDoSeguro = function() {
        return this._valorDoSeguro || 0;
    };

    Danfe.prototype.getValorDoSeguroFormatado = function() {
        return formatarDinheiro(this.getValorDoSeguro(), {
            simbolo: ''
        });
    };

    Danfe.prototype.comValorDoSeguro = function(_valorDoSeguro) {
        this._valorDoSeguro = _valorDoSeguro;
        return this;
    };

    Danfe.prototype.getDesconto = function() {
        return this._desconto || 0;
    };

    Danfe.prototype.getDescontoFormatado = function() {
        return formatarDinheiro(this.getDesconto(), {
            simbolo: ''
        });
    };

    Danfe.prototype.comDesconto = function(_desconto) {
        this._desconto = _desconto;
        return this;
    };

    Danfe.prototype.getOutrasDespesas = function() {
        return this._outrasDespesas || 0;
    };

    Danfe.prototype.getOutrasDespesasFormatado = function() {
        return formatarDinheiro(this.getOutrasDespesas(), {
            simbolo: ''
        });
    };

    Danfe.prototype.comOutrasDespesas = function(_outrasDespesas) {
        this._outrasDespesas = _outrasDespesas;
        return this;
    };

    Danfe.prototype.getTipo = function() {
        return this._tipo;
    };

    Danfe.prototype.getTipoFormatado = function() {
        return {
            entrada: '0',
            saida: '1'
        }[this.getTipo()] || '';
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
        if(this.getNumero()) {
            return 'Nº. ' + formatarNumero(this.getNumero());
        }

        return '';
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
        if(this.getSerie()) {
            return 'SÉRIE ' + formatarSerie(this.getSerie());
        }

        return '';
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
        return this._chaveDeAcesso || '';
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
        if(this.getDataDaEmissao()) {
            return formatarData(this.getDataDaEmissao());
        }

        return '';
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
        if(this.getDataDaEntradaOuSaida()) {
            return formatarData(this.getDataDaEntradaOuSaida());
        }

        return '';
    };

    Danfe.prototype.getHorarioDaEntradaOuSaida = function() {
        if(this.getDataDaEntradaOuSaida()) {
            return formatarHora(this.getDataDaEntradaOuSaida());
        }

        return '';
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

    Danfe.prototype.getVolumes = function() {
        return this._volumes;
    };

    Danfe.prototype.comVolumes = function(_volumes) {
        this._volumes = _volumes;
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
        }[this.getModalidadeDoFrete()] || '';
    };

    Danfe.prototype.getNaturezaDaOperacao = function() {
        return this._naturezaDaOperacao || '';
    };

    Danfe.prototype.comNaturezaDaOperacao = function(_naturezaDaOperacao) {
        this._naturezaDaOperacao = _naturezaDaOperacao;
        return this;
    };

    return Danfe;
})();

module.exports = Danfe;
