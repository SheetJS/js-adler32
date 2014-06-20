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
	var a = 1, b = 0, L = bstr.length, M;
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

function sheetjs3(bstr) {
	var a = 1, b = 0, L = bstr.length, M;
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

var foobar = [255,255,255,255,255,255].map(function(x) { return String.fromCharCode(x); }).join("");
foobar += foobar;
foobar += foobar;
foobar += foobar;
foobar += foobar;
foobar += foobar;
foobar += foobar;
foobar.charCodeAt(0);
var m = 2048;
var assert = require('assert');
var BM = require('./bm');
for(var i = 0; i != 14; ++i) {
	foobar += foobar;
	foobar.charCodeAt(0);
	assert.equal(sheetjs1(foobar), sheetjs3(foobar));
	assert.equal(sheetjs1(foobar), sheetjs2(foobar));
	//for(var j = 0; j != 200; ++j) assert.equal(sheetjs2(foobar), sheetjs3(foobar));
	var suite = new BM('binary string (' + foobar.length + ')');

	if(i<3) suite.add('sheetjs 1', function() { for(var j = 0; j != m; ++j) sheetjs1(foobar); });
	suite.add('sheetjs 2', function() { for(var j = 0; j != m; ++j) sheetjs2(foobar); });
	suite.add('sheetjs 3', function() { for(var j = 0; j != m; ++j) sheetjs3(foobar); });
	suite.run();
	m>>>=1; if(m < 10) m = 10;
}
