"use strict";
const canReflect = require("can-reflect");

// Ensure the "obj" passed as an argument has an object on @@can.meta
module.exports = function ensureMeta(obj) {
	var metaSymbol = Symbol.for("can.meta");
	var meta = obj[metaSymbol];

	if (!meta) {
		meta = {};
		canReflect.setKeyValue(obj, metaSymbol, meta);
	}

	return meta;
};
