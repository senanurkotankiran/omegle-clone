import mongoose, { Schema, Document, Model } from 'mongoose';

interface IFaq extends Document {
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema: Schema<IFaq> = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true }
  },
  { timestamps: true }
);

const Faq: Model<IFaq> = mongoose.models.Faq || mongoose.model<IFaq>('Faq', FaqSchema);

export default Faq;
export type { IFaq };
