var o = "foo bar baz٪☃🍣";
var m = "foobar"; for(var i = 0; i != 11; ++i) m+=m;
var m1 = m + m, m2 = m1 + m1, m3 = m2 + m2, m4 = m3 + m3;
var M1 = m + "𝑹" + m, M2 = M1 + "𝐀" +  M1, M3 = M2 + "𝓜" + M2, M4 = M3 + "𝙖" + M3;
var bits = [
	[ "Wikipedia", 300286872, 1 ],
	[ "foo bar baz", 398066679, 1 ],
	[ "foo bar baz٪", 570688890 ],
	[ "foo bar baz٪☃", 919275383 ],
	[ m, -747910882, 1 ],
	[ m1, 1286443594, 1],
	[ m2, 812328098, 1 ],
	[ m3, -1124316861, 1 ],
	[ m4, -357657979, 1 ],
	[ M1, -792947423 ],
	[ M2, -1841877779 ],
	[ M3, 869751957 ],
	[ M4, -1344947227 ],
	[ o, 1543572022 ],
	[ o+o, -2076896149 ],
	[ o+o+o, 2023497376 ]
];
if(typeof module !== "undefined") module.exports = bits;
/*::
declare class ADLER32Module {
	bstr(s:string, seed?:ADLER32Type):ADLER32Type;
	buf(b:ABuf, seed?:ADLER32Type):ADLER32Type;
	str(s:string, seed?:ADLER32Type):ADLER32Type;
	version:string;
};
*/
/*::
type _CB = {(data:Buffer):void;};
declare module 'concat-stream' {declare function exports(f:_CB):stream$Duplex;};
declare module 'exit-on-epipe' {};

declare module 'adler-32' { declare module.exports:ADLER32Module;  };
declare module '../' { declare module.exports:ADLER32Module; };

declare module 'printj' {
  declare function sprintf(fmt:string, ...args:any):string;
};
*/
