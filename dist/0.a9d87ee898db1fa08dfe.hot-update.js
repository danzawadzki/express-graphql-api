require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./src/api/resources/partnerSegment/partnerSegment.graphql":
/***/ (function(module, exports) {

module.exports = "type PartnerSegment {\n\tid: ID!\n\tplatformId: Int!\n\tname: String!\n\tpartner: Partner!\n}\n\ninput Partner {\n\tid: ID!\n}\n\ninput NewPartnerSegment {\n\tpatformId: Int!\n\tname: String!\n\tpartner: Partner!\n}\n\ninput EditPartnerSegment {\n\tpartnerId: Int\n\tname: String\n\tpartner: Partner\n}\n\nextend type Query {\n\tPartnerSegment(id: ID!): PartnerSegment!\n\tallPartnerSegments: [PartnerSegment]!\n}\n\nextend type Mutation {\n\tnewPartnerSegment(input: NewPartnerSegment): PartnerSegment!\n}\n"

/***/ })

};
//# sourceMappingURL=0.a9d87ee898db1fa08dfe.hot-update.js.map