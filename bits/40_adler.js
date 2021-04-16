/*# consult README.md for the magic number */
/*# charCodeAt is the best approach for binary strings */
function adler32_bstr(bstr/*:string*/, seed/*:?ADLER32Type*/)/*:ADLER32Type*/ {
	var a = 1, b = 0, L = bstr.length, M = 0;
	if(typeof seed === 'number') { a = seed & 0xFFFF; b = seed >>> 16; }
	for(var i = 0; i < L;) {
		M = Math.min(L-i, 2654)+i;
		for(;i<M;i++) {
			a += bstr.charCodeAt(i)&0xFF;
			b += a;
		}
		a = (15*(a>>>16)+(a&65535));
		b = (15*(b>>>16)+(b&65535));
	}
	return ((b%65521) << 16) | (a%65521);
}

function adler32_buf(buf/*:ABuf*/, seed/*:?ADLER32Type*/)/*:ADLER32Type*/ {
	var a = 1, b = 0, L = buf.length, M = 0;
	if(typeof seed === 'number') { a = seed & 0xFFFF; b = (seed >>> 16) & 0xFFFF; }
	for(var i = 0; i < L;) {
		M = Math.min(L-i, 2654)+i;
		for(;i<M;i++) {
			a += buf[i]&0xFF;
			b += a;
		}
		a = (15*(a>>>16)+(a&65535));
		b = (15*(b>>>16)+(b&65535));
	}
	return ((b%65521) << 16) | (a%65521);
}

/*# much much faster to intertwine utf8 and adler */
function adler32_str(str/*:string*/, seed/*:?ADLER32Type*/)/*:ADLER32Type*/ {
	var a = 1, b = 0, L = str.length, M = 0, c = 0, d = 0;
	if(typeof seed === 'number') { a = seed & 0xFFFF; b = seed >>> 16; }
	for(var i = 0; i < L;) {
		M = Math.min(L-i, 2918);
		while(M>0) {
			c = str.charCodeAt(i++);
			if(c < 0x80) { a += c; }
			else if(c < 0x800) {
				a += 192|((c>>6)&31);             b += a; --M;
				a += 128|(c&63);
			} else if(c >= 0xD800 && c < 0xE000) {
				c = (c&1023)+64; d = str.charCodeAt(i++) & 1023;
				a += 240|((c>>8)&7);              b += a; --M;
				a += 128|((c>>2)&63);             b += a; --M;
				a += 128|((d>>6)&15)|((c&3)<<4);  b += a; --M;
				a += 128|(d&63);
			} else {
				a += 224|((c>>12)&15);            b += a; --M;
				a += 128|((c>>6)&63);             b += a; --M;
				a += 128|(c&63);
			}
			b += a; --M;
		}
		a = (15*(a>>>16)+(a&65535));
		b = (15*(b>>>16)+(b&65535));
	}
	return ((b%65521) << 16) | (a%65521);
}
