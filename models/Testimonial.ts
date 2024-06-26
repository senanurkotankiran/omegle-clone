import mongoose, { Schema, Document, Model } from 'mongoose';

interface ITestimonial extends Document {
  text: string;
  author: string;
}

const TestimonialSchema: Schema<ITestimonial> = new Schema(
  {
    text: { type: String, required: true },
    author: { type: String, required: true }
  },
  { timestamps: true }
);

const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
export type { ITestimonial };
