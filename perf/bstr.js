var table = require('../').table;

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
		M = Math.min(L-i, 3854);
		for(;M>0;--M) {
			a += bstr.charCodeAt(i++);
			b += a;
		}
		a %= 65521;
		b %= 65521;
	}
	return (b << 16) | a;
}

var foobar = "foobarbazqux";
for(var i = 0; i != 11; ++i) foobar += " " + foobar;
var assert = require('assert');
assert.equal(sheetjs1(foobar), sheetjs2(foobar));

var BM = require('./bm');
var suite = new BM('binary string');

suite.add('sheetjs 1', function() { for(var j = 0; j != 1000; ++j) sheetjs1(foobar); });
suite.add('sheetjs 2', function() { for(var j = 0; j != 1000; ++j) sheetjs2(foobar); });
suite.run();
