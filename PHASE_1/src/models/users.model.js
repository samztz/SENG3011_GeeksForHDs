import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
    enum: ['staff', 'admin'],
    default: 'staff',
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  billingInfo: {
    nameOnCard: {type: String},
    expireDate: {type: String},
    cardNumber: {type: String},
    CVV: {type: String},
  },
  bookmarks: [
    {
      bookmarkId: {type:String},
      queryString: {type: String},
    }
  ]
});

const User = model('User', UserSchema);

export default User;