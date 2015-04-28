'use strict';

var path = require('path'),

    gammautils = require('gammautils'),
    barcode = gammautils.barcode,
    merge = gammautils.object.merge,
    Pdf = require('pdfkit'),

    diretorioDeFontes = path.join(__dirname, './fontes'),
    timesNewRoman = path.join(diretorioDeFontes, 'Times New Roman.ttf'),
    timesNewRomanNegrito = path.join(diretorioDeFontes, 'Times New Roman Bold.ttf'),
    timesNewRomanItalico = path.join(diretorioDeFontes, 'Times New Roman Italic.ttf'),
    timesNewRomanNegritoItalico = path.join(diretorioDeFontes, 'Times New Roman Bold Italic.ttf');

var pdfDefaults = {
    ajusteY: 0,
    ajusteX: 0,
    autor: '',
    titulo: '',
    criador: '',

    tamanhoDaFonteDoTitulo: 6,
    corDoTitulo: 'black',
    alinhamentoDoTitulo: 'left',
    alinhamentoDoTituloDaTabela: 'center',

    tamanhoDaFonteDaSecao: 7,
    corDaSecao: 'black',

    tamanhoDaFonteDoCampo: 9.5,
    alinhamentoDoCampo: 'center',
    corDoCampo: 'black',

    tamanhoDaFonteDosItens: 7,
    separadorDeItens: true,

    ajusteYDoLogotipo: 0,
    ajusteYDaIdentificacaoDoEmitente: 0,

    ambiente: 'producao',
    opacidadeDaHomologacao: 0.2,
    ajusteYDaHomologacao: 275,

    tamanhoDoCodigoDeBarras: 32,
    corDoLayout: 'black',
    larguraDaPagina: 595.44,
    alturaDaPagina: 841.68,
    creditos: 'Impresso com Brasil.js - http://github.com/brasil-js/danfe'
};

