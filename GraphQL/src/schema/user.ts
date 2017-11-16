import mongoose from 'mongoose';
import { Stream } from 'stream';

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  friends: [{
    type: mongoose.Schema.Type.ObjectId,
    ref: 'User'
  }]
})

const User = mongoose.model('User', UserSchema);

export default User;