import { makeExecutableSchema } from 'graphql-tools';
import { userResolvers, userType } from './resources/user';
import { ctSegmentResolvers, ctSegmentType } from './resources/ctSegment';
import { partnerResolvers, partnerType } from './resources/partner';
import {
	partnerSegmentResolvers,
	partnerSegmentType
} from './resources/partnerSegment';
import merge from 'lodash.merge';
import { graphqlExpress } from 'apollo-server-express';

const baseSchema = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

const schema = makeExecutableSchema({
	typeDefs: [
		baseSchema,
		userType,
		partnerType,
		ctSegmentType,
		partnerSegmentType
	],
	resolvers: merge(
		{},
		userResolvers,
		partnerResolvers,
		ctSegmentResolvers,
		partnerSegmentResolvers
	)
});

export const graphQLRouter = graphqlExpress(req => ({
	schema,
	context: {
		req,
		user: req.user
	}
}));
