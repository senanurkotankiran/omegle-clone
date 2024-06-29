import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICommunityGuidelines extends Document {
  description: string;
  text: string;
  author: 'Pixover';
}

const CommunityGuidelinesSchema: Schema<ICommunityGuidelines> = new Schema(
  {
    description: { type: String, required: false },
    text: { type: String, required: true },
    author: { type: String, required: false }
  },
  { timestamps: true }
);

const CommunityGuidelines: Model<ICommunityGuidelines> = mongoose.models.CommunityGuidelines || mongoose.model<ICommunityGuidelines>('CommunityGuidelines', CommunityGuidelinesSchema);

export default CommunityGuidelines;
export type { ICommunityGuidelines };
