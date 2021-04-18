/* js-adler32 (C) 2014-present  SheetJS -- http://sheetjs.com */
/*:: declare var ADLER32: ADLER32Module; */
/*:: declare var self: DedicatedWorkerGlobalScope; */
importScripts('../adler32.js');
/*::self.*/postMessage({t:"ready"});

var readler = function(f, adler, l) {
	/*::self.*/postMessage({t:"iter", f:f, adler:adler, l:l, sz:f.size});
	if(l >= f.size) return /*::self.*/postMessage({t:"done"});
	var sz = 0x100000; if(l + sz > f.size) sz = f.size - l;
	var d = f.slice(l, l + sz);
	var r = new FileReader();
	r.onload = function(e) {
		var b = new Uint8Array((e.target/*:any*/).result);
		var newadler = ADLER32.buf(b, adler);
		/*::self.*/postMessage({t:"data", adler:newadler, bytes:l+sz});
		readler(f, newadler, l + sz);
	};
	r.readAsArrayBuffer(d);
};

onmessage = function (oEvent) {
	/*::self.*/postMessage({t:"start"});
	var f/*:File*/ = oEvent.data;
  var seed = 1;
	readler(f, seed, 0);
};

