import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    unique: [true, 'username already taken please try another one'],
    required: [true, 'username is required'],
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: [true, 'password is required'],
  },
});

export default mongoose.model('User', userSchema);
