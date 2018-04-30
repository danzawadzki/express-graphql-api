import { Partner } from './partner.model';

const getPartner = (_, { id }, { user }) => Partner.findById(id).exec();

const allPartners = () =>
	Partner.find({})
		.populate('partner')
		.exec();

const newPartner = (_, { input }) => Partner.create(input);

export const partnerResolvers = {
	Query: {
		allPartners,
		Partner: getPartner
	},
	Mutation: {
		newPartner
	}
};
