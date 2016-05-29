/* adler32.js (C) 2014-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
/*exported ADLER32 */
var ADLER32;
/*:: declare var DO_NOT_EXPORT_ADLER: any; */
/*:: declare var define: any; */
(function (factory) {
	/*jshint ignore:start */
	if(typeof DO_NOT_EXPORT_ADLER === 'undefined') {
		if('object' === typeof exports) {
			factory(exports);
		} else if ('function' === typeof define && define.amd) {
			define(function () {
				var module = {};
				factory(module);
				return module;
			});
		} else {
			factory(ADLER32 = {});
		}
	} else {
		factory(ADLER32 = {});
	}
	/*jshint ignore:end */
}(function(ADLER32) {
