require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./src/api/resources/partnerSegment/partnerSegment.model.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartnerSegment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__("mongoose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


var partnerSegmentSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
	platformId: {
		type: Number,
		unique: false,
		required: [true, 'Partner segment must have partner system id.']
	},
	name: {
		type: String,
		required: [true, 'Segment must have name.']
	},
	partner: {
		type: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Types.ObjectId,
		ref: 'partner'
	}
}, { timestamps: true });

var PartnerSegment = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('PartnerSegment', partnerSegmentSchema);

/***/ })

};
//# sourceMappingURL=0.cba916a9463953d4ac27.hot-update.js.map