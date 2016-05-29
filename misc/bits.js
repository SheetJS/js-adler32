var o = "foo bar baz٪☃🍣";
var bits = [
	[ "Wikipedia", 300286872, 1 ],
	[ "foo bar baz", 398066679, 1 ],
	[ "foo bar baz٪", 570688890 ],
	[ "foo bar baz٪☃", 919275383 ],
	[ o, 1543572022 ],
	[ o+o, -2076896149 ],
	[ o+o+o, 2023497376 ]
];
if(typeof module !== "undefined") module.exports = bits;
