import mongoose from 'mongoose';

const ctSegmentSchema = new mongoose.Schema(
	{
		idPanel: {
			type: Number,
			unique: true,
			required: [true, 'CT segment must have system id.']
		},

		name: {
			type: String,
			required: [true, 'Segment must have name.']
		}
	},
	{ timestamps: true }
);

export const CtSegment = mongoose.model(
	'CtSegment',
	ctSegmentSchema
);
