'use strict';

var fs = require('fs'),
    path = require('path'),

    Gerador = require('../lib/gerador'),
    Danfe = require('../lib/danfe'),
    FormularioDeSeguranca = require('../lib/formularioDeSeguranca'),
    Emitente = require('../lib/emitente'),
    Fatura = require('../lib/fatura'),
    // Duplicata = require('../lib/duplicata'),
    Destinatario = require('../lib/destinatario'),
    Transportador = require('../lib/transportador'),
    Endereco = require('../lib/endereco'),
    Protocolo = require('../lib/protocolo'),
    Impostos = require('../lib/impostos'),
    Volumes = require('../lib/volumes'),
    Item = require('../lib/item'),

    pathDoArquivoPdf = path.join(__dirname, 'danfe.pdf'),
    gerador;

module.exports = {
    setUp: function(callback) {
        var emitente = new Emitente();
        emitente.comNome('Acme Indústria de Testes Unitários S/A');
        emitente.comLogotipo(path.join(__dirname, './logotipo.png'));
        emitente.comRegistroNacional('14.625.996/0001-35');
        emitente.comInscricaoEstadual('03.707.130-0');
        emitente.comInscricaoMunicipal('12.34.56-78');
        emitente.comTelefone('(61) 3322-4455');
        emitente.comEmail('contato@acme.ind.br');
        emitente.comEndereco(new Endereco()
                    .comLogradouro('Rua dos Testes')
                    .comNumero('42')
                    .comComplemento('Sala 1389 - Ed. Nodeunit')
                    .comCep('72.100-300')
                    .comBairro('Bairro da Integração')
                    .comMunicipio('Testolândia')
                    .comCidade('Belo Horizonte')
                    .comUf('MG'));

        var destinatario = new Destinatario();
        destinatario.comNome('Cliente Feliz da Silva');
        destinatario.comRegistroNacional('250.796.466-91');
        destinatario.comTelefone('2123124389');
        destinatario.comEndereco(new Endereco()
                    .comLogradouro('Av. Brasil')
                    .comNumero('132')
                    .comComplemento('Fundos')
                    .comCep('71.010-130')
                    .comBairro('Padre Miguel')
                    .comMunicipio('Rio de Janeiro')
                    .comCidade('Rio de Janeiro')
                    .comUf('RJ'));

        var transportador = new Transportador();
        transportador.comNome('Carroceria Cheia Transportes Ltda');
        transportador.comRegistroNacional('28.124.151/0001-70');
        transportador.comInscricaoEstadual('0731778300131');
        transportador.comCodigoAntt('ASDASD');
        transportador.comPlacaDoVeiculo('ZZZ-9090');
        transportador.comUfDaPlacaDoVeiculo('AP');
        transportador.comEndereco(new Endereco()
                    .comLogradouro('Rua Imaginária')
                    .comNumero('S/N')
                    .comCep('70000000')
                    .comBairro('Bairro Alto')
                    .comMunicipio('Cocalzinho de Goiás')
                    .comCidade('Cocalzinho de Goiás')
                    .comUf('GO'));

        var protocolo = new Protocolo();
        protocolo.comCodigo('123451234512345');
        protocolo.comData(new Date(2014, 10, 19, 13, 24, 35));

        var impostos = new Impostos();
        impostos.comBaseDeCalculoDoIcms(100);
        impostos.comValorDoIcms(17.5);
        impostos.comBaseDeCalculoDoIcmsSt(90);
        impostos.comValorDoIcmsSt(6.83);
        impostos.comValorDoImpostoDeImportacao(80);
        impostos.comValorDoPis(70);
        impostos.comValorTotalDoIpi(60);
        impostos.comValorDaCofins(50);
        // impostos.comBaseDeCalculoDoIssqn(40);
        // impostos.comValorTotalDoIssqn(30);

        var volumes = new Volumes();
        volumes.comQuantidade(1342);
        volumes.comEspecie('À GRANEL');
        volumes.comMarca('Apple');
        volumes.comNumeracao('AB73256343-4');
        volumes.comPesoBruto('1.578Kg');
        volumes.comPesoLiquido('1.120Kg');

        var fatura = new Fatura();
        // fatura.comNumero(13243);
        // fatura.comValorOriginal(230.40);
        // fatura.comValorDoDesconto(0.40);
        // fatura.comValorLiquido(230);
        fatura.comPagamentoAPrazo();

        var formularioDeSeguranca = new FormularioDeSeguranca();
        formularioDeSeguranca.comDestaqueDeIcmsProprio(true);
        formularioDeSeguranca.comDestaqueDeIcmsPorST(false);
        formularioDeSeguranca.comJustificativa('PROBLEMAS COM A INTERNET');
        formularioDeSeguranca.comDataDaEntradaEmContingencia(new Date());

        var danfe = new Danfe();
        danfe.comChaveDeAcesso('52131000132781000178551000000153401000153408');
        danfe.comFormularioDeSeguranca(formularioDeSeguranca);
        danfe.comEmitente(emitente);
        danfe.comDestinatario(destinatario);
        danfe.comTransportador(transportador);
        danfe.comProtocolo(protocolo);
        danfe.comImpostos(impostos);
        danfe.comVolumes(volumes);
        danfe.comFatura(fatura);

        // for (var w = 0; w < 12; w++) {
        //     var duplicata = new Duplicata();
        //     duplicata.comNumero(w);
        //     duplicata.comVencimento(new Date(2016, w, 10));
        //     duplicata.comValor(20.30 + (w * 4));

        //     danfe.adicionarDuplicata(duplicata);
        // }

        danfe.comTipo('saida');
        danfe.comNaturezaDaOperacao('VENDA');
        danfe.comNumero(1420);
        danfe.comSerie(100);
        danfe.comDataDaEmissao(new Date(2014, 10, 19));
        danfe.comDataDaEntradaOuSaida(new Date(2014, 10, 19, 12, 43, 59));
        danfe.comModalidadeDoFrete('porContaDoDestinatarioRemetente');
        danfe.comInscricaoEstadualDoSubstitutoTributario('102959579');
        danfe.comInformacoesComplementares('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum nihil aut nostrum');
        danfe.comValorTotalDaNota(250.13);
        danfe.comValorTotalDosProdutos(120.10);
        danfe.comValorTotalDosServicos(130.03);
        danfe.comValorDoFrete(23.34);
        danfe.comValorDoSeguro(78.65);
        danfe.comDesconto(1.07);
        danfe.comOutrasDespesas(13.32);

        for (var i = 0; i < 8; i++) {
            danfe.adicionarItem(new Item()
                .comCodigo('' + i)
                .comDescricao('Produto')
                .comInformacoesAdicionais('Informação adicional!')
                .comNcmSh('15156000')
                .comOCst('020')
                .comCfop('6101')
                .comUnidade('LT')
                .comQuantidade(3.1415)
                .comValorUnitario(2.31)
                .comValorTotal(7.13)
                .comBaseDeCalculoDoIcms(5.01)
                .comValorDoIcms(0.67)
                .comValorDoIpi(0.03)
                .comAliquotaDoIcms(0.1753)
                .comAliquotaDoIpi(0.0034));
        }

        gerador = new Gerador(danfe);
        callback();
    },

    tearDown: function(callback) {
        // if(fs.existsSync(pathDoArquivoPdf)) {
        //     fs.unlinkSync(pathDoArquivoPdf);
        // }

        callback();
    },

    'É possível instanciar um gerador': function(test) {
        test.ok(gerador);
        test.done();
    },

    gerarPDF: {
        'Testa geração do PDF': function(test) {
            gerador.gerarPDF({
                ambiente: 'homologacao',
                ajusteYDoLogotipo: -4,
                ajusteYDaIdentificacaoDoEmitente: 4,
                creditos: 'Gammasoft Desenvolvimento de Software Ltda - http://opensource.gammasoft.com.br'
            }, function(err, pdf) {
                test.ifError(err);

                var ws = fs.createWriteStream(pathDoArquivoPdf);

                pdf.pipe(ws);

                ws.on('close', function() {
                    test.ok(fs.existsSync(pathDoArquivoPdf));
                    test.done();
                });
            });
        }
    }
};
