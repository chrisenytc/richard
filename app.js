var express = require('express');
var favicon = require('serve-favicon');
var request = require('superagent');
var cheerio = require('cheerio');
var _ = require('lodash');
var app = express();
// Configs
var port = process.env.PORT || 3000;
var url = 'http://restauranteflorida.com.br/pratododia.php';

app.use(favicon(__dirname + '/favicon.ico'));

app.all('/', function (req, res) {
	return request
		.get(url)
		.end(function(err, response){
			if (err) {
				return res.status(500).json(err);
			}

			var $ = cheerio.load(response.text);

			var name = $('#prato_farialima').children().get(11).next.data;
			var messages = [
				'Essa é uma ótima hora para alimentar o Richard. O risoto de hoje é ' + name.replace(/^\s+|\n|\r/g, ''),
				'Acho que você vai ficar muito feliz porque o risoto de hoje é ' + name.replace(/^\s+|\n|\r/g, ''),
				'Nem imagino com quanta fome você está, ainda bem que o risoto de hoje é ' + name.replace(/^\s+|\n|\r/g, ''),
				'Hoje é um dia especial porque o risoto de hoje é ' + name.replace(/^\s+|\n|\r/g, ''),
				'Não deixe o Richard esperando, corra logo para o Flórida. O risoto de hoje é ' + name.replace(/^\s+|\n|\r/g, ''),
				'Eu tenho uma surpresa para você. O risoto de hoje é ' + name.replace(/^\s+|\n|\r/g, '')
			];
			var message = messages[_.random(0, 5)];

			return res.status(200).json({
				speech: message,
				displayText: message,
				source: 'richard-bot'
			});
		});
});

app.listen(port, function () {
	console.log('Richard app listening on port ' + port + '!');
});
