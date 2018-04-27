import {makeExecutableSchema} from 'graphql-tools'
import {userResolvers, userType} from './resources/user'
import {songResolvers, songType} from './resources/song'
import {playlistResolvers, playlistType} from './resources/playlist'
import {ctSegmentResolvers, ctSegmentType} from "./resources/ctSegment/";
import merge from 'lodash.merge'
import {graphqlExpress} from 'apollo-server-express'

const baseSchema = `
  schema {
    query: Query
    mutation: Mutation
  }
`

const schema = makeExecutableSchema({
    typeDefs: [
        baseSchema,
        userType,
        songType,
        playlistType,
        ctSegmentType
    ],
    resolvers: merge(
        {},
        userResolvers,
        songResolvers,
        playlistResolvers,
        ctSegmentResolvers
    )
})


export const graphQLRouter = graphqlExpress((req) => ({
    schema,
    context: {
        req,
        user: req.user
    }
}))
