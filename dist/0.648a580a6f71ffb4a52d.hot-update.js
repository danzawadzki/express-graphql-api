require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./src/api/resources/partnerSegment/partnerSegment.graphql":
/***/ (function(module, exports) {

module.exports = "type PartnerSegment {\n\tid: ID!\n\tplatformId: Int!\n\tname: String!\n\tpartner: Partner!\n}\n\ninput Partner {\n\tid: ID\n\tname: String!\n}\n\ninput NewPartnerSegment {\n\tpatformId: Int!\n\tname: String!\n\tpartner: Partner!\n}\n\ninput EditPartnerSegment {\n\tpartnerId: Int\n\tname: String\n\tpartner: Partner\n}\n\nextend type Query {\n\tPartnerSegment(id: ID!): PartnerSegment!\n\tallPartnerSegments: [PartnerSegment]!\n}\n\nextend type Mutation {\n\tnewPartnerSegment(input: NewPartnerSegment): PartnerSegment!\n}\n"

/***/ })

};
//# sourceMappingURL=0.648a580a6f71ffb4a52d.hot-update.js.map