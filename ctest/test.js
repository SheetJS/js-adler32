/* vim: set ts=2: */
var X;
if(typeof require !== 'undefined') {
	assert = require('assert');
	describe('source',function(){it('should load',function(){X=require('./');});});
	bits = require('./misc/bits.js');
} else { X = ADLER32; }

describe('adler32 bits', function() {
	bits.forEach(function(i) {
		var l = i[0].length;
		var msg = i[0];
		if(l > 20) i[0].substr(0,5) + "...(" + l + ")..." + i[0].substr(-5);
		it(msg, function() {
			if(i[2] === 1) assert.equal(X.bstr(i[0]), i[1]|0);
			assert.equal(X.str(i[0]), i[1]|0);
			if(typeof Buffer !== 'undefined') assert.equal(X.buf(new Buffer(i[0])), i[1]|0);
		});
	});
});

