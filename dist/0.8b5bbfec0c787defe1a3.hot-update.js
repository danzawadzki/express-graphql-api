require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./src/api/resources/partnerSegment/partnerSegment.graphql":
/***/ (function(module, exports) {

module.exports = "type PartnerSegment {\n\tid: ID!\n\tplatformId: Int!\n\tname: String!\n\tpartner: Partner\n}\n\ninput NewPartnerSegment {\n\tpatformId: Int!\n\tname: String!\n    partner: NewPartner\n}\n\ninput EditPartnerSegment {\n\tpartnerId: Int\n\tname: String\n\n}\n\nextend type Query {\n\tPartnerSegment(id: ID!): PartnerSegment!\n\tallPartnerSegments: [PartnerSegment]!\n}\n\nextend type Mutation {\n\tnewPartnerSegment(input: NewPartnerSegment): PartnerSegment!\n}\n"

/***/ })

};
//# sourceMappingURL=0.8b5bbfec0c787defe1a3.hot-update.js.map