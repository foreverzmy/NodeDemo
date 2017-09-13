// 照片模型
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/photo_app');

const Schema = new mongoose.Schema({
  name: String,
  path: String
});

export default mongoose.model('Photo', Schema);