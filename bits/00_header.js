/* adler32.js (C) 2014-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
/*exported ADLER32 */
/*:: declare var DO_NOT_EXPORT_ADLER:?boolean; */
/*:: declare function define(cb:()=>any):void; */
var ADLER32/*:ADLER32Module*/;
(function (factory/*:(a:any)=>void*/)/*:void*/ {
	/*jshint ignore:start */
	/*eslint-disable */
	if(typeof DO_NOT_EXPORT_ADLER === 'undefined') {
		if('object' === typeof exports) {
			factory(exports);
		} else if ('function' === typeof define && define.amd) {
			define(function () {
				var module/*:ADLER32Module*/ = /*::(*/{}/*:: :any)*/;
				factory(module);
				return module;
			});
		} else {
			factory(ADLER32 = /*::(*/{}/*:: :any)*/);
		}
	} else {
		factory(ADLER32 = /*::(*/{}/*:: :any)*/);
	}
	/*eslint-enable */
	/*jshint ignore:end */
}(function(ADLER32/*:ADLER32Module*/) {
