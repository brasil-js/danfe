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
    corDoLayout: 'black',
    alturaDaPagina: 595.44,
    larguraDaPagina: 841.68,
    creditos: 'http://opensource.gammasoft.com.br/brasil-js/danfe',
    template: path.join(__dirname, '../danfe-referencia.pdf')
};

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

    var caminhoDoPdfSemXml = path.join(__dirname, "semXml.pdf");
    var caminhoDoPdfComXml = path.join(__dirname, "comXml.pdf");

    var pdftkBackground = spawn("pdftk", ["dados.pdf", "background", "template.pdf", "output", caminhoDoPdfSemXml], {
        cwd: __dirname
    });

    pdftkBackground.on("close", function(code){
            callback(null, fs.createReadStream(caminhoDoPdfSemXml));
    });
};
