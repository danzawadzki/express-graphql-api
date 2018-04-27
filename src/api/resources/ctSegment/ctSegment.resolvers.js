import {CtSegment} from './ctSegment.model';

const getCtSegment = (_, {id}, {user}) => {
    return CtSegment.findById(id).exec()
};

const allCtSegments = () => (
    CtSegment.find({}).exec()
);

const newCtSegment = (_, {input}) => (
    CtSegment.create(input)
);

export const ctSegmentResolvers = {
    Query: {
        allCtSegments,
        CtSegment: getCtSegment
    },
    Mutation: {
        newCtSegment
    }
};