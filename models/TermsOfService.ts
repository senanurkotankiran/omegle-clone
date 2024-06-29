import mongoose, { Schema, Document, Model } from 'mongoose';

interface ITermsOfService extends Document {
  description: string;
  text: string;
  author: 'Pixover';
}

const TermsOfServiceSchema: Schema<ITermsOfService> = new Schema(
  {
    description: { type: String, required: false },
    text: { type: String, required: true },
    author: { type: String, required: false }
  },
  { timestamps: true }
);

const TermsOfService: Model<ITermsOfService> = mongoose.models.TermsOfService || mongoose.model<ITermsOfService>('TermsOfService', TermsOfServiceSchema);

export default TermsOfService;
export type { ITermsOfService };
