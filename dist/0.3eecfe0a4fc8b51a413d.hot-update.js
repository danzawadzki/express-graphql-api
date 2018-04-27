require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./src/api/resources/partner/partner.graphql":
/***/ (function(module, exports) {

module.exports = "type Partner {\n\tid: ID\n\tname: String!\n}\n\ninput UpdatePartner {\n\tid: ID!\n\tname: String!\n}\n\ninput NewPartner {\n\tname: String!\n}\n\nextend type Query {\n\tPartner(id: ID!): Partner!\n\tallPartners: [Partner]!\n}\n\nextend type Mutation {\n\tnewPartner(input: UpdatePartner!): Partner!\n}\n"

/***/ })

};
//# sourceMappingURL=0.3eecfe0a4fc8b51a413d.hot-update.js.map