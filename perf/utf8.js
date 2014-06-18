var table = require('../').table;

function sheetjs1(utf8) {
	var buf = Buffer(utf8);
	var a = 1, b = 0, L = buf.length, M;
	for(var i = 0; i < L;) {
		M = Math.min(L-i, 3854);
		for(;M>0;--M) {
			a += buf[i++];
			b += a;
		}
		a %= 65521;
		b %= 65521;
	}
	return b > 32767 ? (((b - 65536) * 65536) | a) : ((b * 65536) | a);
}

function sheetjs2(utf8) {
	var a = 1, b = 0, L = utf8.length, M, c, d;
	for(var i = 0; i < L;) {
		M = Math.min(L-i, 3850);
		while(M>0) {
			c = utf8.charCodeAt(i++);
			if(c < 0x80) { a += c; b += a; --M; }
			else if(c < 0x800) {
				a += 192|((c>>6)&31);        b += a; --M;
				a += 128|(c&63);             b += a; --M;
			} else if(c >= 0xD800 && c < 0xE000) {
				c = (c&1023)+64; d = utf8.charCodeAt(i++) & 1023;
				a += 240|((c>>8)&7);         b += a; --M;
				a += 128|((c>>2)&63);        b += a; --M;
				a += 128|((d>>6)&15)|(c&3);  b += a; --M;
				a += 128|(d&63);             b += a; --M;
			} else {
				a += 224|((c>>12)&15);       b += a; --M;
				a += 128|((c>>6)&63);        b += a; --M;
				a += 128|(c&63);             b += a; --M;
			}
		}
		a %= 65521;
		b %= 65521;
	}
	return b > 32767 ? (((b - 65536) * 65536) | a) : ((b * 65536) | a);
}

var foobar = "foo bar baz٪☃🍣";
for(var i = 0; i != 11; ++i) foobar += " " + foobar;
var assert = require('assert');
sheetjs1(foobar); sheetjs2(foobar);
assert.equal(sheetjs1(foobar), sheetjs2(foobar));

var BM = require('./bm');
var suite = new BM('unicode string');

suite.add('sheetjs 1', function() { for(var j = 0; j != 1000; ++j) sheetjs1(foobar); });
suite.add('sheetjs 2', function() { for(var j = 0; j != 1000; ++j) sheetjs2(foobar); });
suite.run();
