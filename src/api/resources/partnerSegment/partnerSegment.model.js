import mongoose from 'mongoose';

const partnerSegmentSchema = new mongoose.Schema(
	{
		platformId: {
			type: Number,
			unique: false,
			required: [true, 'Partner segment must have partner system id.']
		},

		name: {
			type: String,
			required: [true, 'Segment must have name.']
		},

		partner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Partner'
		}
	},
	{ timestamps: true }
);

export const PartnerSegment = mongoose.model(
	'PartnerSegment',
	partnerSegmentSchema
);
