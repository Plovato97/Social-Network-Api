const { Schema, model, Types } = require('mongoose');


const UserSchema = new Schema({

  username: {
    type: String,
    unique: true,
    required: "Username is required",
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
  },
  password: {
    type: String,
    minLength: 6,
    required: "A password is required",
    trim: true
  },

  userCreated: {
    type: Date,
    default: Date.now
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},
  {
    toJSON: {
      virtuals: true,
    }
  }
);
// 


UserSchema.virtual('friendCounter').get(function () {
  return this.friends.length;
});
const User = model('User', UserSchema);

module.exports = User;
