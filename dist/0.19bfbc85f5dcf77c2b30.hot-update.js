require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./src/api/graphQLRouter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return graphQLRouter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_tools__ = __webpack_require__("graphql-tools");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_tools___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_tools__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resources_user__ = __webpack_require__("./src/api/resources/user/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resources_song__ = __webpack_require__("./src/api/resources/song/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resources_playlist__ = __webpack_require__("./src/api/resources/playlist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resources_ctSegment__ = __webpack_require__("./src/api/resources/ctSegment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__resources_partner__ = __webpack_require__("./src/api/resources/partner/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_merge__ = __webpack_require__("lodash.merge");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_apollo_server_express__ = __webpack_require__("apollo-server-express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_apollo_server_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_apollo_server_express__);









var baseSchema = '\n  schema {\n    query: Query\n    mutation: Mutation\n  }\n';

var schema = Object(__WEBPACK_IMPORTED_MODULE_0_graphql_tools__["makeExecutableSchema"])({
	typeDefs: [baseSchema, __WEBPACK_IMPORTED_MODULE_1__resources_user__["c" /* userType */], __WEBPACK_IMPORTED_MODULE_2__resources_song__["c" /* songType */], __WEBPACK_IMPORTED_MODULE_3__resources_playlist__["c" /* playlistType */], __WEBPACK_IMPORTED_MODULE_5__resources_partner__["b" /* partnerType */], __WEBPACK_IMPORTED_MODULE_4__resources_ctSegment__["b" /* ctSegmentType */], partnerSegmentType],
	resolvers: __WEBPACK_IMPORTED_MODULE_6_lodash_merge___default()({}, __WEBPACK_IMPORTED_MODULE_1__resources_user__["a" /* userResolvers */], __WEBPACK_IMPORTED_MODULE_2__resources_song__["a" /* songResolvers */], __WEBPACK_IMPORTED_MODULE_3__resources_playlist__["a" /* playlistResolvers */], __WEBPACK_IMPORTED_MODULE_5__resources_partner__["a" /* partnerResolvers */], __WEBPACK_IMPORTED_MODULE_4__resources_ctSegment__["a" /* ctSegmentResolvers */], partnerSegmentResolvers)
});

var graphQLRouter = Object(__WEBPACK_IMPORTED_MODULE_7_apollo_server_express__["graphqlExpress"])(function (req) {
	return {
		schema: schema,
		context: {
			req: req,
			user: req.user
		}
	};
});

/***/ })

};
//# sourceMappingURL=0.19bfbc85f5dcf77c2b30.hot-update.js.map