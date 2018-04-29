import { PartnerSegment } from './partnerSegment.model';

const getPartnerSegment = (_, { id }, { user }) =>
	PartnerSegment.findById(id).exec();

const allPartnerSegments = (_, __, ___) => PartnerSegments.find({}).exec();

const newPartnerSegment = (_, { input }) => PartnerSegment.create(input);

export const partnerSegmentResolvers = {
	Query: {
		allPartnerSegments,
		PartnerSegment: getPartnerSegment
	},
	Mutation: {
		newPartnerSegment
	}
};
