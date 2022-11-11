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
    required: "A password is required",
    validate: [({ length }) => length >= 6, "Password should be at least 6 Characters"],
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
    ref: 'Friends'
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
  return this.friends.reduce((total, friend) => total + friend.replies.length + 1, 0);
})
const User = model('users', UserSchema);

module.exports = User;
