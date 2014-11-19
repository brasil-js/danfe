'use strict';

var fs = require('fs'),
    path = require('path'),
    Gerador = require('../lib/gerador'),
    Danfe = require('../lib/danfe'),
    Emitente = require('../lib/emitente'),
    Destinatario = require('../lib/destinatario'),
    Transportador = require('../lib/transportador'),
    Endereco = require('../lib/endereco'),
    pathDoArquivoPdf = path.join(__dirname, 'danfe.pdf'),
    gerador;

module.exports = {
    setUp: function(callback) {
        var emitente = new Emitente();
        emitente.comNome('Acme Indústria de Testes Unitários S/A');
        emitente.comRegistroNacional('14.625.996/0001-35');
        emitente.comInscricaoEstadual('03.707.130-0');
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
        transportador.comEndereco(new Endereco()
                    .comLogradouro('Rua Imaginária')
                    .comNumero('S/N')
                    .comCep('70000000')
                    .comBairro('Bairro Alto')
                    .comMunicipio('Cocalzinho de Goiás')
                    .comCidade('Cocalzinho de Goiás')
                    .comUf('GO'));

        var danfe = new Danfe();
        danfe.comEmitente(emitente);
        danfe.comDestinatario(destinatario);
        danfe.comTransportador(transportador);
        danfe.comTipo('saida');
        danfe.comNaturezaDaOperacao('VENDA');
        danfe.comNumero(1420);
        danfe.comSerie(100);
        danfe.comDataDaEmissao(new Date(2014, 10, 19));
        danfe.comDataDaEntradaOuSaida(new Date(2014, 10, 19, 12, 43, 59));
        danfe.comModalidadeDoFrete('porContaDoDestinatarioRemetente');
        danfe.comInscricaoEstadualDoSubstitutoTributario('102959579');
        danfe.comInformacoesComplementares('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum nihil aut nostrum');

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
