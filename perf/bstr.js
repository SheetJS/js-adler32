var old = require('adler-32').bstr;
var cur = require('../').bstr;

function sheetjs1(bstr) {
	var a = 1, b = 0, L = bstr.length;
	for(var i = 0; i < L;) {
		a += bstr.charCodeAt(i++);
		a %= 65521;
		b += a;
		b %= 65521;
	}
	return (b << 16) | a;
}

function sheetjs2(bstr) {
	var a = 1, b = 0, L = bstr.length, M = 0;
	for(var i = 0; i < L;) {
		M = Math.min(L-i, 2654)+i;
		for(;i<M;i++) {
			a += bstr.charCodeAt(i);
			b += a;
		}
		a = (15*(a>>>16)+(a&65535))
		b = (15*(b>>>16)+(b&65535))
	}
	return ((b%65521) << 16) | (a%65521);
}

function sheetjs3(bstr) {
	var a = 1, b = 0, L = bstr.length, M = 0;
	for(var i = 0; i < L;) {
		M = Math.min(L-i, 3850)+i;
		for(;i<M;i++) {
			a += bstr.charCodeAt(i);
			b += a;
		}
		a = (15*(a>>>16)+(a&65535))
		b = (15*(b>>>16)+(b&65535))
	}
	return ((b%65521) << 16) | (a%65521);
}

function sheetjs4(bstr) {
	var a = 1, b = 0, L = bstr.length, M = 0;
	for(var i = 0; i < L;) {
		M = Math.min(L-i, 5552);
		for(;M>0;--M) {
			a += bstr.charCodeAt(i++);
			b += a;
		}
		a %= 65521;
		b %= 65521;
	}
	return (b << 16) | a;
}

var w = 6;
var foobar = [255,255,255,255,255,255].map(function(x) { return String.fromCharCode(x); }).join("");
for(var ff = 0; ff < w; ++ff) foobar += foobar;
foobar.charCodeAt(0);
var m = 2048;

var assert = require('assert');
var BM = require('./bm');
for(var i = 0; i != 6; ++i) foobar += foobar;
for(var i = 6; i != 14; ++i) {
	foobar += foobar;
	foobar.charCodeAt(0);

	var res = old(foobar);
	assert.equal(res, cur(foobar));
	assert.equal(res, sheetjs1(foobar));
	assert.equal(res, sheetjs2(foobar));
	assert.equal(res, sheetjs3(foobar));
	assert.equal(res, sheetjs4(foobar));

	var suite = new BM('binary string (' + foobar.length + ')');
	if(i<3) suite.add('sheetjs 1', function() { for(var j = 0; j != m; ++j) sheetjs1(foobar); });
	suite.add('sheetjs 2', function() { for(var j = 0; j != m; ++j) sheetjs2(foobar); });
	suite.add('sheetjs 3', function() { for(var j = 0; j != m; ++j) sheetjs3(foobar); });
	suite.add('sheetjs 4', function() { for(var j = 0; j != m; ++j) sheetjs4(foobar); });
	suite.add('last vers', function() { for(var j = 0; j != m; ++j) old(foobar); });
	suite.add('current v', function() { for(var j = 0; j != m; ++j) cur(foobar); });
	suite.run();
	m>>>=1; if(m < 10) m = 10;
}
