var path = require('path'),
    fs = require('fs'),
    EOL = require('os').EOL,

    gammautils = require('gammautils'),
    merge = gammautils.object.merge,
    Pdf = require('pdfkit'),

    diretorioDeFontes = path.join(__dirname, '../fontes'),
    timesNewRoman = path.join(diretorioDeFontes, 'Times New Roman.ttf'),
    timesNewRomanNegrito = path.join(diretorioDeFontes, 'Times New Roman Bold.ttf'),
    timesNewRomanItalico = path.join(diretorioDeFontes, 'Times New Roman Italic.ttf'),
    timesNewRomanNegritoItalico = path.join(diretorioDeFontes, 'Times New Roman Bold Italic.ttf'),
    code128 = path.join(diretorioDeFontes, 'Code128.ttf');

var pdfDefaults = {
    ajusteY: 0,
    ajusteX: 0,
    autor: '',
    titulo: '',
    criador: '',
    tamanhoDaFonteDoTitulo: 8,
    tamanhoDaFonte: 10,
    tamanhoDoCodigoDeBarras: 26,
    corDoLayout: 'red',
    alturaDaPagina: 595.44,
    larguraDaPagina: 841.68,
    creditos: 'http://opensource.gammasoft.com.br/brasil-js/danfe',
    template: path.join(__dirname, '../danfe-referencia.pdf')
};

//clear && nodeunit tests/gerador.js

module.exports = function(danfe, args, callback) {
    if(typeof args === 'function') {
        callback = args;
        args = pdfDefaults;
    }

    args = merge(pdfDefaults, args);

    var pdf = new Pdf({
        size: [
            args.alturaDaPagina,
            args.larguraDaPagina
        ],
        info: {
            Author: args.autor,
            Title: args.titulo,
            Creator: args.criador,
            Producer: 'http://danfe.org'
        }
    });

    if(args.stream) {
        pdf.pipe(args.stream);
    }

    pdf.registerFont('normal', timesNewRoman);
    pdf.registerFont('negrito', timesNewRomanNegrito);
    pdf.registerFont('italico', timesNewRomanItalico);
    pdf.registerFont('negrito-italico', timesNewRomanNegritoItalico);
    pdf.registerFont('codigoDeBarras', code128);

    ///////// LAYOUT

    var grossuraDaLinha = 0.2,
        margemTopo = 2.8,
        margemEsquerda = 3,
        margemDireita = 589.65,
        larguraDoFormulario = margemDireita - margemEsquerda;

    pdf.lineWidth(grossuraDaLinha);

    function linhaHorizontal(x1, x2, y) {
        y = margemTopo + args.ajusteY + y;
        x1 = margemEsquerda + args.ajusteX + x1;
        x2 = margemDireita + args.ajusteX + x2;

        return pdf.moveTo(x1, y).lineTo(x2, y).dash(false).stroke(args.corDoLayout);
    }

    function linhaHorizontalTracejada(x1, x2, y) {
        y = margemTopo + args.ajusteY + y;
        x1 = margemEsquerda + args.ajusteX + x1;
        x2 = margemDireita + args.ajusteX + x2;

        return pdf.moveTo(x1, y).lineTo(x2, y).dash(3, { space: 5 }).stroke(args.corDoLayout);
    }

    function linhaVertical(y1, y2, x) {
        x = margemEsquerda + args.ajusteX + x;
        y1 = margemTopo + args.ajusteY + y1;
        y2 = margemTopo + args.ajusteY + y2;

        return pdf.moveTo(x, y1).lineTo(x, y2).stroke(args.corDoLayout);
    }

    //RECIBO
    linhaHorizontal(0, 0, 0);
    linhaHorizontal(0, -110.5, 28.3);
    linhaHorizontal(0, 0, 51.1);

    linhaVertical(0, 51.1, 0);
    linhaVertical(31.1, 51.1, 99.2);
    linhaVertical(0, 51.1, 476);
    linhaVertical(0, 51.1, 0);
    linhaVertical(0, 51.1, larguraDoFormulario);
    //

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
    linhaHorizontal(0, 0, 391);
    linhaHorizontal(0, 0, 405.2);
    linhaHorizontal(0, 0, 751);

    linhaVertical(391, 751, 0);
    linhaVertical(391, 751, 53.8);
    linhaVertical(391, 751, 235.3);
    linhaVertical(391, 751, 269.3);
    linhaVertical(391, 751, 292);
    linhaVertical(391, 751, 314.5);
    linhaVertical(391, 751, 331.6);
    linhaVertical(391, 751, 371.2);
    linhaVertical(391, 751, 405.4);
    linhaVertical(391, 751, 439.3);
    linhaVertical(391, 751, 473.2);
    linhaVertical(391, 751, 507.2);
    linhaVertical(391, 751, 535.6);
    linhaVertical(391, 751, 555.4);
    linhaVertical(391, 751, larguraDoFormulario);

    //SEXTO BLOCO
    linhaHorizontal(0, 0, 762.2);
    linhaHorizontal(0, 0, 782.2);

    linhaVertical(762.2, 782.2, 0);
    linhaVertical(762.2, 782.2, 136.1);
    linhaVertical(762.2, 782.2, (136.1 * 2) - 0.1);
    linhaVertical(762.2, 782.2, (136.1 * 3) - 0.1);
    linhaVertical(762.2, 782.2, larguraDoFormulario);

    //SETIMO BLOCO
    linhaHorizontal(0, 0, 793.6);
    linhaHorizontal(0, 0, 821.8);

    linhaVertical(793.6, 821.8, 0);
    linhaVertical(793.6, 821.8, 388.25);
    linhaVertical(793.6, 821.8, larguraDoFormulario);

    //  Deve ser a última linha pois não estou conseguindo
    //  retirar o tracejado após utiliza-lop ela primeira vez
    linhaHorizontalTracejada(0, 0, 55.32);
    ///////// LAYOUT

    //TITULOS


    pdf.end();

    var ws = require('fs').createWriteStream(path.join(__dirname, 'cru.pdf'));
    // var ws = require('fs').createWriteStream(path.join(__dirname, 'danfe.pdf'));
    var spawn = require("child_process").spawn;
    pdf.pipe(ws);

    ws.on('close', function() {
        var pdftkBackground = spawn("pdftk", ["cru.pdf", "background", args.template, "output", path.join(__dirname, 'danfe.pdf')], {
            cwd: __dirname
        });

        pdftkBackground.on("close", function(code){
            callback(null);
        });
    });
};
