
import mongoose from 'mongoose';


const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  },
  image:{
    type: String,
  }
},{
    timestamps : true
}


);

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;
