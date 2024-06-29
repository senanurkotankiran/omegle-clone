import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPrivacyPolicy extends Document {
  description: string;
  text: string;
  author: 'Pixover';
}

const PrivacyPolicySchema: Schema<IPrivacyPolicy> = new Schema(
  {
    description: { type: String, required: false },
    text: { type: String, required: true },
    author: { type: String, required: false }
  },
  { timestamps: true }
);

const PrivacyPolicy: Model<IPrivacyPolicy> = mongoose.models.PrivacyPolicy || mongoose.model<IPrivacyPolicy>('PrivacyPolicy', PrivacyPolicySchema);

export default PrivacyPolicy;
export type { IPrivacyPolicy };