module.exports = function(danfe, args, callback) {
    if(typeof args === 'function') {
        callback = args;
        args = pdfDefaults;
    }

    args = merge(pdfDefaults, args);

    var emitente = danfe.getEmitente(),
        destinatario = danfe.getDestinatario(),
        transportador = danfe.getTransportador(),
        impostos = danfe.getImpostos(),
        volumes = danfe.getVolumes(),
        protocolo = danfe.getProtocolo(),
        itens = danfe.getItens(),
        fatura = danfe.getFatura(),
        alturaDoBlocoFaturaDuplicatas = 0,
        duplicatas = danfe.getDuplicatas(),
        pdf = new Pdf({
            bufferPages: true,
            margin: 0,
            size: [
                args.larguraDaPagina,
                args.alturaDaPagina
            ],
            info: {
                Author: args.autor,
                Title: args.titulo,
                Creator: args.criador,
                Producer: 'http://github.com/brasil-js/danfe'
            }
        }),
        pdfTemporario = new Pdf({
            //TODO: Verificar se a criação deste pdf temporario
            //      está causando problemas de performance
            margin: 0,
            size: [
                args.larguraDaPagina,
                args.alturaDaPagina
            ]
        }),
        deveExibirQuadroDeCalculoDoIssqn =
            danfe.getValorTotalDosServicos() ||
            impostos.getBaseDeCalculoDoIssqn() ||
            impostos.getValorTotalDoIssqn();

    if(args.stream) {
        pdf.pipe(args.stream);
    }

    pdf.registerFont('normal', timesNewRoman);
    pdf.registerFont('negrito', timesNewRomanNegrito);
    pdf.registerFont('italico', timesNewRomanItalico);
    pdf.registerFont('negrito-italico', timesNewRomanNegritoItalico);
    pdf.registerFont('codigoDeBarras', barcode.code128.font);
    pdfTemporario.registerFont('normal', timesNewRoman);

    ///////// LAYOUT

    var grossuraDaLinha = 0.5,
        margemTopo = 2.8,
        margemEsquerda = 3,
        margemDireita = 589.65,
        larguraDoFormulario = margemDireita - margemEsquerda;

    pdf.lineWidth(grossuraDaLinha);

    function linhaHorizontal(x1, x2, y, cor) {
        y = margemTopo + args.ajusteY + y;
        x1 = margemEsquerda + args.ajusteX + x1;
        x2 = margemDireita + args.ajusteX + x2;

        return pdf.moveTo(x1, y).lineTo(x2, y).dash(false).stroke(cor || args.corDoLayout);
    }

    function linhaHorizontalTracejada(x1, x2, y) {
        y = margemTopo + args.ajusteY + y;
        x1 = margemEsquerda + args.ajusteX + x1;
        x2 = margemDireita + args.ajusteX + x2;

        return pdf.moveTo(x1, y).lineTo(x2, y).dash(3, { space: 5 }).stroke(args.corDoLayout);
    }

    function linhaVertical(y1, y2, x, cor) {
        x = margemEsquerda + args.ajusteX + x;
        y1 = margemTopo + args.ajusteY + y1;
        y2 = margemTopo + args.ajusteY + y2;

        return pdf.moveTo(x, y1).lineTo(x, y2).dash(false).stroke(cor || args.corDoLayout);
    }

    function secao(string, x, y, largura, alinhamento, tamanho) {
        string = string || '';

        x = margemEsquerda + args.ajusteX + x;
        y = margemTopo + args.ajusteY + y;
        pdf.font('negrito')
            .fillColor(args.corDaSecao)
            .fontSize(tamanho || args.tamanhoDaFonteDaSecao)
            .text(string.toUpperCase(), x, y, {
                width: largura,
                align: 'left'
            });
    }

    function titulo(string, x, y, largura, alinhamento, tamanho) {
        string = typeof string !== 'undefined' && string !== null && string.toString() || '';

        x = margemEsquerda + args.ajusteX + x;
        y = margemTopo + args.ajusteY + y;

        pdf.font('normal')
            .fillColor(args.corDoTitulo)
            .fontSize(tamanho || args.tamanhoDaFonteDoTitulo)
            .text(string.toUpperCase(), x, y, {
                width: largura,
                align: alinhamento || args.alinhamentoDoTitulo
            });
    }

    function normal(string, x, y, largura, alinhamento, tamanho, _pdf) {
        string = string || '';

        (_pdf || pdf).font('normal')
            .fillColor(args.corDoTitulo)
            .fontSize(tamanho || 8)
            .text(string,
                margemEsquerda + args.ajusteX + x,
                margemTopo + args.ajusteY + y, {
                width: largura,
                align: alinhamento || 'center',
                lineGap: -1.5
            });
    }

    function italico(string, x, y, largura, alinhamento, tamanho) {
        string = string || '';

        pdf.font('italico')
            .fillColor(args.corDoTitulo)
            .fontSize(tamanho || 6)
            .text(string,
                margemEsquerda + args.ajusteX + x,
                margemTopo + args.ajusteY + y, {
                width: largura,
                align: alinhamento || 'center',
                lineGap: -1.5
            });
    }

    function negrito(string, x, y, largura, alinhamento, tamanho) {
        string = string || '';

        pdf.font('negrito')
            .fillColor(args.corDoTitulo)
            .fontSize(tamanho || 6)
            .text(string,
                margemEsquerda + args.ajusteX + x,
                margemTopo + args.ajusteY + y, {
                width: largura,
                align: alinhamento || 'center',
                lineGap: -1.5
            });
    }

    function campo(string, x, y, largura, alinhamento, tamanho) {
        string = string || '';

        pdf.font('negrito')
            .fillColor(args.corDoCampo)
            .fontSize(tamanho || args.tamanhoDaFonteDoCampo)
            .text(string,
                margemEsquerda + args.ajusteX + x,
                margemTopo + args.ajusteY + y, {
                width: largura,
                align: alinhamento || args.alinhamentoDoCampo
            });
    }

    function desenharPagina() {
        if(args.ambiente !== 'producao') {
            pdf.font('normal')
                .fillColor(args.corDoTitulo)
                .fontSize(50)
                .fillOpacity(args.opacidadeDaHomologacao)
                .text('HOMOLOGAÇÃO',
                    margemEsquerda + args.ajusteX + 0,
                    margemTopo + args.ajusteY + 400 + args.ajusteYDaHomologacao, {
                    width: larguraDoFormulario,
                    align: 'center'
                });

            pdf.font('normal')
                .fillColor(args.corDoTitulo)
                .fontSize(25)
                .fillOpacity(args.opacidadeDaHomologacao)
                .text('SEM VALOR FISCAL',
                    margemEsquerda + args.ajusteX + 0,
                    margemTopo + args.ajusteY + 450 + args.ajusteYDaHomologacao, {
                    width: larguraDoFormulario,
                    align: 'center'
                });
        }

        //RECIBO
        linhaHorizontal(0, 0, 0);
        linhaHorizontal(0, -110.5, 28.3);
        linhaHorizontal(0, 0, 51.1);

        linhaVertical(0, 51.1, 0);
        linhaVertical(28.3, 51.1, 99.2);
        linhaVertical(0, 51.1, 476);
        linhaVertical(0, 51.1, 0);
        linhaVertical(0, 51.1, larguraDoFormulario);

        //PRIMEIRO BLOCO
        //QUADRADO DO TIPO (ENTRADA OU SAIDA)
        linhaHorizontal(317.4, -255, 96.4);
        linhaVertical(96.4,  116.2, 317.4);
        linhaHorizontal(317.4, -255, 116.2);
        linhaVertical(96.4,  116.2, 331.55);

        linhaHorizontal(0, 0, 59.55);
        linhaHorizontal(340.05, 0, 104.8);
        linhaHorizontal(340.05, 0, 127.4);
        linhaHorizontal(0, 0, 150.2);
        linhaHorizontal(0, 0, 170);
        linhaHorizontal(0, 0, 190);

        linhaVertical(59.55, 190, 0);
        linhaVertical(59.55, 150.2, 240.75);
        linhaVertical(59.55, 170, 340.05);
        linhaVertical(59.55, 190, larguraDoFormulario);
        linhaVertical(170, 190, 195.55);
        linhaVertical(170, 190, 391);

        //SEGUNDO BLOCO
        linhaHorizontal(0, 0, 201.2);
        linhaHorizontal(0, 0, 221);
        linhaHorizontal(0, 0, 241);
        linhaHorizontal(0, 0, 261);

        linhaVertical(201.2, 261, 0);
        linhaVertical(201.2, 221, 357.1);
        linhaVertical(221, 261, 274.9);
        linhaVertical(241, 261, 297.6);
        linhaVertical(221, 261, 396.75);
        linhaVertical(201.2, 261, 493.1);
        linhaVertical(201.2, 261, larguraDoFormulario);

        //TERCEIRO BLOCO
        linhaHorizontal(0, 0, 269);
        linhaHorizontal(0, 0, 289);
        linhaHorizontal(0, 0, 309);

        linhaVertical(269, 309, 0);
        linhaVertical(269, 309, 87.7);
        linhaVertical(269, 309, (87.7 * 2) + 0.3);
        linhaVertical(269, 309, (87.7 * 3) + 0.4);
        linhaVertical(269, 309, (87.7 * 4) + 0.4);
        linhaVertical(269, 309, (87.7 * 5) + 0.6);
        linhaVertical(269, 309, (87.7 * 5) + 51.8);
        linhaVertical(269, 309, larguraDoFormulario);

        //QUARTO BLOCO
        linhaHorizontal(0, 0, 320);
        linhaHorizontal(0, 0, 340);
        linhaHorizontal(0, 0, 360);
        linhaHorizontal(0, 0, 380);

        linhaVertical(320, 380, 0);
        linhaVertical(320, 340, 170);
        linhaVertical(320, 340, 346);
        linhaVertical(320, 360, 434);
        linhaVertical(320, 360, 456.65);
        linhaVertical(320, 380, 258);
        linhaVertical(360, 380, 59.6);
        linhaVertical(360, 380, 158.6);
        linhaVertical(360, 380, 357);
        linhaVertical(360, 380, 473.3);
        linhaVertical(320, 380, larguraDoFormulario);

        //QUINTO BLOCO - LISTA DE PRODUTOS
        var alturaInicialDoQuadroDeItens = 391,
            alturaInicialDoQuadroDeDuplicatas = alturaInicialDoQuadroDeItens,
            alturaDeLinhaDeDuplicata = 23,
            duplicatasPorLinha = 8,
            larguraDaDuplicata = larguraDoFormulario / duplicatasPorLinha,
            segundaLinhaDoQuadroDeItens,
            linhasDeDuplicatas = 0;

        if(fatura) {
            alturaDoBlocoFaturaDuplicatas += args.tamanhoDaFonteDoTitulo;
            alturaInicialDoQuadroDeDuplicatas += 6.5;
        }

        if(duplicatas.length) {
            linhasDeDuplicatas = Math.ceil(duplicatas.length / duplicatasPorLinha);
            alturaDoBlocoFaturaDuplicatas += (linhasDeDuplicatas * alturaDeLinhaDeDuplicata) + 10;
        } else {
            alturaDoBlocoFaturaDuplicatas += args.tamanhoDaFonteDoTitulo + 3;
        }

        duplicatas = gammautils.array.chop(duplicatas, duplicatasPorLinha);

        var margemDeCimaDaDuplicata = 2,
            margemEsquerdaDaDuplicata = 2,
            larguraDaDuplicataComMargem = larguraDaDuplicata - margemEsquerdaDaDuplicata - 1;

        duplicatas.forEach(function(linha, indiceDaLinha) {
            var x1, x2, y;

            linha.forEach(function(duplicata, indiceDaDuplicata) {
                x1 = indiceDaDuplicata * larguraDaDuplicata;
                x2 = x1 + larguraDaDuplicata - larguraDoFormulario;
                y = alturaInicialDoQuadroDeDuplicatas + (indiceDaLinha * alturaDeLinhaDeDuplicata);

                linhaHorizontal(x1, x2, y);
                linhaVertical(y, y + alturaDeLinhaDeDuplicata, x1);

                titulo('NÚM.', x1 + margemEsquerdaDaDuplicata, y + margemDeCimaDaDuplicata, larguraDaDuplicataComMargem);
                titulo(duplicata.getNumero(), x1 + margemEsquerdaDaDuplicata, y + margemDeCimaDaDuplicata, larguraDaDuplicataComMargem, 'right');

                titulo('VENC.', x1 + margemEsquerdaDaDuplicata, y + margemDeCimaDaDuplicata + args.tamanhoDaFonteDoTitulo, larguraDaDuplicataComMargem, 'left');
                titulo(duplicata.getVencimentoFormatado(), x1 + margemEsquerdaDaDuplicata, y + margemDeCimaDaDuplicata + args.tamanhoDaFonteDoTitulo, larguraDaDuplicataComMargem, 'right');

                titulo('VALOR', x1 + margemEsquerdaDaDuplicata, y + margemDeCimaDaDuplicata + (2 * args.tamanhoDaFonteDoTitulo), larguraDaDuplicataComMargem, 'left');
                titulo(duplicata.getValorFormatado(), x1 + margemEsquerdaDaDuplicata, y + margemDeCimaDaDuplicata + (2 * args.tamanhoDaFonteDoTitulo), larguraDaDuplicataComMargem, 'right');
            });

            linhaVertical(y, y + alturaDeLinhaDeDuplicata, x1 + larguraDaDuplicata);
            linhaHorizontal(0, x2, y + alturaDeLinhaDeDuplicata);
        });

        //

        alturaInicialDoQuadroDeItens += alturaDoBlocoFaturaDuplicatas;
        segundaLinhaDoQuadroDeItens = alturaInicialDoQuadroDeItens + 14.2;

        linhaHorizontal(0, 0, alturaInicialDoQuadroDeItens);
        linhaHorizontal(0, 0, segundaLinhaDoQuadroDeItens);
        linhaHorizontal(0, 0, 751);

        linhaVertical(alturaInicialDoQuadroDeItens, 751, 0);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 53.8);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 235.3);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 269.3);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 292);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 314.5);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 331.6);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 371.2);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 405.4);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 439.3);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 473.2);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 507.2);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 535.6);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 555.4);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, larguraDoFormulario);

        var alturaInicialDoSetimoBloco = 793.6;

        //SEXTO BLOCO
        if(deveExibirQuadroDeCalculoDoIssqn) {
            linhaHorizontal(0, 0, 762.2);
            linhaHorizontal(0, 0, 782.2);

            linhaVertical(762.2, 782.2, 0);
            linhaVertical(762.2, 782.2, 136.1);
            linhaVertical(762.2, 782.2, (136.1 * 2) - 0.1);
            linhaVertical(762.2, 782.2, (136.1 * 3) - 0.1);
            linhaVertical(762.2, 782.2, larguraDoFormulario);
        } else {
            alturaInicialDoSetimoBloco = 762.2;
        }

        // SÉTIMO BLOCO
        linhaHorizontal(0, 0, alturaInicialDoSetimoBloco); // x1, x2, y
        linhaHorizontal(0, 0, 821.8);

        linhaVertical(alturaInicialDoSetimoBloco, 821.8, 0);
        linhaVertical(alturaInicialDoSetimoBloco, 821.8, 388.25);
        linhaVertical(alturaInicialDoSetimoBloco, 821.8, larguraDoFormulario);

        //  Deve ser a última linha pois não estou conseguindo
        //  retirar o tracejado após utiliza-lo pela primeira vez
        linhaHorizontalTracejada(0, 0, 55.32);

        // MARGENS DA IMPRESSORA (ÚTIL PARA DEBUG)
        // linhaHorizontal(0, args.larguraDaPagina, 18, 'red');
        // linhaHorizontal(0, args.larguraDaPagina, args.alturaDaPagina - 18, 'red');
        // linhaVertical(0, args.alturaDaPagina, 18, 'red');
        // linhaVertical(0, args.alturaDaPagina, args.larguraDaPagina - 22, 'red');

        normal([
            'Recebemos de',
            emitente.getNome(),
            'os produtos e/ou serviços constantes da nota',
            'fiscal eletrônica indicada abaixo.',
            'Emissão:',
            danfe.getDataDaEmissaoFormatada(),
            '- Valor Total:',
            danfe.getValorTotalDaNotaFormatado(),
            '- Destinatário:',
            destinatario.getNome(),
            '- Endereço:',
            destinatario.getEndereco().getPrimeiraLinha()
        ].join(' ').toUpperCase(), 1.5, 3, 472.5, 'justify', 6.9);

        titulo('DANFE', 266.5, 63.5, 197, 'left', 14);
        normal('NF-e', 476.6, 1.8, 110, 'center', 14);
        normal(danfe.getNumeroFormatado(), 476.6, 22, 110, 'center', 10);
        normal(danfe.getSerieFormatada(), 476.6, 31.5, 110, 'center', 10);

        italico('IDENTIFICAÇÃO DO EMITENTE', 1, 60, 238);

        var temLogotipo = emitente.getLogotipo(),
            identificacaoDoEmitenteY = temLogotipo ? 78 : 84,
            identificacaoDoEmitenteX = temLogotipo ? 67 : 1.5,
            identificacaoDoEmitenteLargura = temLogotipo ? 172 : 237,//
            identificacaoDoEmitenteFonte = temLogotipo ? 0 : 1.5;

        if(temLogotipo) {
            var caminhoDoLogotipo = emitente.getLogotipo();
            pdf.image(caminhoDoLogotipo, margemEsquerda + args.ajusteX + 4.5, margemTopo + args.ajusteY + args.ajusteYDoLogotipo + 78, {
                fit: [60, 60]
            });
        }

        negrito(emitente.getNome(), identificacaoDoEmitenteX, identificacaoDoEmitenteY + args.ajusteYDaIdentificacaoDoEmitente, identificacaoDoEmitenteLargura, 'center', 8 + identificacaoDoEmitenteFonte);

        if(emitente.getEndereco().getPrimeiraLinha()) {
            normal(emitente.getEndereco().getPrimeiraLinha(),
                identificacaoDoEmitenteX,
                pdf.y - margemTopo + 2,
            identificacaoDoEmitenteLargura, 'center', 6 + identificacaoDoEmitenteFonte);
        }

        if(emitente.getEndereco().getSegundaLinha()) {
            normal(emitente.getEndereco().getSegundaLinha(),
                identificacaoDoEmitenteX,
                pdf.y - margemTopo,
            identificacaoDoEmitenteLargura, 'center', 6 + identificacaoDoEmitenteFonte);
        }

        var jaAdicionouEspacamento = false;

        if(emitente.getTelefone()) {
            jaAdicionouEspacamento = true;

            normal('Telefone: ' + emitente.getTelefoneFormatado(),
                identificacaoDoEmitenteX,
                pdf.y - margemTopo + 2,
            identificacaoDoEmitenteLargura, 'center', 6 + identificacaoDoEmitenteFonte);
        }

        if(emitente.getEmail()) {
            normal('Email: ' + emitente.getEmail(),
                identificacaoDoEmitenteX,
                pdf.y - margemTopo + (jaAdicionouEspacamento ? 0 : 2),
            identificacaoDoEmitenteLargura, 'center', 6 + identificacaoDoEmitenteFonte);
        }

        normal('Documento Auxiliar da Nota Fiscal Eletrônica', 241.5, 77, 99.5);

        normal('0 - ENTRADA', 248, 100, 99.5, 'left');
        normal('1 - SAÍDA', 248, 108.5, 99.5, 'left');
        negrito(danfe.getTipoFormatado(), 317.5, 96.8, 14.5, 'center', 18);

        // CAMPO OPCIONAL 1 - FSDA
        var formularioDeSeguranca = danfe.getFormularioDeSeguranca();

        if(protocolo.getFormatacao()) {
            normal('Consulta de autenticidade no portal nacional da NF-e', 340.5, 130, 244);
            normal('www.nfe.fazenda.gov.br/portal ou no site da Sefaz Autorizadora', 340.5, 138, 244);
        } else if(formularioDeSeguranca) {
            pdf.font('codigoDeBarras')
                .fontSize(18.5)
                .text(barcode.code128.encode(formularioDeSeguranca.getDadosDaNfe()), 341.5, 131.5, {
                    align: 'center',
                    width: 250
                });
        }

        var informacoesComplementares = [
            danfe.getInformacoesComplementares()
        ];

        if(formularioDeSeguranca) {
            informacoesComplementares.unshift([
                'DANFE EM CONTINGÊNCIA, ',
                'IMPRESSO EM DECORRÊNCIA DE PROBLEMAS TÉCNICOS: ',
                formularioDeSeguranca.getJustificativa().toUpperCase(),
            ].join(''));
        }

        normal(informacoesComplementares.join(' - '), 1, alturaInicialDoSetimoBloco + 7.5, 386, 'justify', 6);
        normal(danfe.getNumeroFormatado(), 241.2, 119.5, 98.5, 'center', 10);
        normal(danfe.getSerieFormatada(), 241.2, 129.5, 98.5, 'center', 10);

        //RECIBO
        titulo('DATA DE RECEBIMENTO', 1.5, 29, 97);
        titulo('IDENTIFICAÇÃO E ASSINATURA DO RECEBEDOR', 100.5, 29, 374);

        var codigoDeBarrasCodificado = barcode.code128.encode(danfe.getChaveDeAcesso());
        if(danfe.getChaveDeAcesso()) {
            pdf.font('codigoDeBarras')
                .fontSize(args.tamanhoDoCodigoDeBarras)
                .text(codigoDeBarrasCodificado, args.ajusteX + margemEsquerda + 339, args.ajusteY + margemTopo + 65, {
                    align: 'center',
                    width: 249
                });
        }

        //PRIMEIRO BLOCO
        titulo('CHAVE DE ACESSO', 341.5, 105.5, 244);
        campo(danfe.getChaveDeAcessoFormatada(), 341.5, 114, 244);

        if(protocolo.getFormatacao()) {
            titulo('PROTOCOLO DE AUTORIZAÇÃO DE USO', 341.5, 151, 244);
            campo(protocolo.getFormatacao(), 341.5, 158.4, 244);
        } else if(formularioDeSeguranca) {
            titulo('DADOS DA NFE', 341.5, 151, 244);
            campo(formularioDeSeguranca.getDadosDaNfeFormatado(), 341.5, 158.4, 244);
        }

        titulo('NATUREZA DA OPERAÇÃO', 1.5, 151, 338);
        campo(danfe.getNaturezaDaOperacao(), 1.5, 158.4, 338);

        titulo('INSCRIÇÃO ESTADUAL', 1.5, 171, 192.5);
        campo(emitente.getInscricaoEstadual(), 1.5, 178.4, 192.5);

        titulo('INSCRIÇÃO ESTADUAL DO SUBST. TRIBUT.', 197, 171, 192.5);
        campo(danfe.getInscricaoEstadualDoSubstitutoTributario(), 197, 178.4, 192.5);

        titulo('CNPJ', 392.5, 171, 192.5);
        campo(emitente.getRegistroNacionalFormatado(), 392.5, 178.4, 192.5);

        //SEGUNDO BLOCO
        secao('DESTINATÁRIO / REMETENTE', 1.5, 194);
        titulo('NOME / RAZÃO SOCIAL', 1.5, 202, 353.5);
        campo(destinatario.getNome(), 1.5, 210, 353.5, 'left');

        titulo('CNPJ / CPF', 358, 202, 133.5);
        campo(destinatario.getRegistroNacionalFormatado(), 358, 210, 133.5);

        titulo('DATA DA EMISSÃO', 495, 202, 90);
        campo(danfe.getDataDaEmissaoFormatada(), 495, 210, 90);

        titulo('ENDEREÇO', 1.5, 222, 272);
        campo(destinatario.getEndereco().getPrimeiraLinha(), 1.5, 230, 272, 'left', args.tamanhoDaFonteDoCampo - 0.5);

        titulo('BAIRRO / DISTRITO', 276, 222, 119);
        campo(destinatario.getEndereco().getBairro(), 276, 230, 119);

        titulo('CEP', 398, 222, 93);
        campo(destinatario.getEndereco().getCepFormatado(), 398, 230, 93);

        titulo('DATA DA SAÍDA', 495, 222, 90);
        campo(danfe.getDataDaEntradaOuSaidaFormatada(), 495, 230, 90);

        titulo('MUNICÍPIO', 1.5, 242, 272);
        campo(destinatario.getEndereco().getMunicipio(), 1.5, 250, 272, 'left');

        titulo('UF', 276, 242, 20);
        campo(destinatario.getEndereco().getUf(), 276, 250, 20);

        titulo('FONE / FAX', 299, 242, 96);
        campo(destinatario.getTelefoneFormatado(), 299, 250, 96);

        titulo('INSCRIÇÃO ESTADUAL', 398, 242, 93);
        campo(destinatario.getInscricaoEstadual(), 398, 250, 93);

        titulo('HORA DA SAÍDA', 495, 242, 90);
        campo(danfe.getHorarioDaEntradaOuSaida(), 495, 250, 90);

        //TERCEIRO BLOCO
        secao('CÁLCULO DO IMPOSTO', 1.5, 261.5);
        titulo('BASE DE CÁLCULO DO ICMS', 1.5, 270, 84);
        campo(impostos.getBaseDeCalculoDoIcmsFormatada(), 1.5, 278, 84,  'right');

        titulo('VALOR DO ICMS', 89, 270, 84);
        campo(impostos.getValorDoIcmsFormatado(), 89, 278, 84, 'right');

        titulo('BASE DE CÁLC. ICMS S.T.', 177, 270, 84);
        campo(impostos.getBaseDeCalculoDoIcmsStFormatada(), 177, 278, 84, 'right');

        titulo('VALOR DO ICMS SUBST.', 265, 270, 84);
        campo(impostos.getValorDoIcmsStFormatado(), 265, 278, 84, 'right');

        titulo('VALOR IMP. IMPORTAÇÃO', 353, 270, 84);
        campo(impostos.getValorDoImpostoDeImportacaoFormatado(), 353, 278, 84, 'right');

        titulo('VALOR DO PIS', 441, 270, 47);
        campo(impostos.getValorDoPisFormatado(), 441, 278, 47, 'right');

        titulo('VALOR TOTAL DOS PRODUTOS', 492, 270, 93);
        campo(danfe.getValorTotalDosProdutosFormatado(), 492, 278, 93, 'right');

        titulo('VALOR DO FRETE', 1.5, 290, 84);
        campo(danfe.getValorDoFreteFormatado(), 1.5, 298, 84, 'right');

        titulo('VALOR DO SEGURO', 89, 290, 84);
        campo(danfe.getValorDoSeguroFormatado(), 89, 298, 84, 'right');

        titulo('DESCONTO', 177, 290, 84);
        campo(danfe.getDescontoFormatado(), 177, 298, 84, 'right');

        titulo('OUTRAS DESPESAS', 265, 290, 84);
        campo(danfe.getOutrasDespesasFormatado(), 265, 298, 84, 'right');

        titulo('VALOR TOTAL DO IPI', 353, 290, 84);
        campo(impostos.getValorTotalDoIpiFormatado(), 353, 298, 84, 'right');

        titulo('VALOR DA COFINS', 440.5, 290.5, 47, null, args.tamanhoDaFonteDoTitulo - 1);
        campo(impostos.getValorDaCofinsFormatado(), 440.5, 298, 47, 'right');

        titulo('VALOR TOTAL DA NOTA', 492, 290, 93);
        campo(danfe.getValorTotalDaNotaFormatado(false), 492, 298, 93, 'right');

        //QUARTO BLOCO
        secao('TRANSPORTADOR / VOLUMES TRANSPORTADOS', 1.5, 312.5);
        titulo('NOME / RAZÃO SOCIAL', 1.5, 321, 166.5);
        campo(transportador.getNome(), 1.5, 329, 166.5, 'left');

        titulo('FRETE POR CONTA', 171.5, 321, 85);
        campo(danfe.getModalidadeDoFreteFormatada(), 171.5, 329, 85);

        titulo('CÓDIGO ANTT', 259.5, 321, 84);
        campo(transportador.getCodigoAntt(), 259.5, 329, 84);

        titulo('PLACA DO VEÍCULO', 347.5, 321, 84);
        campo(transportador.getPlacaDoVeiculoFormatada(), 347.5, 329, 84);

        titulo('UF', 435.5, 321, 19.5);
        campo(transportador.getUfDaPlacaDoVeiculo(), 435.5, 329, 19.5);

        titulo('CNPJ / CPF', 458, 321, 126.5);
        campo(transportador.getRegistroNacionalFormatado(), 458, 329, 126.5);

        titulo('ENDEREÇO', 1.5, 341, 254);
        campo(transportador.getEndereco().getPrimeiraLinha(), 1.5, 349, 254, 'left', args.tamanhoDaFonteDoCampo - 0.5);

        titulo('MUNICÍPIO', 259.5, 341, 172);
        campo(transportador.getEndereco().getMunicipio(), 259.5, 349, 172);

        titulo('UF', 435.5, 341, 19.5);
        campo(transportador.getEndereco().getUf(), 435.5, 349, 19.5);

        titulo('INSCRIÇÃO ESTADUAL', 458, 341, 126.5);
        campo(transportador.getInscricaoEstadual(), 458, 349, 126.5);

        titulo('QUANTIDADE', 1.5, 361, 56.5);
        campo(volumes.getQuantidadeFormatada(), 1.5, 369, 56.5);

        titulo('ESPÉCIE', 60.8, 361, 96);
        campo(volumes.getEspecie(), 60.8, 369, 96);

        titulo('MARCA', 160, 361, 96);
        campo(volumes.getMarca(), 160, 369, 96);

        titulo('NUMERAÇÃO', 259.5, 361, 96);
        campo(volumes.getNumeracao(), 259.5, 369, 96);

        titulo('PESO BRUTO', 358.5, 361, 112.5);
        campo(volumes.getPesoBruto(), 358.5, 369, 112.5);

        titulo('PESO LÍQUIDO', 474.5, 361, 110.5);
        campo(volumes.getPesoLiquido(), 474.5, 369, 110.5);

        var alturaDaSecaoDosItens = 383,
            alturaDosTitulosDosItens;

        if(fatura || duplicatas.length) {
            secao('FATURA / DUPLICATAS', 1.5, 383);
            alturaDaSecaoDosItens += alturaDoBlocoFaturaDuplicatas;
        }

        if(fatura) {
            var dadosDaFatura = [];

            if(fatura.getNumero()) {
                dadosDaFatura.push('NÚMERO: ' + fatura.getNumero());
            }

            if(fatura.getNumero()) {
                dadosDaFatura.push('VALOR ORIGINAL: ' + fatura.getValorOriginalFormatado());
            }

            if(fatura.getNumero()) {
                dadosDaFatura.push('VALOR DO DESCONTO: ' + fatura.getValorDoDescontoFormatado());
            }

            if(fatura.getNumero()) {
                dadosDaFatura.push('VALOR LÍQUIDO: ' + fatura.getValorLiquidoFormatado());
            }

            if(fatura.getFormaDePagamento()) {
                dadosDaFatura.push('PAGAMENTO: ' + fatura.getFormaDePagamento());
            }

            dadosDaFatura = dadosDaFatura.join(' - ');

            if(dadosDaFatura) {
                negrito(dadosDaFatura, 1.5, 390, larguraDoFormulario, 'left');
            }
        }

        alturaDosTitulosDosItens = alturaDaSecaoDosItens + 12;

        // QUINTO BLOCO - LISTA DE PRODUTOS
        secao('DADOS DOS PRODUTOS / SERVIÇOS', 1.5, alturaDaSecaoDosItens);
        titulo('CÓDIGO', 1.5, alturaDosTitulosDosItens, 50.5, args.alinhamentoDoTituloDaTabela);
        titulo('DESCRIÇÃO DO PRODUTO / SERVIÇO', 55, alturaDosTitulosDosItens, 179, args.alinhamentoDoTituloDaTabela);
        titulo('NCM/SH', 236.5, alturaDosTitulosDosItens, 31.5, args.alinhamentoDoTituloDaTabela);
        titulo('O/CST', 270.5, alturaDosTitulosDosItens, 20, args.alinhamentoDoTituloDaTabela);
        titulo('CFOP', 293.5, alturaDosTitulosDosItens, 19.5, args.alinhamentoDoTituloDaTabela);
        titulo('UN.', 316, alturaDosTitulosDosItens, 14.5, args.alinhamentoDoTituloDaTabela);
        titulo('QUANT.', 333, alturaDosTitulosDosItens, 37, args.alinhamentoDoTituloDaTabela);
        titulo('VALOR UNIT.', 373, alturaDosTitulosDosItens - 4, 31.5, args.alinhamentoDoTituloDaTabela);
        titulo('VALOR TOTAL', 407.5, alturaDosTitulosDosItens - 4, 31.5, args.alinhamentoDoTituloDaTabela);
        titulo('B. CÁLC. ICMS', 441.5, alturaDosTitulosDosItens - 4, 31.5, args.alinhamentoDoTituloDaTabela);
        titulo('VALOR ICMS', 475, alturaDosTitulosDosItens - 4, 31.5, args.alinhamentoDoTituloDaTabela);
        titulo('VALOR IPI', 508, alturaDosTitulosDosItens - 4, 28, args.alinhamentoDoTituloDaTabela);
        titulo('ALÍQ. ICMS', 532, alturaDosTitulosDosItens - 4, 28, args.alinhamentoDoTituloDaTabela);
        titulo('ALÍQ. IPI', 557, alturaDosTitulosDosItens, 28, args.alinhamentoDoTituloDaTabela);

        // SEXTO BLOCO
        if(deveExibirQuadroDeCalculoDoIssqn) {
            secao('CÁLCULO DO ISSQN', 1.5, 754.5);
            titulo('INSCRIÇÃO MUNICIPAL', 1.5, 763, 132.5);
            campo(emitente.getInscricaoMunicipal(), 1.5, 771, 132.5, 'left');

            titulo('VALOR TOTAL DOS SERVIÇOS', 137.5, 763, 132.5);
            campo(danfe.getValorTotalDosServicosFormatado(), 137.5, 771, 132.5, 'right');

            titulo('BASE DE CÁLCULO DO ISSQN', 273.5, 763, 132.5);
            campo(impostos.getBaseDeCalculoDoIssqnFormatada(), 273.5, 771, 132.5, 'right');

            titulo('VALOR TOTAL DO ISSQN', 409.5, 763, 175.5);
            campo(impostos.getValorTotalDoIssqnFormatado(), 409.5, 771, 175.5, 'right');
        }

        var alturaDaSecaoDoSetimoBloco = 786,
            alturaDosTitulosDoSetimoBloco;

        if(!deveExibirQuadroDeCalculoDoIssqn) {
            alturaDaSecaoDoSetimoBloco = 754;
        }

        alturaDosTitulosDoSetimoBloco = alturaDaSecaoDoSetimoBloco + 9;

        // SÉTIMO BLOCO
        secao('DADOS ADICIONAIS', 1.5, alturaDaSecaoDoSetimoBloco);
        titulo('INFORMAÇÕES COMPLEMENTARES', 1.5, alturaDosTitulosDoSetimoBloco, 385);
        titulo('RESERVADO AO FISCO', 390, alturaDosTitulosDoSetimoBloco, 195);

        if(args.creditos) {
            italico(args.creditos, 1.5, 827, larguraDoFormulario);
        }
    }

    desenharPagina();

    var numeroDePaginas = 1,
        yInicialDosItens = 406 + alturaDoBlocoFaturaDuplicatas,
        yDoItemAtual = yInicialDosItens,
        alturaAtual = 0;

    itens.forEach(function(item) {
        function renderizarLinha(pdf) {
            normal(item.getCodigo(), 1.5, yDoItemAtual, 51, 'center', args.tamanhoDaFonteDosItens, pdf);
            var maiorY = pdf.y;

            var descricao = item.getDescricao();
            if(item.getInformacoesAdicionais()) {
                descricao += '\n' + item.getInformacoesAdicionais();
            }

            normal(descricao, 55.5, yDoItemAtual, 178, 'justify', args.tamanhoDaFonteDosItens, pdf);
            maiorY = Math.max(maiorY, pdf.y);

            normal(item.getNcmSh(), 235.5, yDoItemAtual, 32.5, 'center', args.tamanhoDaFonteDosItens, pdf);
            maiorY = Math.max(maiorY, pdf.y);

            normal(item.getOCst(), 270, yDoItemAtual, 21, 'center', args.tamanhoDaFonteDosItens, pdf);
            maiorY = Math.max(maiorY, pdf.y);

            normal(item.getCfop(), 293.5, yDoItemAtual, 21, 'center', args.tamanhoDaFonteDosItens, pdf);
            maiorY = Math.max(maiorY, pdf.y);

            normal(item.getUnidade(), 315, yDoItemAtual, 16.5, 'center', args.tamanhoDaFonteDosItens, pdf);
            maiorY = Math.max(maiorY, pdf.y);

            normal(item.getQuantidadeFormatada(), 332.5, yDoItemAtual, 37.5, 'right', args.tamanhoDaFonteDosItens, pdf);
            maiorY = Math.max(maiorY, pdf.y);

            normal(item.getValorUnitarioFormatado(), 372, yDoItemAtual, 32.5, 'right', args.tamanhoDaFonteDosItens, pdf);
            maiorY = Math.max(maiorY, pdf.y);

            normal(item.getValorTotalFormatado(), 407, yDoItemAtual, 31, 'right', args.tamanhoDaFonteDosItens, pdf);
            maiorY = Math.max(maiorY, pdf.y);

            normal(item.getBaseDeCalculoDoIcmsFormatada(), 440, yDoItemAtual, 32.5, 'right', args.tamanhoDaFonteDosItens, pdf);
            maiorY = Math.max(maiorY, pdf.y);

            normal(item.getBaseDeCalculoDoIcmsFormatada(), 440, yDoItemAtual, 32.5, 'right', args.tamanhoDaFonteDosItens, pdf);
            maiorY = Math.max(maiorY, pdf.y);

            normal(item.getValorDoIcmsFormatado(), 474.5, yDoItemAtual, 32, 'right', args.tamanhoDaFonteDosItens, pdf);
            maiorY = Math.max(maiorY, pdf.y);

            normal(item.getValorDoIpiFormatado(), 508.5, yDoItemAtual, 26, 'right', args.tamanhoDaFonteDosItens, pdf);
            maiorY = Math.max(maiorY, pdf.y);

            normal(item.getAliquotaDoIcmsFormatada(), 536, yDoItemAtual + 0.65, 19, 'center', args.tamanhoDaFonteDosItens - 1, pdf);
            maiorY = Math.max(maiorY, pdf.y);

            normal(item.getAliquotaDoIpiFormatada(), 556.5, yDoItemAtual, 29, 'center', args.tamanhoDaFonteDosItens, pdf);
            maiorY = Math.max(maiorY, pdf.y);

            if(args.separadorDeItens) {
                linhaHorizontalTracejada(0, 0, maiorY);
            }

            return maiorY + (args.separadorDeItens ? 2 : 0);
        }

        var altura = renderizarLinha(pdfTemporario) - yDoItemAtual;

        if(alturaAtual + altura > (751 - yInicialDosItens)) {
            numeroDePaginas += 1;
            pdf.addPage();
            yDoItemAtual = yInicialDosItens;
            alturaAtual = 0;

            desenharPagina();
        }

        renderizarLinha(pdf);


        alturaAtual += altura;
        yDoItemAtual = yDoItemAtual + altura;
    });

    var paginas = pdf.bufferedPageRange();

    for(var i = paginas.start; i < paginas.start + paginas.count; i++) {
        pdf.switchToPage(i);
        italico('FOLHA ' + (i + 1) + '/' + numeroDePaginas, 241.2, 141.2, 98.5, 'center', 8);
    }

    pdf.flushPages();
    pdf.end();

    callback(null, pdf);
};

//fswatch ./lib/geradores/geradorDePdf.js | xargs -n1 /usr/local/bin/nodeunit ./tests/geradorTest.js
