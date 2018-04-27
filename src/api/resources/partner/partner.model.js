import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true
		}
	},
	{ timestamps: true }
);

export const Partner = mongoose.model(
	'Partner',
	partnerSchema
);
