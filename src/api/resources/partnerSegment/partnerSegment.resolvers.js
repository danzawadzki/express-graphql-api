import { PartnerSegment } from './partnerSegment.model';

const getPartnerSegment = (_, { id }, { user }) =>
	PartnerSegment.findById(id)
		.populate('partner')
		.exec();

const allPartnerSegments = () =>
	PartnerSegment.find({})
		.populate('partner')
		.exec();

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
